import React, { Component } from 'react'
import { Link } from 'gatsby'

function getRelated(names, objects) {
  const related = []
  for (const o of objects) {
    let found = false
    for (const s of o.subject || []) {
      if (names.has(s.name)) {
        found = true
      }
    }
    if (found) related.push(o)
  }
  return related.sort((a, b) => a.title.localeCompare(b.title))
}

const RelatedDocuments = ({subjects, documents}) => {
  return (
    <ul>
      {getRelated(subjects, documents).map(doc => (
      <li key={doc.iaId}>
        <Link to={`/document/${doc.iaId}/`}>{doc.title}</Link>
      </li>
      ))}
    </ul>
  )
}

export default RelatedDocuments