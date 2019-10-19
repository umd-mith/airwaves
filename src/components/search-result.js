import React from 'react'
import { Link } from 'gatsby'
import Highlighter from 'react-highlight-words'
import './search-result.css'

const Document = ({item, query}) => {
  const pageNum = Number.parseInt(item.page) + 1
  const linkText = item.title + ` p. ${pageNum}` 

  return (
    <div className="search-result document">
      <Link to={`/document/${item.iaId}/#${pageNum}`}>
        <Highlighter
          textToHighlight={linkText}
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

const Episode = ({item, query}) => {
  return (
    <div className="search-result episode">
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

const SearchResult = ({item, query}) => {
  if (item.id[0] === 'd') {
    return <Document item={item} query={query} />
  } else {
    return <Episode item={item} query={query} />
  }
}

export default SearchResult