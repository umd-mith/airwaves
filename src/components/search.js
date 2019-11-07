import React, { Component } from 'react'
import SearchFacets from './search-facets'
import SearchResult from './search-result'
import { navigate } from '@reach/router'
import './search.css'
import { FaCentercode } from 'react-icons/fa'

class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      category: 'all',
      numResults: 100,
      query: this.props.query,
      activeFacets: []
    }

    this.query = React.createRef()
    this.updateFacets = this.updateFacets.bind(this)
    this.checkForEnter = this.checkForEnter.bind(this)
  }

  render() {

    let results = []
    results = this.search(this.state.query, this.state.activeFacets)

    const ResultList = () => {
      if (results.length > 0) {
        return results.slice(0, this.state.numResults).map((item, i) => {
          return <SearchResult item={item} query={this.state.query} key={`result-${i}`} />
        })
      } else {
        return ''
      }
    }

    const resultsHidden = results.length > 0 ? '' : 'hidden'

    return (
      <div className="page-search search">
        <section className="leader">
          <article className="">
            <input
              ref={this.query}
              type="text"
              defaultValue={this.state.query}
              onKeyPress={this.checkForEnter}
              placeholder={'Search'} />
          </article>
        </section>
        <section className={`columns col_1_3 ${resultsHidden}`}>
          <SearchFacets results={results} updateFacets={this.updateFacets} />
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
      navigate(`?q=${q}`, {replace: true})
      this.setState({query: q})
      event.preventDefault()
    }
  }

  updateFacets(facet) {
    if (facet.active) {
      this.setState({activeFacets: [facet, ...this.state.activeFacets]})
    } else {
      const activeFacets = this.state.activeFacets.filter(f => (
        f.type !== f.type || f.name !== f.name
      ))
      this.setState({ activeFacets })
    }
  }

  search(query, facets) {

    const q = {
      field: ['text', 'title', 'description'], 
      query: query,
      bool: 'or'
    }

    return window.__INDEX__
      .search(q)
      .map(r => this.getFullResult(r))
      .filter(r => this.recordHasFacets(r, facets))

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

  recordHasFacets(r, facets) {
    if (facets.length === 0) {
      return true
    }

    // facets are ANDed, so return false once a facet doesn't match

    for (const facet of facets) {

      if (facet.type === 'type') {
        if (facet.name !== r.type) {
          return false
        }
      }
      
      else if (r.subject && facet.type === 'subject') {
        if (! r.subject.find(s => s.name == facet.name)) {
          return false
        }
      }

      else if (r.creator && facet.type == 'creator') {
        if (! r.creator.find(c => c.name == facet.name)) {
          return false
        }
      }

      else if (r.decade && facet.type == 'decade') {
        if (r.decade != facet.name) {
          return false
        }
      }

    }

    return true
  }

}

export default Search