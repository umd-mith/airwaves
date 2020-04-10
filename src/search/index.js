const elasticlunr = require('elasticlunr')
const stopwords = require('./stopwords.json')

elasticlunr.addStopWords(stopwords)

/**
 * A class to bundle up the various search indexes used by the app.
 */

class Index {

  constructor() {
    this.index = elasticlunr(i => {
      i.addField('id')
      i.addField('text')
      i.addField('description')
      i.addField('series')
      i.addField('subject')
    })
  }

  search(query) {
    return this.index.search(query, {})
  }

  addEpisode(episode) {
    const doc = {
      id: episode.id,
      title: episode.title,
      description: episode.description,
      series: episode.series ? episode.series.title : '',
      text: '',
      subject: encodeSubject(episode.subject)
    }
    return this.index.addDoc(doc)
  }

  addPage(page) {
    return this.index.addDoc({
      id: page.id,
      title: '',
      description: '',
      series: '',
      text: page.text,
      subject: encodeSubject(page.subject)
    })
  }

  addDocument(doc) {
    return this.index.addDoc({
      id: doc.id,
      title: doc.title,
      description: '',
      series: '',
      text: '',
      subject: encodeSubject(doc.subject)
    })
  }

  import(data) {
    this.index = elasticlunr.Index.load(data)
  }

  export() {
    this.index.documentStore.docs = {}
    return JSON.stringify(this.index)
  }

}

function encodeSubject(subject) {
  if (subject) {
    return JSON.stringify(subject.map(s => s.name))
  } else {
    return ''
  }
}

module.exports = { Index }
