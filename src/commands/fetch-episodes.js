const Airtable = require('airtable')
const {mapEntity, slugify, writeJson} = require('./mapper')

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app0oWW3dO3b9gHQo')

async function main() {

  const series = []
  await fetchSeries(series)

  const episodes = []
  await fetchEpisodes(episodes)

  // convert episode.series to objects
  const seriesMap = new Map(series.map(s => [s.airtableId, s]))
  for (const e of episodes) {
    if (! e['series']) {
      console.error(`missing series for ${e.aapbId}`)
    } else if (e['series'].length > 1) {
      console.error(`${e.aapbId} assigned to ${e['series'].length} series`)
      e['series'] = {}
    } else {
      const s = seriesMap.get(e['series'][0])
      if (s) {
        e['series'] = {
          'id': s.id,
          'title': s.title
        }
      }
    }
  }

  writeJson(series, 'series.json')
  writeJson(episodes, 'episodes.json')
}


async function fetchEpisodes(episodes) {
  await base('PBCore Metadata (Audio)')
    .select()
    .eachPage(async (records, nextPage) => {
      for (let i = 0; i < records.length; i += 1) {
        const rec = records[i]
        let e = await mapEntity(rec.fields, episodeMap)
        e.id = 'e' + episodes.length
        episodes.push(e)
        console.log(`episode: ${e.aapbId}`)
      }
      nextPage()
    })
}

async function fetchSeries(series) {
  await base('Series')
    .select()
    .eachPage((records, nextPage) => {
      records.forEach((rec) => {
        const slug = slugify(rec.fields['Series Title'])
        series.push({
          id: slug,
          airtableId: rec.id,
          title: rec.fields['Series Title'],
          description: rec.fields['Description'],
        })
        console.log(`series: ${slug}`)
      })
      nextPage()
    })
}

/**
 * episodeMap maps the column headers in AirTable to JSON that we will use in the application.
 * There are simple one-to-one "string" mappings, and then more complicated mappings that construct 
 * "things" or objects with multiple properties based on numbered column headings: 
 * e.g. pbCoreSubject1, pbCoreSubject2, etc.
 */

const episodeMap = {

  strings: {
    "AAPB GUID":                          "aapbId",
    "Instantiation Identifier 2 (NAEB)":  "naebId",
    "Instantiation Identifier 1 (UMD)":   "umdId",
    "Title 1 (Series)":                   "series", 
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
    "Decade":                             "decade",
    "Year":                               "year"
  },

  things: {
    "pbcoreSubject":                     ["subject", "name"],
    "pbcoreSubject@subjectType":         ["subject", "type"],
    "pbcoreCreator":                     ["creator", "name"],
    "pbcoreCreatorRole":                 ["creator", "role"],
    "pbcoreContributor":                 ["contributor", "name"],
    "pbcoreContributorRole":             ["contributor", "role"],
    "instantiationDimensions":           ["dimensions", "value"],
    "unitsOfMeasureDimensions":          ["dimensions", "units"],
    "pbcoreGenre":                       ["genre", "name"],
    "pbcoreGenreAuthorityUsed":          ["genre", "authority"],
  },

}

if (require.main === module) {
  main()
}