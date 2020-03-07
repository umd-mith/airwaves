import React from 'react'
import { Link, withPrefix } from 'gatsby'
import Highlighter from 'react-highlight-words'
import { excerpt } from '../utils'

import './search-result.css'

class Document extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this._isMounted  = true
    if (this.props.item.page) {
      const item = this.props.item
      const url = withPrefix(`/data/ocr/${item.id}/${item.page}.json`)
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          let text = data.text
          if (text && this._isMounted) {
            this.setState({text: excerpt(text, this.props.query, 500)})
          }
        })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const item = this.props.item
    const query = this.props.query

    let linkText = item.title
    let pageNum = 1

    if (item.page) {
      pageNum = Number.parseInt(item.page) + 1
      linkText += ` p. ${pageNum}`
    }

    const searchWords = query ? query.split() : []

    return (
      <div className="search-result">
        <div className="type document-type">document</div>
        <Link className="title" to={`/document/${item.iaId}/#${pageNum}`}>
          <Highlighter
            textToHighlight={linkText}
            searchWords={searchWords} />
        </Link>
        <div className="description">
          <Highlighter
            textToHighlight={this.state.text}
            searchWords={searchWords} />
        </div>
      </div>
    )
  }
}

const Episode = ({item, query}) => {

  const searchWords = query ? query.split() : []

  let series = 'foo'
  if (item.series) {
      series = (
        <Link className="series-title" to={'/programs/' + item.series.id}>
        <Highlighter
          textToHighlight={item.series.title}
          searchWords={searchWords} />
        </Link>
      )
  }

  return (
    <div className="search-result">
      <div className="type media-type">media</div>
      <Link className="title" to={'/episode/' + item.aapbId}>
        <Highlighter
          textToHighlight={item.title || ''}
          searchWords={searchWords} />
      </Link>
      {series}
      <div className="description">
        <Highlighter
          textToHighlight={item.description || ''}
          searchWords={searchWords} />
      </div>
    </div>
  )
}

const SearchResult = ({item, query}) => {
  if (item.id[0] === 'd') {
    return <Document key={item.id} item={item} query={query} />
  } else {
    return <Episode key={item.id} item={item} query={query} />
  }
}

export default SearchResult
