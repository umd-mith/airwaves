const fs = require('fs')
const sax = require('sax')
const zlib = require('zlib')

function getPages(doc) {
  // note: ocr is stored on disk using the Internet Archive id instead of the
  // short internal identifier that we use for indexing purposes
  return new Promise(async (resolve) => {
    const pages = await getOcr(doc.iaId)
    const docs = []
    pages.forEach((page, n) => {
      const pageId = `${doc.id}-${n}`
      docs.push({
        id: pageId,
        text: page
      })
    })
    resolve(docs)
  })
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

    const path = `static/docs/${iaId}/ocr.xml.gz`
    const gunzip = zlib.createGunzip()

    const input = fs.createReadStream(path)
    input.on('error', e => {
      console.log(`OCR: ${e}`)
      resolve([])
    })

    input.pipe(gunzip).pipe(saxStream)

  })
}

module.exports = { getPages }