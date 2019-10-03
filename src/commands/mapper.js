// This module contains some utilities for turning JSON from the Airtable API into 
// normalized JSON objects that we can persist.

const fs = require('fs')
const path = require('path')

/**
 * mapper contains a function that will map an entity pulled from Airtable and convert it 
 * into a JavaScript object using the supplied entityMap. This basically allows 
 * what are column names in the Airtable to be normalized for use as an object property.

 * @param {object} e A JavaScript object retrieved from Airtable API.
 * @param {object} entityMap A mapping specification for how to convert the data.
 * @return {object} The mapped entity.
 */
async function mapEntity(e, entityMap) {

  const m = {}

  // handle the easy strings
  for (let [p1, p2] of Object.entries(entityMap.strings)) {
    if (e.hasOwnProperty(p1)) {
      m[p2] = e[p1]
    }
  }
  
  // handle things, constructed from multiple columns and which can have multiple values
  for (let [k, v] of Object.entries(e)) {

    // determine the normalized key and its position
    let normKey = null
    let pos = -1
    let match = k.match(/^(.+)(\d+)$/)
    if (match) {
      normKey = entityMap.things[match[1]]
      pos = parseInt(match[2]) - 1
    } else {
      normKey = entityMap.things[k]
      pos = -1
    }

    // if there's no mapping then continue
    if (!normKey) continue

    // if there is just one object
    if (pos === -1) {
      let o = m[normKey[0]] || {}
      o[normKey[1]] = v
      m[normKey[0]] = o
    } 
    // if more than one object we need a list, and also keep track of the position
    else {
      let l = m[normKey[0]] || []
      let o = l[pos] || {}
      o[normKey[1]] = v
      l[pos] = o
      m[normKey[0]] = l
    }

  }

  // some rows in the table have partial values that need to be stripped
  // e.g. pre-populated roles with no name
  m.subject = filterIfNotProperty(m.subject, 'name')
  m.contributor = filterIfNotProperty(m.contributor, 'name')
  m.creator = filterIfNotProperty(m.creator, 'name')
  m.genre = filterIfNotProperty(m.genre, 'name')

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
 * @param {*} o An object to serialize.
 * @param {*} filename The path to save JSON to.
 */
function writeJson(o, filename) {
  const fullPath = path.resolve(__dirname, '../../static/data/', filename)
  fs.writeFileSync(fullPath, JSON.stringify(o, null, 2))
  console.log(`wrote ${fullPath}`)
}

function filterIfNotProperty(list, prop) {
  if (!list) {
    return []
  } else {
    return list.filter(e => e.hasOwnProperty(prop))
  }
}

module.exports = {
  mapEntity,
  slugify,
  writeJson
}