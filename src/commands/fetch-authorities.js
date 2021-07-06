const chalk = require("chalk")
const { fetch, makeIdExpander, writeJson } = require("./mapper")

async function main() {

  const snac = await fetch("SNAC Records", snacMap)
  writeJson(snac, "snac.json")

  const wikidata = await fetch("Wikidata Records", wikidataMap)
  writeJson(wikidata, "wikidata.json")

  const people = await fetch("CPF Authorities", peopleMap)
  writeJson(people, "people.json")

  const subjects = await fetch("Subjects", subjectsMap)
  // strip trailing periods from subjects if they are present
  subjects.map(s => (s.name = s.name.replace(/\.$/, "")))
  writeJson(subjects, "subjects.json")

  const places = await fetch("Geographic Authorities", placesMap)
  writeJson(places, "places.json")

  const series = await fetch("Series", seriesMap)
  writeJson(series, "series.json")

  const genres = await fetch("Genre(s)", genresMap)
  writeJson(genres, "genres.json")

  const themes = flattenThemes(await fetch("Themes", themesMap))
  writeJson(themes, "themes.json")
}

const seriesMap = {
  slugId: "Series Title",
  strings: {
    "Series Title": "title",
    Description: "description",
  },
  things: {
    "Linked Documents-Folders": {
      property: "relatedFolders",
      expander: makeIdExpander("documents.json", d => {
        return {
          iaId: d.iaId,
          title: d.title,
        }
      }),
    },
    "Linked Documents-Items": {
      property: "relatedItems",
      expander: makeIdExpander("documents.json", d => {
        return {
          iaId: d.iaId,
          title: d.title,
        }
      })
    }
  }
}

const peopleMap = {
  slugId: "Name",
  strings: {
    Name: "name",
    "Entity Type": "type"
  },
  things: {
    "Wikidata QCode": {
      property: "wikidata",
      expander: makeIdExpander("wikidata.json", d => d, allowMultiple=false)
    },
    "SNAC ID": {
      property: "snac",
      expander: makeIdExpander("snac.json", d => d, allowMultiple=false)
    }
  }
}

const subjectsMap = {
  slugId: "Name",
  strings: {
    Name: "name",
  },
}

const placesMap = {
  slugId: "Name",
  strings: {
    Name: "name",
  },
}

const genresMap = {
  slugId: "Name",
  strings: {
    Name: "name",
  },
}

const themesMap = {
  slugId: "",
  strings: {
    Name: "name",
    "Parent Grouping": "group",
  },
  things: {
    "Related Subject(s)": {
      property: "subjects",
      expander: makeIdExpander("subjects.json", s => {
        return {
          id: s.id,
          name: s.name,
        }
      }),
    },
  },
}

const snacMap = {
  strings: {
    "SNAC ID": "snacId",
    "Description": "description",
    "Source for BiogHist": "descriptionSource",
    "Biographical or Historical Note": "description",
    "Date of Birth": "birthDate",
    "Date of Death": "deathDate",
  },
  lists: {
    "Alternate Names": "altNames",
    "Subject(s)": "subjects",
    "Places": "places",
    "Occupation(s)": "occupations",
    "Relations (Associated With)": "associatedWith",
    "Relations (Same As)": "sameAs"
  }
}

const wikidataMap = {
  strings: {
    "Wikidata ID": "wikidataId",
    "Wikidata label": "name",
    "Wikidata label description": "description",
    "Wikipedia URL": "wikipediaUrl",
    "date of birth (P569)": "birthDate",
    "date of death (P570)": "deathDate",
    "place of birth (P19)": "birthPlace",
    "place of death (P20)": "deathPlace",
    "inception (P571)": "inceptionDate",
    "coordinate location": "geo",
    "Settlement": "settlement",
    "State Check": "state",
    "SNAC Ark ID": "snacArk"
  },
  lists: {
    "Wikidata altLabels": "altNames",
    "instance of": "instanceOf",
    "licensed to broadcast to (P1408)": "broadcastTo",
    "located in the administrative territorial entity (P131)": "locatedIn",
    "country (P17)": "country",
    "occupation (P106)": "occupation",
    "field of work (P101)": "fieldOfWork",
    "employer (P108)": "employer",
    "member of (P463)": "memberOf",
    "LOC ID (P244)": "lccn",
    "VIAF ID (P214)": "viaf",
    "owned by (P127)": "ownedBy",
    "official website (P856)": "website"
  }
}

function flattenThemes(themes) {
  const flatThemes = []
  themes.forEach(theme => {
    if (theme.subjects) {
      flatThemes.push({
        name: theme.name,
        group: theme.group,
        subjects: flattenSubjects(theme.subjects),
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
    if (!foundBroader && !seen.has(subject.name)) {
      newSubjects.push(subject)
      seen.set(subject.name, true)
    }
  }
  return newSubjects.sort((a, b) => a.name.localeCompare(b.name))
}

if (require.main === module) {
  main()
}
