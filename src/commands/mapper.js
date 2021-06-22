// This module contains some utilities for reshaping JSON from the Airtable API into 
// normalized JSON objects that we can persist to the application as static data.

require('dotenv').config()

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const Airtable = require('airtable')
const themes = require('../../static/data/themes.json')

// const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app0oWW3dO3b9gHQo')
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appjfPJhxo9IHh8ld')

/**
 * Fetches the data in a given Airtable table as a list of JSON objects. The Airtable entities are 
 * reshaped into JSON using the supplied mapping.
 * @param {string} table 
 * @param {object} entityMap 
 */
function fetch(table, entityMap) {
  const things = []
  return new Promise((resolve, reject) => {
    base(table)
      .select()
      .eachPage(
        async (records, nextPage) => {
          for (let i = 0; i < records.length; i++) {
            const rec = records[i]
            let e = await mapEntity(rec.fields, entityMap)
            e.airtableId = rec.id
            things.push(e)
            console.log(`fetched ${table} / ${e.airtableId}`)
          }
          nextPage()
        },
        (error) => {
          if (error) {
            console.log(`error while fetching from ${table}: ${error}`)
            reject(error)
          } else {
            resolve(things)
          }
        }
      )
  })
}

/**
 * mapper contains a function that will map an entity pulled from Airtable and convert it 
 * into a JavaScript object using the supplied entityMap. This basically allows 
 * what are column names in the Airtable to be normalized for use as an object property.
 * 
 * @param {object} e A JavaScript object retrieved from Airtable API.
 * @param {object} entityMap A mapping specification for how to convert the data.
 * @return {object} The mapped entity.
 */
async function mapEntity(e, entityMap) {
  let m = {
    ...mapId(e, entityMap), 
    ...mapStrings(e, entityMap),
    ...mapLists(e, entityMap),
    ...mapThings(e, entityMap),
    ...mapDecade(e, entityMap)
  }

  // look for roles that could modify some Things that were collected in m
  m = mapRoles(e, m, entityMap)
  
  return m
}

/**
 * Turn some arbitrary text into a slug that can form part of a URL.
 * 
 * @param {string} Text to be converted.
 * @return {string} Slugified text. 
 */
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}

/**
 * Writes some JSON to a file.
 * 
 * @param {*} o An object tcreatorRole_Producero serialize.
 * @param {*} filename The path to save JSON to.
 */
function writeJson(o, filename) {
  const fullPath = path.resolve(__dirname, '../../static/data/', filename)
  fs.writeFileSync(fullPath, JSON.stringify(o, null, 2) + '\n')
  console.log(chalk.green(`wrote ${fullPath}`))
}

// THe functions below are for doing different types of mapping. They all take an Airtable
// entity object and an entityMap and return an object that is the result of applying that 
// mapping to the supplied object.

function mapId(e, entityMap) {
  if (entityMap.slugId) {
    return {
      id: slugify(e[entityMap.slugId])
    }
  }
}

function mapStrings(e, entityMap) {
  const m = {}
  if (entityMap.strings) {
    for (let [p1, p2] of Object.entries(entityMap.strings)) {
      if (e.hasOwnProperty(p1)) {
        m[p2] = e[p1]
      }
    }
  }
  return m
}

function mapLists(e, entityMap) {
  const m = {}
  if (entityMap.lists) {
    for (let [p1, p2] of Object.entries(entityMap.lists)) {
      if (e.hasOwnProperty(p1)) {
        if (! m.hasOwnProperty(p2)) {
          m[p2] = e[p1]
        } else {
          m[p2].push(e[p1])
        }
      }
    }
  }
  return m
}

/**
 * Look for role columns in e using the supplied mapping. This function needs
 * the mapped object because it may need to modify already mapped values. The
 * newly mapped object is returned, and the passed in object is not mutated.
 * @param {*} e an Airtable row
 * @param {*} m an object
 * @param {*} entityMap a mapping specification
 */

