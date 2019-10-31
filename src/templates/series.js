import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import './series.css'

export default ({ data }) => {

  const series = data.seriesJson
  const episodes = data.allEpisodesJson.edges.map(({node}) => {
    return (
      <li className='episode'>
        {node.broadcastDate} <Link to={`/episode/${node.aapbId}/`}>{node.title}</Link><br />
      </li>
    )
  })

  // XXX: I'm not sure why this can sometimes happen e.g. detroit-symphony-orchestra
  if (! series) {
    return (
      <Layout>
        <div className="series"></div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="series">

        <section>
          <h2>
            <Link to="/programs/">All Programs</Link> / {series.title}
          </h2>
          <div className="description">
          {series.description}
          </div>
        </section>

        <br />

        <section id="episodes">
          <h3>Available episodes:</h3>
          <ul>
            {episodes}
          </ul>
        </section>
      </div>

    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    seriesJson(id: { eq: $id }) {
      id
      title
      description
    }
    allEpisodesJson(
      filter: {
        series: {
          id: {
            eq: $id
          }
        }
      }
      sort: {
        fields: broadcastDate,
        order: DESC
      }
    ) {
      edges {
        node {
          aapbId
          title
          description
          broadcastDate
        }
      }
    }
  }
`
