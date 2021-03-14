import path from 'path'
import React from "react"
import { graphql, Link, withPrefix } from "gatsby"

import Layout from "../components/layout"
// import "./exhibits.css"

const ExhibitSummary = ({ title, visuals, excerpt, absPath }) => {
  const slug = path.basename(absPath).replace(/\.md$/, '')
  const url = `/exhibits/${slug}/`

  let img = ''
  if (visuals && visuals.length > 0) {
    img = <img src={withPrefix(visuals[0].image)} alt={visuals[0].title} />
  }
  return (
    <div className="exhibit-summary">
      <h2 className="title">
        <Link to={url}>{title}</Link>
      </h2>
      <section>
        {img}
        <div className="excerpt">
          {excerpt}
          <Link to={url}>Read More...</Link>
        </div>
      </section>
    </div>
  )
}

const ExhibitsPage = ({ data }) => {
  const exhibits = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <div>
        <section className="leader">
          <h1>Exhibits</h1>
          <article className="exhibits">
            { exhibits.map(e => (
              <ExhibitSummary 
                key={e.frontmatter.title}
                title={e.frontmatter.title} 
                visuals={e.frontmatter.visuals}
                absPath={e.fileAbsolutePath}
                excerpt={e.excerpt} />
            ))}
          </article>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: {
        order: ASC,
        fields: frontmatter___title
      }
    ) {
      nodes {
        frontmatter {
          title
          visuals {
            image
            title
          }
        }
        excerpt(format: PLAIN)
        fileAbsolutePath
      }
    }
  }
`

export default ExhibitsPage
