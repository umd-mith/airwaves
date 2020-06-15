const {fetch, makeIdExpander, writeJson} = require('./mapper')

async function main() {
  const people = await fetch('Authorities (People & Corporate Bodies)', peopleMap)
  writeJson(people, 'people.json')

  const subjects = await fetch('Authorities (Subjects)', subjectsMap)
  // strip trailing periods from subjects if they are present
  subjects.map(s => s.name = s.name.replace(/\.$/, ''))
  writeJson(subjects, 'subjects.json')

  const places = await fetch('Authorities (Geographic/Locations)', placesMap)
  writeJson(places, 'places.json')

  const series = await fetch('Series', seriesMap)
  writeJson(series, 'series.json')

  const themes = flattenThemes(await fetch('Themes', themesMap))
  writeJson(themes, 'themes.json')
}

const seriesMap = {
  slugId: "Series Title",
  strings: {
    "Series Title": "title",
    "Description": "description",
  }
}

const peopleMap = {
  slugId: "Name",
  strings: {
    "Name": "name",
    "Type": "type"
  },
  lists: {
    "Title, Affiliation": "affiliation"
  }
}

const subjectsMap = {
  slugId: "Name",
  strings: {
    "Name": "name",
  }
}

const placesMap = {
  slugId: "Name",
  strings: {
    "Name": "name",
  }
}

const themesMap = {
  slugId: "",
  strings: {
    "Name": "name",
  },
  things: {
    "Related Subject(s)": {
      property: "subjects",
      expander: makeIdExpander('subjects.json', s => {
        return {
          id: s.id,
          name: s.name
        }
      })
    }
  }
}

function flattenThemes(themes) {
  return themes.map(theme => ({
    name: theme.name,
    subjects: flattenSubjects(theme.subjects)
  }))
}

function flattenSubjects(subjects) {
  const names = subjects.map(s => s.name).sort((a, b) => b.length - a.length)
  const newSubjects = []
  const seen = new Map()
  for (const subject of subjects) {
    let foundBroader = false
    for (const name of names) {
      if (subject.name == name) {
        continue
      } else if (subject.name.startsWith(name)) {
        foundBroader = true
        break
      }
    }
    if (! foundBroader && ! seen.has(subject.name)) {
      newSubjects.push(subject)
      seen.set(subject.name, true)
    }
  }
  return newSubjects.sort((a, b) => a.name.localeCompare(b.name))
}

if (require.main === module) {
  main()
}