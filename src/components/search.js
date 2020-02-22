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
      query: this.props.query,
      results: [],
      displayedResults: [],
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
    this.search()
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const resultsHidden = this.state.displayedResults.length > 0 ? '' : 'hidden'

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
            results={this.state.results}
            query={this.state.query}
            activeFacets={this.state.activeFacets}
            updateFacets={this.updateFacets} />
          <article className="results">
            <div className="facet-panel item-sort">[sorting stuff here]</div>
            <div id="results" className="result-panel">
              {this.state.displayedResults}
            </div>
          </article>
        </section> 
      </div>
	  )
  }

  handleScroll() {
    const now = new Date()
    const lastUpdate = this.state.lastUpdate

    const millisSinceLastUpdate = now - lastUpdate
    const percentViewed = (window.innerHeight = window.scrollY) / document.body.offsetHeight
    const results = this.state.results
    const displayedResults = this.state.displayedResults
    //console.log(percentViewed, millisSinceLastUpdate, displayedResults.length, results.length)

    if (percentViewed > .8 
        && millisSinceLastUpdate > 5000 
        && displayedResults.length > 0
        && results.length > displayedResults.length) {
      const start = displayedResults.length
      const end = start + 25
      console.log(`getting more results ${start}-${end}`)
      results.slice(start, end).forEach((item, i) => {
        displayedResults.push(
          <SearchResult 
            item={item}
            query={this.state.query}
            key={`result-${start + i}`} />
        )
      })
      this.setState({
        lastUpdate: now,
        displayedResults: displayedResults
      })
    }
  }

  checkForEnter(event) {
    if (event.key === 'Enter') {
      const q = this.query.current.value
      navigate(`?q=${q}`, {replace: true})
      this.setState({activeFacets: []})
      this.search(q, [])
      event.preventDefault()
    }
  }

  updateFacets(facet) {
    let activeFacets = []
    if (facet.active) {
      activeFacets = [facet, ...this.state.activeFacets]
    } else {
      activeFacets = this.state.activeFacets.filter(f => (
        f.type !== facet.type || f.name !== facet.name
      ))
    }
    this.search(this.state.query, activeFacets)
  }

  search(query, facets) {
    query = query || this.state.query
    facets = facets || this.state.activeFacets
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

    // apply facets
    results = results.filter(r => this.recordHasFacets(r, facets))

    // now generate the initial list of displayed results
    const displayedResults = results.slice(0, 25).map((item, i) => (
      <SearchResult 
        item={item}
        query={query}
        key={`result-${i}`} />
    ))

    // ready to update state!
    this.setState({
      query: query,
      activeFacets: facets,
      results: results,
      displayedResults: displayedResults,
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

      else if (facet.type === 'genre') {
        if (! r.genre) {
          return false
        } else if (! r.genre.find(g => g.name === facet.name)) {
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
