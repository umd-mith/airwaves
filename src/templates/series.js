import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import './series.css'

export default ({ data }) => {

  const series = data.seriesJson
  const episodes = data.allEpisodesJson.edges.map(({node}) => {
    return (
      <li className='episode'>
        <Link to={`/episode/${node.aapbId}/`}>{node.title}</Link><br />
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

          <h1>
            <Link to="/series/">Series</Link> / {series.title}
          </h1>

          <div className="description">
          {series.description}
          </div>

        </section>

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
    allEpisodesJson(filter: {series: {id: {eq: $id}}}) {
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