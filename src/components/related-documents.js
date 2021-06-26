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

/*

RelatedDocuments uses three parameters to generate a component that
lists related documents:

- relatedNames: a Set containing the names of any related subjects or people
- relatedDocs: a list of objects from the series.relatedFolders and series.relatedItems
- documents: a list of all documents to search

*/

const RelatedDocuments = ({relatedNames, relatedDocs, documents}) => {
  let related = getRelated(relatedNames, documents)

  // add any related folders that weren't already included
  const iaIds = new Set(related.map(r => r.iaId))
  for (const folder of relatedDocs || []) {
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
