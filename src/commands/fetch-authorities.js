const chalk = require('chalk')
const {fetch, makeIdExpander, writeJson} = require('./mapper')

async function main() {
  const people = await fetch('CPF Authorities', peopleMap)
  writeJson(people, 'people.json')

  const subjects = await fetch('Subjects', subjectsMap)
  // strip trailing periods from subjects if they are present
  subjects.map(s => s.name = s.name.replace(/\.$/, ''))
  writeJson(subjects, 'subjects.json')

  const places = await fetch('Geographic Authorities', placesMap)
  writeJson(places, 'places.json')

  const series = await fetch('Series', seriesMap)
  writeJson(series, 'series.json')

  const genres = await fetch('Genre(s)', genresMap)
  writeJson(genres, 'genres.json')

  const themes = flattenThemes(await fetch('Themes', themesMap))
  writeJson(themes, 'themes.json')
}

const seriesMap = {
  slugId: "Series Title",
  strings: {
    "Series Title": "title",
    "Description": "description",
  },
  things: {
    "Linked Documents-Folders": {
      property: "relatedFolders",
      expander: makeIdExpander('documents.json', d => {
        return {
          iaId: d.iaId,
          title: d.title
        }
      })
    }
  }
}

const peopleMap = {
  slugId: "Name",
  strings: {
    "Name": "name",
    "Entity Type": "type"
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
  },
}

const genresMap = {
  slugId: "Name",
  strings: {
    "Name": "name"
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
  const flatThemes = []
  themes.forEach(theme => {
    if (theme.subjects) {
      flatThemes.push({
        name: theme.name,
        subjects: flattenSubjects(theme.subjects)
      })
    } else {
      console.log(chalk.red(`missing subjects for theme: ${theme.name}`))
    }
  })
  return flatThemes
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
