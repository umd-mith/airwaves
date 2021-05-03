const {fetch, makeIdExpander, writeJson, addSubjectThemes} = require('./mapper')

async function main() {
  const episodes = await fetch('Programs Metadata', episodeMap)

  // add theme based subjects
  addSubjectThemes(episodes)

  // add a smaller id for indexing
  let count = 0
  for (const e of episodes) {
    count += 1
    e.id = `e${count}`

    if (e.title == null || e.title == "") {
      console.error(`Missing title for episode ${e.aapbId}`)
    }
  }

  writeJson(episodes, 'episodes.json')
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
    "instantiationMediaType": "mediaType",
    "essenceTrackPlaybackSpeed unitsOfMeasure_ips": "formatPlaybackSpeed",
    "instantiationDimensions unitsOfMeasure_inches": "physical",
    "Duration": "duration",
    "Description descriptionType_Series": "seriesDescription",
    "Description descriptionType_Program": "description",
    "instantiationLocation": "location",
    "coverageType_Temporal": "temporal",
    "pbcoreinstantiationLanguage": "language",
    "AssetDate dateType_broadcast version_year": "year" 
  },

  /*
  composed: {
    "pbcoreCreator":                     ["creator", "name"],
    "pbcoreCreatorRole":                 ["creator", "role"],
    "pbcoreContributor":                 ["contributor", "name"],
    "pbcoreContributorRole":             ["contributor", "role"],
    "instantiationDimensions":           ["dimensions", "value"],
    "unitsOfMeasureDimensions":          ["dimensions", "units"],
    "pbcoreGenre":                       ["genre", "name"],
    "pbcoreGenreAuthorityUsed":          ["genre", "authority"],
  },
  */

  things: {
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
    }
  },

  decade: "coverageType_Temporal"
}

if (require.main === module) {
  main()
}
