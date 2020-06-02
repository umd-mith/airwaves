const fs = require('fs')
const path = require('path')
const get = require('node-fetch')
const minimist = require('minimist')

const {fetch, makeIdExpander, writeJson} = require('./mapper')

async function main(skipOcr=false) {
  const folders = await fetch('Dublin Core Metadata (Paper-Folders)', docMap)
  const items = await fetch('Dublin Core Metadata (Paper-Items)', docMap)
  const docs = folders.concat(items)

  for (let i = 0; i < docs.length; i += 1) {
    doc = docs[i]
    doc.ocrPath = await getOcr(doc.iaId, skipDownload=skipOcr)
    doc.id = `d${i + 1}`
  }

  const docsWithOcr = docs.filter(d => d.ocrPath)
  const findingAid = makeFindingAid(docsWithOcr)

  console.log(`${docs.length} documents in Airtable`)
  console.log(`${docsWithOcr.length} with OCR at Internet Archive`)
  writeJson(docsWithOcr, 'documents.json')
  writeJson(findingAid, 'finding-aid.json')
}

const docMap = {
  strings: {
    "ID": "iaId",
    "Title": "title",
    "Box": "box",
    "Folder": "folder",
    "Date": "date",
    "Description": "description",
    "Rights": "rights",
    "Collection": "collection",
    "Series": "series",
    "Series Relation": "relatedSeries",
    "Coverage (Temporal)": "temporal",
    "Digitization/Preservation": "digitized"
  },

  lists: {
    "Type(s)": "type"
  },

  things: {
    "Creator(s)": {
      property: "creator",
      expander: makeIdExpander('people.json', p => {
        return {
          id: p.id,
          name: p.name
        }
      })
    },
    "Contributor(s)": {
      property: "contributor",
      expander: makeIdExpander('people.json', c => {
        return {
          id: c.id,
          name: c.name
        }
      })
    },
    "Subject(s)": {
      property: "subject",
      expander: makeIdExpander('subjects.json', s => {
        return {
          id: s.id,
          name: s.name
        }
      })
    },
    "Coverage (Spatial)": {
      property: "spatial",
      expander: makeIdExpander('places.json', p => {
        return {
          id: p.id,
          name: p.name
        }
      })
    }
  },

  decade: "Date"
}

async function getOcr(iaId, skipDownload=false) {
  const ocrPath = path.join('docs', 'ocr', iaId, 'ocr.xml.gz')
  if (fs.existsSync(ocrPath)) {
    console.log(`ocr already downloaded ${ocrPath}`)
    return ocrPath
  }

  if (skipDownload) return null

  const url = `https://s3.us.archive.org/${iaId}/${iaId}_abbyy.gz`
  try {
    const resp = await get(url, {keepalive: true, redirect: 'follow'})
    if (resp.status == 404) {
      console.log(`Document ${iaId} not digitized yet`)
      return null
    } else if (resp.status != 200) {
      console.log(`Error fetching OCR ${url}: ${resp.status}`)
      return null
    }
    const buffer = await resp.buffer()
    if (! fs.existsSync(path.dirname(ocrPath))) {
      fs.mkdirSync(path.dirname(ocrPath), {recursive: true})
    }
    fs.writeFileSync(ocrPath, buffer)
    console.log(`downloaded OCR ${url} -> ${ocrPath}`)
    return ocrPath
  } catch(e) {
    console.log(`unable to download ocr ${url}: ${e}`)
    return null
  }
}

function makeFindingAid(docs) {

  /*

  This function walks through the folders and items that have been pulled from Airtable 
  and then builds up a lookup table which is then used to create a hierarchical 
  "finding aid" data structure of series / boxes / folders / items.

  The sticky points are that (for data entry reasons):

  1. Not all folders will necessarily include items.
  2. Not all items will have folder metadata.

  */

  const lookup = {}
  for (const doc of docs) {

    const match = doc.iaId.match(/naeb-b(\d+)-f(\d+)(-(\d+))?/)
    if (! match) {
      console.error(`invalid Internet Archive ID found: ${doc.iaId}`)
      continue
    }
    const [boxNum, folderNum, itemNum] = [match[1], match[2], match[4]]

    if (! lookup[doc.series]) {
      lookup[doc.series] = {}
    }

    const series = lookup[doc.series]
    if (! series[boxNum]) {
      series[boxNum] = {}
    }

    const box = series[boxNum]
    if (! box[folderNum] && ! itemNum) {
      box[folderNum] = {
        id: doc.iaId,
        title: doc.title,
        description: doc.description,
        number: folderNum,
        items: [],
      }
    } else if (! box[folderNum]) {
      box[folderNum] = {
        title: `Folder ${folderNum}`,
        number: folderNum,
        items: []
      }
    }

    if (itemNum) {
      box[folderNum].items.push({
        id: doc.iaId,
        title: doc.title,
        description: doc.description
      })
    }

  }

  // It will be more convenient to work with the series / boxes / folders
  // data structure as lists of objects. So take a pass through the
  // collected data and reshape it.

  fs.writeFileSync('foo.json', JSON.stringify(lookup, null, 2))

  const findingAid = []
  for (const seriesTitle in lookup) {
    const series = {
      title: seriesTitle, 
      boxes: []
    }

    for (const boxNum in lookup[seriesTitle]) {
      const box = {
        title: boxNum,
        folders: []
      }


      for (const folderNum in lookup[seriesTitle][boxNum]) {
        const items = lookup[seriesTitle][boxNum][folderNum].items
        items.sort((a, b) => a.id.localeCompare(b.id))
        const folder = {
          number: folderNum,
          id: lookup[seriesTitle][boxNum][folderNum].id,
          title: lookup[seriesTitle][boxNum][folderNum].title,
          description: lookup[seriesTitle][boxNum][folderNum].description,
          items: items
        }
        box.folders.push(folder)
      }

      box.folders.sort((a, b) => a.title.localeCompare(b.title))
      series.boxes.push(box)
    }

    series.boxes.sort((a, b) => a.title.localeCompare(b.title))

    findingAid.push(series)
  }

  findingAid.sort((a, b) => a.title.localeCompare(b.title))
  return findingAid
}

if (require.main === module) {
  const args = minimist(process.argv.slice(2), {
    boolean: ['skip-ocr'],
    default: {'skipOcr': false},
    alias: {'skip-ocr': 'skipOcr'}
  })
  main(skipOcr=args.skipOcr)
}
