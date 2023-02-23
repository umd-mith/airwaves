import path from "path"
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import ExhibitSummaryCard from "../components/exhibit-summary"
import "./exhibits.css"

const ExhibitsPage = ({ data }) => {
  const exhibits = data.allMarkdownRemark.nodes.filter((e) => e.frontmatter.title !== "[Dummy]")

  return (
    <Layout title="Exhibits">
      <div className="page-exhibits">
        <section>
          <h1>Exhibits</h1>
        </section>
        <section>
          <ul className="exhibits-toc">
            {exhibits.map(e => (
              <li key={e.frontmatter.title}>
                <Link
                  to={`#${path
                    .basename(e.fileAbsolutePath)
                    .replace(/\.md$/, "")}`}
                >
                  {e.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="exhibits">
          {exhibits.map(e => (
            <ExhibitSummaryCard
              key={e.fileAbsolutePath}
              title={e.frontmatter.title}
              creator={e.frontmatter.creator || ""}
              keyImage={e.frontmatter.key_image}
              absPath={e.fileAbsolutePath}
              lede={e.frontmatter.lede}
            />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___title, order: ASC }
      filter: { fileAbsolutePath: { regex: "/exhibits/" } }
    ) {
      nodes {
        frontmatter {
          creator
          key_image
          lede
          title
        }
        fileAbsolutePath
      }
    }
  }
`

export default ExhibitsPage
