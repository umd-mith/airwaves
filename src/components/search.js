import React, { Component } from 'react'
import SearchFacets from './search-facets'
import SearchResult from './search-result'
import { navigate } from '@reach/router'
import './search.css'

class Search extends Component {

  constructor(props) {
    super(props)

    this.state = {
      category: 'all',
      numResults: 25,
      query: this.props.query,
      activeFacets: [],
      lastUpdate: new Date()
    }

    // initialize active facets with any that were passed in from the URL query string
    this.state.activeFacets = this.unpackFacetParams(this.props.facets)

    this.query = React.createRef()
    this.updateFacets = this.updateFacets.bind(this)
    this.checkForEnter = this.checkForEnter.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
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
          <SearchFacets 
            results={results}
            activeFacets={this.state.activeFacets}
            updateFacets={this.updateFacets} />
          <article className="results">
            <div className="facet-panel item-sort">[sorting stuff here]</div>
            <div id="results" className="result-panel">
              <ResultList onScroll={this.handleScroll} />
            </div>
          </article>
        </section> 
      </div>
	  )
  }

  handleScroll() {
    const now = new Date()
    const millisSinceLastUpdate = now - this.state.lastUpdate
    // XXX: remove if not used
    const bottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500
    const percentViewed = (window.innerHeight = window.scrollY) / document.body.offsetHeight
    console.log(window.innerHeight, window.scrollY, document.body.offsetHeight, percentViewed)
    if (percentViewed > .4 && millisSinceLastUpdate > 5000) {
      console.log(`getting more results ${this.state.numResults + 10}`)
      this.setState({
        numResults: this.state.numResults + 10,
        lastUpdate: now
      })
    }
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
        f.type !== facet.type || f.name !== facet.name
      ))
      this.setState({ activeFacets })
    }
  }

  search(query, facets) {
    let results = []

    // if we have a query search the index
    if (query) {
      const q = {
        field: ['text', 'title', 'description', 'series'], 
        query: query,
        bool: 'or'
      }

      results = window.__INDEX__.search(q)
      results = results.map(r => this.getFullResult(r))
    }
  
    // if we don't have a query but we do have some facets get everything
    else if (facets.length > 0) {
      for (const d of window.__DOCUMENTS__.values()) {
        results.push(d)
      }
      for (const e of window.__EPISODES__.values()) {
        results.push(e)
      }
    }

    // return records after filtering with any active facets
    return results.filter(r => this.recordHasFacets(r, facets))
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
      
      else if (facet.type === 'subject') {
        if (! r.subject) {
          return false
        }
        else if (! r.subject.find(s => s.name === facet.name)) {
          return false
        }
      }

      else if (facet.type === 'creator') {
        if (! r.creator) {
          return false
        }
        else if (! r.creator.find(c => c.name === facet.name)) {
          return false
        }
      }

      else if (facet.type === 'contributor') {
        if (! r.contributor) {
          return false
        }
        else if (! r.contributor.find(c => c.name === facet.name)) {
          return false
        }
      }

      else if (facet.type === 'decade') {
        if (! r.decade) {
          return false
        }
        else if (r.decade !== facet.name) {
          return false
        }
      }

    }

    return true
  }

  unpackFacetParams(facetParams) {
    if (! facetParams) {
      return []
    }

    // put into an array if a string was passed in
    if (! Array.isArray(facetParams)) {
      facetParams = [facetParams]
    }

    // parse a facet, e.g. "subject:Nelson, Ted"
    // but be careful because the value could contain a colon
    return facetParams.map(f => {
      const i = f.indexOf(':')
      return {
        type: f.substr(0, i),
        name: f.substr(i + 1)
      }
    })
  }

}

export default Search
