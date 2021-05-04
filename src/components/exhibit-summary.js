import path from "path"
import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ExhibitSummaryCard = ({ title, creator, keyImage, lede, absPath }) => {
  const slug = path.basename(absPath).replace(/\.md$/, "")
  const url = `/exhibits/${slug}/`
  const gimage = getImage(keyImage.image)

  return (
    <div className="exhibit-summary-card">
      <h2>
        <Link to={url}>{title}</Link>
      </h2>
      <p>{creator}</p>
      <GatsbyImage image={gimage} alt={keyImage.title} />
      <p>{lede}</p>
      <Link to={url}>Read More…</Link>
    </div>
  )
}

export default ExhibitSummaryCard
