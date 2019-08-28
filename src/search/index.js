const FlexSearch = require('flexsearch')
const stopwords = require('./stopwords.json')


/**
 * A class to bundle up the various search indexes used by the app.
 */

class Index {

  constructor() {
    this.index = new FlexSearch({
      doc: {
        id: "id",
        field: {
          title: {
            encode: "extra",
            tokenize: "strict",
            threshold: 0,
            resolution: 1,
            filter: stopwords
          },
          text: {
            encode: "extra",
            tokenize: "strict",
            threshold: 0,
            resolution: 1,
            filter: stopwords
          },
          description: {
            encode: "extra",
            tokenize: "strict",
            threshold: 0,
            resolution: 1,
            filter: stopwords
          },
        }
      }
    })
  }

  search(query) {
    return this.index.search(query)
  }

  addEpisode(episode) {
    return this.index.add({
      id: episode.id,
      title: episode.title,
      description: episode.description,
    })
  }

  addPage(page) {
    return this.index.add({
      id: page.id,
      text: page.text,
    })
  }

  addDocument(doc) {
    return this.index.add({
      id: doc.id,
      title: doc.title,
    })
  }

  import(data) {
    this.index.import(data, {index: true, doc: true, serialize: false})
  }

  export() {
    return this.index.export({index: true, doc: true, serialize: false})
  }

}


module.exports = { Index }