function mapRoles(e, m, entityMap) {
  const newM = Object.assign(m, {})

  if (entityMap.roles) {
    for (const [prop, spec] of Object.entries(entityMap.roles)) {

      if (! newM[prop]) {
        newM[prop] = []
      }

      const newIds = new Set()

      for (let [k, v] of Object.entries(e)) {
        const match = k.match(new RegExp(`${prop}Role_(.+)`))
        if (match) {
          const role = match[1]
          const values = spec.expander(v).map(v => ({...v, role: role}))
          newM[prop] = newM[prop].concat(values)
          values.forEach(v => newIds.add(v.id))
        }
      }

      // There can be duplicates across the role based and non-role based creator
      // and contributor columns. For example Creator(s) can contain a person who
      // is also in the creatorRole_producer column. This filter removes any value 
      // that doesn't have a role for which we just added a value with the same id
      // that has a role. Maybe this gnarly step can go away some time if the role 
      // based columns supplant the non-role based ones. 
      newM[prop] = newM[prop].filter(v => ! (! v.role && newIds.has(v.id)))
    }

  }

  return newM
}

function mapThings(e, entityMap) {
  m = {}
  if (entityMap.things) {
    for (let [k, v] of Object.entries(e)) {
      // put single values into a list for processing
      if (! v instanceof Array) v = [v]

      const spec = entityMap.things[k]
      if (spec) {
        m[spec.property] = spec.expander(v)
      }
    }
  }

  return m
}

function makeIdExpander(filename, f, allowMultiple=true) {
  const fullPath = path.resolve(__dirname, '../../static/data/', filename)
  const data = require(fullPath)
  const map = new Map(data.map(o => [o.airtableId, o]))
  return list => {
    const newList = []
    for (const airtableId of list) {
      const o = map.get(airtableId)
      if (o) newList.push(f(o))
    }
    if (allowMultiple) {
      return newList
    } else {
      return newList[0]
    }
  }
}

function mapDecade(e, entityMap) {

  if (! entityMap.decade) return

  const date = e[entityMap.decade]
  if (! date) return {decade: null}

  // a hack to accomodate "1931", "1931-05-23" and "May 1931"
  const match = date.match(/\d{4}/) 
  if (! match) return

  const decadeStart = Math.floor(match[0] / 10) * 10
  if (isNaN(decadeStart)) return

  const decade = `${decadeStart}-${decadeStart + 9}`
  return {decade: decade}
}

// This map of subject names to themes is used by the subjectToThemes function below.

const subjectThemesMap = new Map()
for (const theme of themes) {
  for (const subject of theme.subjects) {
    const themes = new Set(subjectThemesMap.get(subject.name) || [])
    themes.add(theme.name)
    subjectThemesMap.set(subject.name, themes)
  }
}

/**
 * Get a list of relevant themes for a subject.
 * @param {*} subject 
 */

function subjectToThemes(subject) {
  const themes = new Set()
  const parts = subject.split('--')
  for (let i = 1; i <= parts.length; i += 1) {
    const partial = parts.slice(0, i).join('--')
    if (subjectThemesMap.has(partial)) {
      for (const theme of subjectThemesMap.get(partial)) {
       themes.add(theme)
      }
    }
  }
  return Array.from(themes)
}

/***
 * Takes a list of subject objects and returns the same list with relevant themes added.
 * @param {*} subjects 
 */

function subjectsToThemes(subjects) {
  if (! subjects) return []
  const newSubjects = new Map()
  for (const subject of subjects) {
    newSubjects.set(subject.name, Object.assign({}, subject))
    for (const theme of subjectToThemes(subject.name)) {
      newSubjects.set(theme, {
        id: slugify(theme),
        name: theme
      })
    }
  }

  // remove duplicates & sort
  return Array.from(newSubjects.values())
    .sort((a, b) => a.name.localeCompare(b.name))
}

function addSubjectThemes(docs) {
  for (const doc of docs) {
    doc.subject = subjectsToThemes(doc.subject)
  }
}

module.exports = {
  fetch,
  makeIdExpander,
  mapEntity,
  slugify,
  writeJson,
  subjectToThemes,
  subjectsToThemes,
  addSubjectThemes,
}
