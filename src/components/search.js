import React, { Component } from 'react'
import SearchFacets from './search-facets'
import SearchResult from './search-result'
import './search.css'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: 'all',
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

    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((item, i) => {
          return <SearchResult item={item} query={this.state.query} key={`result-${i}`} />
        })
      } else {
        return ''
      }
    }

    return (
      <div className="search columns col_1_3">

        <input
          type="text"
          value={this.state.query}
          onChange={this.setQuery}
          onKeyPress={this.checkForEnter}
          placeholder={'Search'}
        />

        <SearchFacets />

        <div className="results">
		      <div className="facet-panel item-sort">[sorting stuff here]</div>
          <div className="result-panel">
            <ResultList />
          </div>
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

  getFullResult(r) {
    if (r.id[0] === 'd') {
      const [docId, page] = r.id.split('-')
      const doc = {...window.__DOCUMENTS__.get(docId)}
      doc['page'] = page
      doc['text'] = r['text']
      return doc
    } else if (r.id[0] === 'e') {
      return {...window.__EPISODES__.get(r.id)}
    }
  }

  search(query, category) {
    if (category === 'episodes') {
      return window.__INDEX__.search(query, {limit: 100}).filter(r => r.id[0] === 'e').map(r => {
        return this.getFullResult(r)
      })
    } else if (category === 'documents') {
      return window.__INDEX__.search({field: 'text', query: query}, {field: 'title', query: query, limit: 100}).filter(r => r.id[0] === 'd').map(r => {
        return this.getFullResult(r)
      })
    } else if (category === 'all') {
      return window.__INDEX__.search({field: ['text', 'title', 'description'], query: query, bool: 'or', limit: 100}).map(r => {
        return this.getFullResult(r)
      })
    } else {
      return []
    }
  }

}

export default Search
