import React from 'react'
import { Link } from 'gatsby'
import Highlighter from 'react-highlight-words'
import './search-result.css'

const Document = ({item, query}) => {

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
          textToHighlight={item.text || ''}
          searchWords={searchWords} />
      </div>
    </div>
  )
}

const Episode = ({item, query}) => {
  const searchWords = query ? query.split() : []
  return (
    <div className="search-result">
      <div className="type media-type">media</div>
      <Link className="title" to={'/episode/' + item.aapbId}>
        <Highlighter
          textToHighlight={item.title || ''}
          searchWords={searchWords} />
      </Link>
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
    return <Document item={item} query={query} />
  } else {
    return <Episode item={item} query={query} />
  }
}

export default SearchResult
