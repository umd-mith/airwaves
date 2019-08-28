const fs = require('fs')
const path = require('path')

const { Index } = require('../search/index')
const { getPages } = require('../search/ocr')

const dataPath = path.resolve(__dirname, '../../static/data/')
const docsPath = path.resolve(dataPath, 'documents.json')
const episodesPath = path.resolve(dataPath, 'episodes.json')
const indexPath = path.resolve(dataPath, 'flexsearch.json')

const index = new Index()

async function main() {
  await indexPages()
  await indexEpisodes()

  console.log('writing index')
  fs.writeFileSync(indexPath, JSON.stringify(index.export(), null, 2))
}

async function indexPages() {
  await indexJson(docsPath, async doc => {
    index.addDocument(doc)
    const pages = await getPages(doc)
    for (let page of pages) {
      index.addPage(page)
    }
    console.log(`indexed ${doc.iaId} with ${pages.length} pages`)
  })
}

async function indexEpisodes() {
  await indexJson(episodesPath, ep => {
    index.addEpisode({
      id: ep.id,
      title: ep.title,
      description: ep.description
    })
    console.log('indexed episode:', ep.id)
  })
}

async function indexJson(jsonPath, f) {
  const data = require(jsonPath)
  for (let i=0; i < data.length; i += 1) {
    await f(data[i])
  }
}

if (require.main === module) {
  main()
}