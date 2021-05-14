import React from 'react'
import { Link } from 'gatsby'

const RelatedSeries = ({doc}) => {
  const related = doc.relatedSeries || []
  related.sort((a, b) => a.title.localeCompare(b.title))
  
  return (
    <ul>
      {related.map(series => (
      <li key={series.id}>
        <Link to={`/programs/${series.id}/`}>{series.title}</Link>
      </li>
      ))}
    </ul>
  )
}

export default RelatedSeries