import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import remark from "remark"
import remarkHtml from "remark-html"
import recommended from "remark-preset-lint-recommended"

import "./exhibit.css"

const convertMarkdown = remark()
  .use(recommended)
  .use(remarkHtml).processSync

const Visual = ({ title, image }) => {
  const gimage = getImage(image)

  return (
    <figure className="visual">
      <GatsbyImage image={gimage} alt={title} />
      {/* <img alt={title} title={title} src={withPrefix(image)} /> */}
      <figcaption
        dangerouslySetInnerHTML={{ __html: convertMarkdown(title).toString() }}
      />
    </figure>
  )
}

const RelatedItem = ({ title, url, description }) => (
  <div className="related">
    <h3>
      <Link to={url}>{title}</Link>
    </h3>
    <div
      className="description"
      dangerouslySetInnerHTML={{
        __html: convertMarkdown(description).toString(),
      }}
    />
  </div>
)

const Exhibit = ({ pageContext: exhibit }) => {
  if (!exhibit.visuals) exhibit.visuals = []
  return (
    <Layout title={exhibit.title}>
      <div className="page-exhibit">
        <section>
          <h1>
            <Link className="breadcrumb" to="/exhibits/">
              Exhibits
            </Link>{" "}
            {exhibit.title}
          </h1>
        </section>
        <section className="exhibit-body">
          <div dangerouslySetInnerHTML={{ __html: exhibit.description }} />
          <div className="visuals">
            {exhibit.visuals.map(v => (
              <Visual title={v.title} image={v.image} />
            ))}
          </div>
        </section>
        <section className="related_items">
          <h2>Related Items</h2>
          {(exhibit.related || []).concat(exhibit.relatedExt || []).map(r => (
            <RelatedItem
              title={r.title}
              description={r.description}
              url={r.url}
            />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Exhibit
