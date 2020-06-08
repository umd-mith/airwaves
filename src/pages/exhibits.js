import path from 'path'
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import "./exhibits.css"


const ExhibitSummary = ({ title, visuals, excerpt, absPath }) => {
  //const image = visuals[0]
  const slug = path.basename(absPath).replace(/\.md$/, '')
  const url = `/exhibits/${slug}/`
  return (
    <div className="exhibit-summary">
      <h2 className="title">
        <Link to={url}>{title}</Link>
      </h2>
      <div className="excerpt">
        {excerpt}
        <Link to={url}>Read More...</Link>
      </div>
    </div>
  )
}

const ExhibitsPage = ({ data }) => {
  const exhibits = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <div className="page-exhibits">
        <section className="leader">
          <h1>Exhibits</h1>
          <article>
            { exhibits.map(e => (
              <ExhibitSummary 
                key={e.frontmatter.title}
                title={e.frontmatter.title} 
                visuals={e.frontmatter.visuals.image}
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
          }
        }
        excerpt(format: PLAIN)
        fileAbsolutePath
      }
    }
  }
`

export default ExhibitsPage
