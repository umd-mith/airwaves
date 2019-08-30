import React from "react"
import { graphql, Link } from "gatsby"
import './series.css'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {

  const seriesList = data.allSeriesJson.edges.map( ({node}) => (
    <li><Link to={`/series/${node.id}/`}>{node.title}</Link></li>
  ))

  return (
    <Layout>
      <SEO title="Unlocking the Airwaves: Series" keywords={[`archive`, `radio`]} />
      <section id="series">
        <h1>Series</h1>
        <ul>
          {seriesList}
        </ul>
      </section>
     </Layout>
  )

}

export const query = graphql`
  query {
    allSeriesJson {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`