import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import remark from "remark"
import remarkHtml from "remark-html"
import recommended from "remark-preset-lint-recommended"

import "./about.css"

const convertMarkdown = remark()
  .use(recommended)
  .use(remarkHtml).processSync

const AboutPage = ({ data }) => {
  const cmsData = data.allMarkdownRemark.nodes[0]

  return (
    <Layout url="/about/">
      <div className="page-about">
        <section dangerouslySetInnerHTML={{ __html: cmsData.html }}></section>
        <section
          dangerouslySetInnerHTML={{
            __html: convertMarkdown(cmsData.frontmatter.team),
          }}
        ></section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/cms-pages/" } }) {
      nodes {
        html
        fileAbsolutePath
        frontmatter {
          team
        }
      }
    }
  }
`

export default AboutPage
