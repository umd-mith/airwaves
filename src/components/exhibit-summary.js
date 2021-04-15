import path from "path"
import React from "react"
import { Link, withPrefix } from "gatsby"

const ExhibitSummaryCard = ({ title, keyImage, lede, absPath }) => {
  const slug = path.basename(absPath).replace(/\.md$/, "")
  const url = `/exhibits/${slug}/`

  return (
    <div className="exhibit-summary-card">
      <h2>
        <Link to={url}>{title}</Link>
      </h2>
      <img src={withPrefix(keyImage.image)} alt={keyImage.title} />
      <p>{lede}</p>
      <Link to={url}>Read More…</Link>
    </div>
  )
}

export default ExhibitSummaryCard
