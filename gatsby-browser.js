const { Index } = require('./src/search')

exports.onClientEntry = function(args, options) {

  // get the index
  

  console.log(`loading ${__PATH_PREFIX__}/data/flexsearch.json`)
  fetch(`${__PATH_PREFIX__}/data/flexsearch.json`)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      const index = new Index()
      index.import(data)
      window.__INDEX__ = index
      console.log(`created index`)
    })
    .catch(function(e) {
      console.error(`Failed fetch search index: ${e}`)
    })

  // get the episodes

  fetch(`${__PATH_PREFIX__}/data/episodes.json`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      window.__EPISODES__ = makeMap(data)
    })

  // get the documents

  fetch(`${__PATH_PREFIX__}/data/documents.json`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      window.__DOCUMENTS__ = makeMap(data)
    })
}

/**
 * Creates a Map of the objects in a list using a given prop as a key
 * @param {*} objectList 
 * @param {*} key
 */

function makeMap(objectList) {
  const m = new Map()
  for (const o of objectList) {
    m.set(o['id'], o)
  }
  return m
}
