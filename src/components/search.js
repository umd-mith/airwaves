import React, { Component } from 'react'
import SearchFacets from './search-facets'
import SearchResult from './search-result'
import { navigate } from '@reach/router'
import './search.css'

class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      indexLoaded: false,
      category: 'all',
      numResults: 100,
      query: this.props.query
    }

    this.query = React.createRef()
    this.checkForEnter = this.checkForEnter.bind(this)
    this.setCategory = this.setCategory.bind(this)
  }

  componentDidMount() {
    this.checkIndex()
  }

  render() {

    let results = []
    if (this.state.indexLoaded) {
      results = this.search(this.state.query, this.state.category)
    }

    const ResultList = () => {
      if (this.state.indexLoaded === false) {
        return "loading..."
      } else if (results.length > 0) {
        return results.slice(0, this.state.numResults).map((item, i) => {
          return <SearchResult item={item} query={this.state.query} key={`result-${i}`} />
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
          <SearchFacets results={results} />
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
      const q = this.query.current.value
      navigate(`/search/?q=${q}`, {replace: true})
      this.setState({query: q})
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

  search(query, category) {
    if (! query) {
      const results = []
      for (const d of window.__DOCUMENTS__.values()) {
        results.push(d)
      }
      for (const e of window.__EPISODES__.values()) {
        results.push(e)
      }
      return results
    } else if (category === 'episodes') {
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

  checkIndex() {
    if (window.__INDEX__ && window.__DOCUMENTS__ && window.__EPISODES__) {
      console.log('index loaded')
      this.setState({indexLoaded: true})
    } else {
      console.log('index not loaded yet')
      setTimeout(this.checkIndex.bind(this), 500)
    }
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

}

export default Search