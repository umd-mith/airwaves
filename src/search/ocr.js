/*

The modules exports one function getPages that will get the pages for a given document.
The document supplied needs to be an object that contains the property iaId for the Internet 
Archive identifier as well ad the local id. The first time this is run it will extract text of 
each page from the OCR file downloaded from the Internet Archive. Since this parsing takes 
some time the results are cached in static/data/ocr/ as individual JSON files.

*/

const fs = require('fs')
const sax = require('sax')
const zlib = require('zlib')

const ocrPath = 'static/data/ocr'

function getPages(doc) {
  return new Promise(async (resolve) => {
    // first look for the pages on disk
    let pages = getCached(doc.id)

    // if not in the cache we need to unpack the OCR and save it
    if (pages.length == 0) {
      console.log(`parsing ocr for ${doc.iaId}`)
      const texts = await getOcr(doc.iaId)
      texts.forEach((t, n) => {
        const pageId = `${doc.id}-${n}`
        const page = {
          id: pageId,
          text: t
        }
        pages.push(page)
        save(page)
      })
    }

    resolve(pages)
  })
}

function getCached(id) {
  const pages = []
  const ocrDir = `${ocrPath}/${id}`
  if (fs.existsSync(ocrDir)) {
    for (const jsonFile of fs.readdirSync(ocrDir)) {
      const jsonPath = `${ocrDir}/${jsonFile}`
      const data = fs.readFileSync(jsonPath)
      const page = JSON.parse(data)
      pages.push(page)
    }
  }
  return pages
}

function getOcr(iaId) {
  return new Promise(resolve => {

    let pages = []
    let page = []
    let line = []
    let insideCharParams = false

    const saxStream = sax.createStream()

    saxStream.on('opentag', n =>{
      if (n.name == 'CHARPARAMS') {
        insideCharParams = true
      }
    })

    saxStream.on('closetag', tag => {
      if (tag == 'LINE') {
        page.push(line.join(''))
        line = []
      } else if (tag == 'PAGE') {
        pages.push(page.join('\n'))
        page = []
      } else if (tag == 'CHARPARAMS') {
        insideCharParams = false
      }
    })

    saxStream.on('text', char => {
      if (insideCharParams) {
        line.push(char)
      }
    })

    saxStream.on('end', () => {
      resolve(pages)
    })
    
    saxStream.on('error', e => {
      console.log(`OCR: ${e}`)
      resolve([])
    })

    const path = `docs/ocr/${iaId}/ocr.xml.gz`
    if (! fs.existsSync(path)) {
      throw `Missing OCR file ${path}`
    }

    const gunzip = zlib.createGunzip()
    const input = fs.createReadStream(path)
    input.on('error', e => {
      console.log(`OCR: ${e}`)
      resolve([])
    })

    input.pipe(gunzip).pipe(saxStream)

  })
}

function save(page) {
  const [docId, seqId] = page.id.split('-')
  const dirName = `${ocrPath}/${docId}`
  if (! fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, {recursive: true})
  }
  const path = `${dirName}/${seqId}.json`
  fs.writeFileSync(path, JSON.stringify(page, null, 2))
}

module.exports = { getPages }
