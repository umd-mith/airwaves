import path from "path"
import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import remark from "remark"
import remarkHtml from "remark-html"
import recommended from "remark-preset-lint-recommended"

import "./exhibit-summary.css"

const convertMarkdown = remark()
  .use(recommended)
  .use(remarkHtml).processSync

const ExhibitSummaryCard = ({ title, creator, keyImage, lede, absPath }) => {
  const slug = path.basename(absPath).replace(/\.md$/, "")
  const url = `/exhibits/${slug}/`
  const gimage = getImage(keyImage.image)

  return (
    <div id={slug} className="exhibit-summary-card">
      <h2>
        <Link to={url}>{title}</Link>
      </h2>
      <p>{creator}</p>
      <div className="exhibit-card-body">
        <GatsbyImage image={gimage} alt={keyImage.title} />
        <p
          className="excerpt"
          dangerouslySetInnerHTML={{ __html: convertMarkdown(lede) }}
        ></p>
      </div>
      <Link className="more-link" to={url}>
        Read More…
      </Link>
    </div>
  )
}

export default ExhibitSummaryCard
