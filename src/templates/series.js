import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { formatDuration } from '../utils.js'
import Feed from '../svg/feed.svg'
import './series.css'

export default ({ data }) => {
  const series = data.seriesJson
  const siteUrl = data.allSite.nodes[0].siteMetadata.siteUrl

  // roll up all these various metadata terms
  const subjects = new Set()
  const creators = new Set()
  const contributors = new Set()
  const genres = new Set()
  const times = new Set()

  const episodes = data.allEpisodesJson.edges.map(({node}) => {
    if (! node.subject) node.subject = []
    node.subject.forEach(s => {
      subjects.add(s.name)
    }) 
    if (! node.creator) node.creator = []
    node.creator.forEach(c => {
      creators.add(c.name)
    })
    if (! node.contributor) node.contributor = []
    node.contributor.forEach(c => {
      contributors.add(c.name)
    })
    if (! node.genre) node.genre = []
    node.genre.forEach(g => {
      genres.add(g.name)
    })
    times.add(node.decade)

    return (
      <div key={node.aapbId} className='episode'>
        <span className="ep-date">{node.broadcastDate}</span> 
        <span className="ep-title"><Link to={`/episode/${node.aapbId}/`}>{node.title}</Link></span> 
        <span className="ep-time">{formatDuration(node.duration)}</span>
      </div>
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
    <Layout feedUrl={`/rss/${series.id}.xml`}>
      <div className="series">
        <section className="leader">
          <h1>
            <Link to="/programs/">All Programs</Link> / {series.title}
          </h1>
          <article className="description">
          {series.description}
          </article>
        </section>
        <section id="programs" className="columns col_1_2">
          <article className="pgm-eps">
            <h2>Available Episodes</h2>
            <div>
              {episodes}
            </div>
          </article>
          <article className="pgm-related">
            <h2>Related Materials</h2>
            <p></p>
          </article>
        </section>
        <section className="columns col_full">
          <article className="pgm-meta">
            <dl>
              <dt>Subjects</dt>
              <dd>{displayMetadataValues(subjects, 'subject')}</dd>
              <dt>Creators</dt>
              <dd>{displayMetadataValues(creators, 'creator')}</dd>
              <dt>Contributors</dt>
              <dd>{displayMetadataValues(contributors, 'contributor')}</dd>
              <dt>Genres</dt>
              <dd>{displayMetadataValues(genres, 'genre')}</dd>
              <dt>Time Period</dt>
              <dd>{displayMetadataValues(times, 'decade')}</dd>
            </dl>
            <div title={`Podcast URL for ${series.title}`}>
              <a href={`${siteUrl}/rss/${series.id}.xml`}>
                <Feed width="50" />
              </a>
            </div>
          </article>
        </section>
      </div>

    </Layout>
  )
}

function displayMetadataValues(s, name) {
  let l = Array.from(s.values()).sort()
  l = l.map((v, i) => [
    i > 0 && " ; ",
    <Link key={`${name}:${v}`} to={`/search/?f=${name}:${v}`}>{v}</Link>
  ])
  return l
}

export const query = graphql`
  query($id: String!) {
    allSite {
      nodes {
        siteMetadata {
          siteUrl
        }
      }
    }
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
          duration
          subject {
            name
          }
          creator {
            name
          }
          contributor {
            name
          }
          genre {
            name
          }
          decade
        }
      }
    }
  }
`

