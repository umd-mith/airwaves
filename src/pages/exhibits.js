import path from 'path'
import React from "react"
import { graphql, withPrefix, Link } from "gatsby"

import Layout from "../components/layout"
import "./exhibits.css"


const ExhibitSummary = ({ title, excerpt, absPath }) => {
  const slug = path.basename(absPath).replace(/\.md$/, '')
  const url = withPrefix(`/exhibits/${slug}/`)
  return (
    <div className="exhibit-summary">
      <div className="title">
        <Link to={url}>{title}</Link>
      </div>
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
          { exhibits.map(e => (
            <ExhibitSummary 
              key={e.frontmatter.title}
              title={e.frontmatter.title} 
              absPath={e.fileAbsolutePath}
              excerpt={e.excerpt} />
          ))}
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
        }
        excerpt(format: PLAIN)
        fileAbsolutePath
      }
    }
  }
`

export default ExhibitsPage
