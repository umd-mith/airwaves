import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import "./about.css"

const AboutPage = ({ data }) => {
  const cmsData = data.allMarkdownRemark.nodes[0]

  return (
    <Layout url="/about/">
      <div className="page-about">
        <section dangerouslySetInnerHTML={{ __html: cmsData.html }}></section>
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
      }
    }
  }
`

export default AboutPage
