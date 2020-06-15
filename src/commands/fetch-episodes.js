const {fetch, makeIdExpander, writeJson, subjectsToThemes} = require('./mapper')

async function main() {
  const episodes = await fetch('PBCore Metadata (Audio)', episodeMap)

  // add theme based subjects
  addSubjectThemes(episodes)

  // add a smaller id for indexing
  let count = 0
  for (const e of episodes) {
    count += 1
    e.id = `e${count}`
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
    "AAPB GUID":                          "aapbId",
    "Instantiation Identifier 2 (NAEB)":  "naebId",
    "Instantiation Identifier 1 (UMD)":   "umdId",
    "Title 2 (Episode)":                  "title",
    "Broadcast Date":                     "broadcastDate",
    "instantiationMediaType":             "mediaType",
    "formatPlaybackSpeed":                "formatPlaybackSpead",
    "unitsOfMeasure":                     "unitsOfMeasaure",
    "instantiationPhysical":              "physical",
    "instantiationIdentifier":            "instantiationIdentifier",
    "Duration":                           "duration",
    "Duration Approximate?":              "durationApproximate",
    "Description 1 (Series)":             "seriesDescription",
    "Description 2 (Episode)":            "description",
    "Priority Level":                     "priorityLevel",
    "instantiationLocation":              "location",
    "Time Period (Temporal) Coverage)":   "temporal",
    "pbcoreinstantiationLanguage":        "language",
    "Year":                               "year"
  },

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

  things: {
    "Title 1 (Series)": {
      property: "series",
      expander: makeIdExpander("series.json", s => {
        return {
          id: s.id,
          title: s.title
        }
      }, false)
    },
    "Subject(s)": {
      property: "subject",
      expander: makeIdExpander("subjects.json", s => {
        return {
          id: s.id,
          name: s.name
        }
      })
    }
  },

  decade: "Broadcast Date"

}

function addSubjectThemes(episodes) {
  for (const episode of episodes) {
    episode.subject = subjectsToThemes(episode.subject)
  }
}

if (require.main === module) {
  main()
}