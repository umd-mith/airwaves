import React, { Component } from 'react'
import { Link } from 'gatsby'
import Highlighter from 'react-highlight-words'
import './search.css'

const DocumentHit = ({item, query}) => {
  return (
    <div className="hit document">
      <Link to={`/document/${item.iaId}`}>
        <Highlighter
          textToHighlight={item.title || ''}
          searchWords={query.split()} />
      </Link>
      <div>
        <Highlighter
          textToHighlight={item.text || ''}
          searchWords={query.split()} />
      </div>
    </div>
  )
}

const EpisodeHit = ({item, query}) => {
  return (
    <div className="hit episode">
      <Link to={'/episode/' + item.aapbId}>
        <Highlighter
          textToHighlight={item.title || ''}
          searchWords={query.split()} />
      </Link>
      <div>
        <Highlighter
          textToHighlight={item.description || ''}
          searchWords={query.split()} />
      </div>
    </div>
  )
}

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
          if (item.id[0] === 'd') {
            return <DocumentHit item={item} query={this.state.query} key={i} />
          } else {
            return <EpisodeHit item={item} query={this.state.query} key={i} />
          }
        })
      } else {
        return ''
      }
    }

    return (
      <div className="search">

        <input
          type="text"
          value={this.state.query}
          onChange={this.setQuery}
          onKeyPress={this.checkForEnter}
          placeholder={'Search'}
        />
        
        <div className="facets">
          <div className="facet-panel facet-type">
            <label className="facet-label facet-label-type">Filter By Type</label>
            <dl className="facet-list">
            <dd className="item-count">999</dd>
            <dt>
              <input type="radio" name="item-type" value="all" defaultChecked={true} 
                  onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">999</dd>
            <dt>
              <input type="radio" name="item-type" value="episodes" 
                  onClick={this.setCategory} />
              <label title="Media">Media</label>
            </dt>
            <dd className="item-count">99</dd>
            <dt>
              <input type="radio" name="item-type" value="documents"
                  onClick={this.setCategory} />
              <label title="Documents">Documents</label>
            </dt>
            </dl>
          </div>
          <div className="facet-panel facet-decade">
            <label className="facet-label facet-label-decade">Filter by Decade</label>
            <dl className="facet-list">
            <dd className="item-count">999</dd>
            <dt>
              <input type="checkbox" name="item-decade" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">99</dd>
            <dt>
              <input type="checkbox" name="item-decade" value="1950s" onClick={this.setCategory} />
              <label title="1950s">1950 &ndash; 1959</label>
            </dt>
            </dl>
          </div>
          <div className="facet-panel facet-expandable facet-subject">
            <label className="facet-label facet-label-subject">Filter by Subject</label>
            <dl className="facet-list">
            <dd className="item-count">777</dd>
            <dt>
              <input type="checkbox" name="item-subject" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">77</dd>
            <dt>
              <input type="checkbox" name="item-subject" value="s1" onClick={this.setCategory} />
              <label title="s1">Subject One</label>
            </dt>
            </dl>
          </div>
          <div className="facet-panel facet-expandable facet-creator">
            <label className="facet-label facet-label-creator">Filter by Creator</label>
            <dl className="facet-list">
            <dd className="item-count">888</dd>
            <dt>
              <input type="checkbox" name="item-creator" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">88</dd>
            <dt>
              <input type="checkbox" name="item-creator" value="c1" onClick={this.setCategory} />
              <label title="c1">Creator Name</label>
            </dt>
            </dl>
          </div>
          <div className="facet-panel facet-expandable facet-genre">
            <label className="facet-label facet-label-genre">Filter by Genre</label>
            <dl className="facet-list">
            <dd className="item-count">555</dd>
            <dt>
              <input type="checkbox" name="item-genre" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">55</dd>
            <dt>
              <input type="checkbox" name="item-genre" value="g1" onClick={this.setCategory} />
              <label title="g1">Genre One</label>
            </dt>
            </dl>
            <div>
            <label className="facet-label">
              <Link to="/series/" className="button">
              View all Series
              </Link>
            </label>
            </div>
          </div>
        </div>

        <div className="results">
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
    if (category === 'episodes') {
      return window.__INDEX__.search(query, {limit: 100}).filter(r => r.id[0] === 'e').map(r => {
        return window.__EPISODES__.get(r.id)
      })
    } else if (category === 'documents') {
      return window.__INDEX__.search({field: 'text', query: query}, {field: 'title', query: query, limit: 100}).filter(r => r.id[0] === 'd').map(r => {
        const [docId, page] = r.id.split('-')
        const doc = window.__DOCUMENTS__.get(docId)
        doc['page'] = page
        doc['text'] = r['text']
        return doc
      })
    } else if (category === 'all') {
      return window.__INDEX__.search({field: ['text', 'title', 'description'], query: query, bool: 'or', limit: 100}).map(r => {
        if (r.id[0] === 'd') {
          const [docId, page] = r.id.split('-')
          const doc = window.__DOCUMENTS__.get(docId)
          doc['page'] = page
          doc['text'] = r['text']
          return doc
        } else if (r.id[0] === 'e') {
          return window.__EPISODES__.get(r.id)
        } else {
          // TODO: return episodes and documents!
          return window.__EPISODES__.get(r.id)
        }

      })
    } else {
      return []
    }
  }

}

export default Search
