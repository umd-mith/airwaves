import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import ExhibitSummaryCard from "../components/exhibit-summary"
// import "./exhibits.css"

const ExhibitsPage = ({ data }) => {
  const exhibits = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <div>
        <section className="leader">
          <h1>Exhibits</h1>
          <article className="exhibits">
            {exhibits.map(e => (
              <ExhibitSummaryCard
                title={e.frontmatter.title}
                keyImage={e.frontmatter.visuals[0]}
                absPath={e.fileAbsolutePath}
                lede={e.frontmatter.lede}
              />
            ))}
          </article>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___title, order: ASC }) {
      nodes {
        frontmatter {
          title
          lede
          creator
          visuals {
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
            title
          }
        }
        fileAbsolutePath
      }
    }
  }
`

export default ExhibitsPage
