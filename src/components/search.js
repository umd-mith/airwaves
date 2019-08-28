import React, { Component } from 'react'
import { Link } from 'gatsby'
import Highlighter from 'react-highlight-words'
import './search.css'

const DocumentHit = ({item, query}) => {
  return (
    <>
      <Link to={`/document/${item.iaId}`}>
        <h4>
          <Highlighter
            textToHighlight={item.title || ''}
            searchWords={query.split()} />
        </h4>
      </Link>
      <div>
        <Highlighter
          textToHighlight={item.text || ''}
          searchWords={query.split()} />
      </div>
    </>
  )
}

const EpisodeHit = ({item, query}) => {
  return (
    <>
      <Link to={'/episode/' + item.aapbId}>
      <h4>
        <Highlighter
          textToHighlight={item.title || ''}
          searchWords={query.split()} />
      </h4>
      </Link>
      <div>
        <Highlighter
          textToHighlight={item.description || ''}
          searchWords={query.split()} />
      </div>
    </>
  )
}

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: 'episodes',
      query: '',
      results: []
    }

    this.setQuery = this.setQuery.bind(this)
    this.checkForEnter = this.checkForEnter.bind(this)
    this.setCategory = this.setCategory.bind(this)
    this.setResults = this.setResults.bind(this)
  }

  componentDidMount() {
    const query = window.location.hash.substr(1) || ''
    this.setState({query})
  }

  render() {
    // the type of hit is dependent on the category
    const Hit = this.state.category === 'episodes' ? EpisodeHit : DocumentHit

    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((item, i) => (
          <Hit item={item} query={this.state.query} key={i} />
        ))
      } else {
        return ''
      }
    }

    return (
      <div className="search">
        <select value={this.state.category} onChange={this.setCategory}>
          <option value="episodes">Episodes</option>
          <option value="documents">Documents</option>
        </select>
        <input
          className="search__input"
          type="text"
          value={this.state.query}
          onChange={this.setQuery}
          onKeyPress={this.checkForEnter}
          placeholder={'Search'}
        />
        <button onClick={this.setResults}>Search</button>
        <div className="search__list">
          <ResultList />
        </div>
      </div>
    )
  }

  setQuery(event) {
    this.setState({ query: event.target.value })
  }

  checkForEnter(event) {
    if (event.key === 'Enter') {
      this.setResults()
    }
  }

  setCategory(event) {
    const query = this.state.query
    const newCategory = event.target.value
    this.setState({
      category: newCategory,
      results: this.search(query, newCategory)
    })
  }

  setResults() {
    this.setState({
      results: this.search(this.state.query, this.state.category)
    })
  }

  search(query, category) {
    if (typeof window === 'undefined') {
      return []
    } else if (category === 'episodes') {
      return window.__INDEX__.search(query).filter(r => r.id[0] === 'e').map(r => {
        return window.__EPISODES__.get(r.id)
      })
    } else {
      return window.__INDEX__.search({field: 'text', query: query}, {field: 'title', query: query}).filter(r => r.id[0] === 'd').map(r => {
        const [docId, page] = r.id.split('-')
        console.log(docId, page)
        const doc = window.__DOCUMENTS__.get(docId)
        doc['page'] = page
        doc['text'] = r['text']
        return doc
      })
    }
  }

}

export default Search
