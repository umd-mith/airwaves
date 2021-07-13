import path from "path"
import React from "react"
import { graphql, Link } from "gatsby"
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
  const excerpt = convertMarkdown(lede)

  function ExhibitCoverImage(props) {
    return <img src={props.imgPath} alt="" />
  }

  return (
    <div key={slug} id={slug} className="exhibit-summary-card">
      <div className="exhibit-card-meta">
        <h2>
          <Link to={url}>{title}</Link>
        </h2>
        <p>{creator}</p>
      </div>
      <div className="exhibit-image">
        <ExhibitCoverImage imgPath={keyImage} />
      </div>
      <p
        className="excerpt text-block"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      ></p>
      <Link className="more-link" to={url}>
        Read More…
      </Link>
    </div>
  )
}

export default ExhibitSummaryCard
