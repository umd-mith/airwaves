const fs = require('fs')
const path = require('path')
const get = require('node-fetch')
const {fetch, makeIdExpander, writeJson} = require('./mapper')

if (! process.env.AIRTABLE_API_KEY) {
  console.log("\nError: Please set AIRTABLE_API_KEY environment key.\n")
  process.exit()
}

async function main() {
  const folders = await fetch('Folder Level Metadata', docMap)
  const items = await fetch('Item Level Metadata', docMap)
  const docs = folders.concat(items)

  for (let i = 0; i < docs.length; i += 1) {
    doc = docs[i]
    doc.ocrPath = await downloadOcr(doc.iaId)
    doc.id = `d${i + 1}`
  }

  const docsWithOcr = docs.filter(d => d.ocrPath)

  console.log(`${docs.length} documents in Airtable`)
  console.log(`${docsWithOcr.length} with OCR at Internet Archive`)
  writeJson(docsWithOcr, 'documents.json')
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
    "Series Relation": "relatedSeries",
    "Coverage (Temporal)": "temporal"
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
  }

}

async function downloadOcr(iaId) {
  const ocrPath = path.join('docs', 'ocr', iaId, 'ocr.xml.gz')
  if (fs.existsSync(ocrPath)) {
    return ocrPath
  }
  /*
  const url = `https://s3.us.archive.org/${iaId}/${iaId}_abbyy.gz`
  try {
    const resp = await get(url, {keepalive: true, redirect: 'follow'})
    if (resp.status != 200) {
      console.log(`Error fetching OCR ${url}: ${resp.status}`)
      return null
    }
    const buffer = await resp.buffer()
    const dir = path.join('static','docs', iaId)
    if (! fs.existsSync(path.dirname(ocrPath))) {
      fs.mkdirSync(path.dirname(ocrPath), {recursive: true})
    }
    fs.writeFileSync(path.join(dir, 'ocr.xml.gz'), buffer)
    return ocrPath
  } catch(e) {
    console.log(`unable to download ocr ${url}`)
    return null
  }
  */
 return null
}

if (require.main === module) {
  main()
}
