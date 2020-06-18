import React from 'react'
import { Link } from 'gatsby'

function getRelated(names, docs) {
  const related = []
  for (const doc of docs) {
    let foundMatch = false
    for (const property of ['subject', 'contributor', 'creator']) {
      for (const auth of doc[property] || []) {
        if (names.has(auth.name)) {
          foundMatch = true
          break
        }
      }
    }
    if (foundMatch) related.push(doc)
  }
  return related
}

const RelatedDocuments = ({names, relatedFolders, documents}) => {
  let related = getRelated(names, documents)

  // add any related folders that weren't already included
  const iaIds = new Set(related.map(r => r.iaId))
  for (const folder of relatedFolders || []) {
    if (! iaIds.has(folder.iaId)) {
      related.push(folder)
    }
  }

  // sort related alphabetically by title
  related.sort((a, b) => a.title.localeCompare(b.title))
  
  return (
    <ul>
      {related.map(doc => (
      <li key={doc.iaId}>
        <Link to={`/document/${doc.iaId}/`}>{doc.title}</Link>
      </li>
      ))}
    </ul>
  )
}

export default RelatedDocuments