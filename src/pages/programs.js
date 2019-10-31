import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

export default ({ data }) => {

  const seriesList = data.allSeriesJson.edges.map( ({node}) => (
    <li><Link to={`/programs/${node.id}/`}>{node.title}</Link></li>
  ))

  return (
    <Layout>
      <section id="programs">
        <h1>Programs</h1>
        <ul>
          {seriesList}
        </ul>
      </section>
    </Layout>
  )

}

export const query = graphql`
  query {
    allSeriesJson(
      sort: {
        fields: title,
        order: ASC 
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`
