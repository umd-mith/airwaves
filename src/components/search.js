import React, { Component } from 'react'
import SearchFacets from './search-facets'
import SearchResult from './search-result'
import './search.css'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: 'all',
      results: [],
      numResults: 100 
    }

    this.query = React.createRef()
    this.checkForEnter = this.checkForEnter.bind(this)
    this.setCategory = this.setCategory.bind(this)
    this.setResults = this.setResults.bind(this)
  }

  render() {

    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.slice(0, this.state.numResults).map((item, i) => {
          return <SearchResult item={item} query={this.query.current.value} key={`result-${i}`} />
        })
      } else {
        return ''
      }
    }

    return (
      <div className="page-search search">
        <section className="leader">
          <article className="">
            <input
            ref={this.query}
            type="text"
            onKeyPress={this.checkForEnter}
            placeholder={'Search'}
          />
          </article>
        </section>
        <section className="columns col_1_3">
          <SearchFacets results={this.state.results} />
          <article className="results">
            <div className="facet-panel item-sort">[sorting stuff here]</div>
            <div className="result-panel">
              <ResultList />
            </div>
          </article>
        </section>    
      </div>
	  )
  }

  checkForEnter(event) {
    if (event.key === 'Enter') {
      this.setResults()
      event.preventDefault()
    }
  }

  setCategory(event) {
    const query = this.query.current.value
    const newCategory = event.target.value
    this.setState({
      category: newCategory,
      results: this.search(query, newCategory)
    })
  }

  setResults() {
    this.setState({
      results: this.search(this.query.current.value, this.state.category)
    })
  }

  getFullResult(r) {
    if (r.id[0] === 'd') {
      const [docId, page] = r.id.split('-')
      const result = {...window.__DOCUMENTS__.get(docId), type: 'Document'}
      result['page'] = page
      result['text'] = r['text']
      return result
    } else if (r.id[0] === 'e') {
      return {...window.__EPISODES__.get(r.id), type: 'Episode'}
    }
  }

  search(query, category) {
    if (category === 'episodes') {
      return window.__INDEX__.search(query).filter(r => r.id[0] === 'e').map(r => {
        return this.getFullResult(r)
      })
    } else if (category === 'documents') {
      return window.__INDEX__.search({field: 'text', query: query}, {field: 'title', query: query}).filter(r => r.id[0] === 'd').map(r => {
        return this.getFullResult(r)
      })
    } else if (category === 'all') {
      return window.__INDEX__.search({field: ['text', 'title', 'description'], query: query, bool: 'or'}).map(r => {
        return this.getFullResult(r)
      })
    } else {
      return []
    }
  }

}

export default Search
