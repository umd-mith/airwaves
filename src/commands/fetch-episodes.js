const chalk = require('chalk')
const {fetch, makeIdExpander, writeJson, addSubjectThemes} = require('./mapper')

async function main() {
  const episodes = await fetch('Programs Metadata', episodeMap)

  // add theme based subjects
  addSubjectThemes(episodes)

  // add a smaller id for indexing 
  // and filter out any episodes that lack a title or series

  let count = 0
  let newEpisodes = []
  for (const e of episodes) {
    count += 1
    e.id = `e${count}`

    if (e.title == null || e.title == "") {
      console.error(chalk.red(`Missing title for episode ${e.aapbId}`))
    } else if (e.series == null) {
      console.error(chalk.red(`Missing series for episode ${e.aapbId}`))
    } else {
      newEpisodes.push(e)
    }
  }

  writeJson(newEpisodes, 'episodes.json')
}

/**
 * episodeMap maps the column headers in AirTable to JSON that we will use in the application.
 * There are simple one-to-one "string" mappings, and then more complicated mappings that construct 
 * "composed" objects from multiple columns: e.g. pbCoreSubject1, pbCoreSubject2, etc.
 */

const episodeMap = {

  strings: {
    "Identifier source_AAPB": "aapbId",
    "instantiationIdentifier source_National Association of Educational Broadcasters": "naebId",
    "instantiationIdentifier source_University of Maryland": "umdId",
    "Title titleType_Program": "title",
    "AssetDate dateType_broadcast": "broadcastDate",
    "Duration": "duration",
    "Description descriptionType_Series": "seriesDescription",
    "Description descriptionType_Program": "description",
    "instantiationLocation": "location",
    "coverageType_Temporal": "temporal",
    "pbcoreinstantiationLanguage": "language",
    "AssetDate dateType_broadcast version_year": "year"
  },

  things: {
    "Creator(s)": {
      property: "creator",
      expander: makeIdExpander("people.json", a => {
        return {
          id: a.id,
          name: a.name,
          type: a.type
        }
      })
    },
    "Contributor(s)": {
      property: "contributor",
      expander: makeIdExpander("people.json", a => {
        return {
          id: a.id,
          name: a.name,
          type: a.type
        }
      })
    },
    "Title titleType_Series": {
      property: "series",
      expander: makeIdExpander("series.json", s => {
        return {
          id: s.id,
          title: s.title
        }
      }, false)
    },
    "Subject source_Library of Congress Subject Authority Headings": {
      property: "subject",
      expander: makeIdExpander("subjects.json", s => {
        return {
          id: s.id,
          name: s.name
        }
      })
    },
    "Genre(s)": {
      property: "genre",
      expander: makeIdExpander("genres.json", g => {
        return {
          id: g.id,
          name: g.name 
        }
      })
    },
    "Continent": {
      property: "continent",
      expander: makeIdExpander("places.json", g => {
        return {
          id: g.id,
          name: g.name 
        }
      })
    },
    "Country": {
      property: "country",
      expander: makeIdExpander("places.json", g => {
        return {
          id: g.id,
          name: g.name 
        }
      })
    },
    "Region": {
      property: "region",
      expander: makeIdExpander("places.json", g => {
        return {
          id: g.id,
          name: g.name 
        }
      })
    },
    "Settlement": {
      property: "settlement",
      expander: makeIdExpander("places.json", g => {
        return {
          id: g.id,
          name: g.name 
        }
      })
    }
  },

  roles: { 
    "creator": {
      property: "creator",
      expander: makeIdExpander("people.json", a => {
        return {
          id: a.id,
          name: a.name,
          type: a.type
        }
      })
    }, 
    "contributor": {
      property: "contributor",
      expander: makeIdExpander("people.json", a => {
        return {
          id: a.id,
          name: a.name,
          type: a.type
        }
      })
    }
  },

  decade: "coverageType_Temporal"
}

if (require.main === module) {
  main()
}
