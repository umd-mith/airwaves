const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const Airtable = require('airtable')

if (! process.env.AIRTABLE_API_KEY) {
  console.log("\nError: Please set AIRTABLE_API_KEY environment key.\n")
  process.exit()
}

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appr7YXcZfPKUF4nI')

async function main() {
  const docs = []
  await fetchDocs('Contents by Folder with Metadata', docs)
  await fetchDocs('Contents by Item with Metadata', docs)
  const docsPath = path.resolve(__dirname, '../../static/data/documents.json')
  fs.writeFileSync(docsPath, JSON.stringify(docs, null, 2))
  console.log(`${docs.length} documents downloaded`)
}

async function fetchDocs(table, docs) {
  await base(table)
    .select()
    .eachPage(async (records, nextPage) => {
      for (let i=0; i < records.length; i++) {
        let id = records[i].fields['ID']
        console.log(`Getting metadata for ${id}`)
        let item = await getInternetArchiveMetadata(id)
        if (item !== null && item.metadata) {
          const m = item.metadata
          m.iaId = m.identifier
          delete m.identifier
          m.id = 'd' + String(docs.length + 1)
          // XXX: we should be getting metadata from Airtable instead of IA
          if (typeof m.contributor === 'string') m.contributor = [m.contributor]
          if (typeof m.subject === 'string') m.subject = [m.subject]
          if (typeof m.relation === 'string') m.relation = [m.relation]
          if (typeof m.type === 'string') m.type = [m.type]
          docs.push(m)
          const ocrPath = await downloadOcr(item)
        }
      }
      nextPage()
    })
}

async function getInternetArchiveMetadata(id, tries=0, maxTries=10) {
  const url = `https://archive.org/metadata/${id}`
  try {
    const resp = await fetch(url, {keepalive: true})
    const data = await resp.json()
    return data
  } catch(e) {
    if (tries < maxTries) {
      return await getInternetArchiveMetadata(id, tries + 1, maxTries)
    } else {
      console.log(`unable to fetch ocr ${url}: ${e}`)
      return null
    }
  }
}

async function downloadOcr(item) {
  const id = item.metadata.iaId
  const ocrPath = path.join('static', 'docs', id, 'ocr.xml.gz')
  if (fs.existsSync(ocrPath)) {
    return ocrPath
  }
  const url = `https://s3.us.archive.org/${id}/${id}_abbyy.gz`
  try {
    const resp = await fetch(url, {keepalive: true, redirect: 'follow'})
    if (resp.status != 200) {
      console.log(`Error fetching OCR ${url}: ${resp.status}`)
      return null
    }
    const buffer = await resp.buffer()
    const dir = path.join('static','docs', id)
    if (! fs.existsSync(path.dirname(ocrPath))) {
      fs.mkdirSync(path.dirname(ocrPath), {recursive: true})
    }
    fs.writeFileSync(path.join(dir, 'ocr.xml.gz'), buffer)
    console.log(`downloaded ocr for ${id}`)
    return ocrPath
  } catch(e) {
    console.log(`unable to download ocr ${url}`)
    return null
  }
}

if (require.main === module) {
  main()
}