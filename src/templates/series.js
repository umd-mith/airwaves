import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { formatDuration } from "../utils.js"
import HeadsetIcon from "@material-ui/icons/Headset"
import RelatedDocuments from "../components/related-documents"
import SubscribeButton from "../components/subscribe-button"
import "./series.css"

const Series = ({ data, pageContext: { documents } }) => {
  const series = data.seriesJson
  const siteUrl = data.allSite.nodes[0].siteMetadata.siteUrl

  // roll up all these various metadata terms
  const subjects = new Set()
  const creators = new Set()
  const contributors = new Set()
  const genres = new Set()
  const times = new Set()

  const episodes = data.allEpisodesJson.edges.map(({ node }) => {
    if (!node.subject) node.subject = []
    node.subject.forEach(s => {
      subjects.add(s.name)
    })
    if (!node.creator) node.creator = []
    node.creator.forEach(c => {
      creators.add(c.name)
    })
    if (!node.contributor) node.contributor = []
    node.contributor.forEach(c => {
      contributors.add(c.name)
    })
    if (!node.genre) node.genre = []
    node.genre.forEach(g => {
      genres.add(g.name)
    })
    if (node.decade) times.add(node.decade)

    return (
      <div key={node.aapbId} className="series-episode">
        <span className="ep-date">{node.broadcastDate}</span>
        <span className="ep-title">
          <Link to={`/episode/${node.aapbId}/`}>{node.title}</Link>
        </span>
        <span className="ep-time">{formatDuration(node.duration)}</span>
      </div>
    )
  })

  // XXX: I'm not sure why this can sometimes happen e.g. detroit-symphony-orchestra
  if (!series) {
    return (
      <Layout>
        <div className="series"></div>
      </Layout>
    )
  }

  // create a unique set of all authority names for finding related items
  const authorityNames = new Set(
    Array.from(subjects),
    Array.from(creators),
    Array.from(contributors)
  )

  if (!series.relatedFolders) series.relatedFolders = []
  if (!series.relatedItems) series.relatedItems = []
  const relatedDocs = series.relatedFolders.concat(series.relatedItems)

  return (
    <Layout feedUrl={`/rss/${series.id}.xml`} title={`${series.title}`}>
      <div className="page-series">
        <section className="series-desc">
          <h1>
            <Link to="/programs/">All Programs</Link> / {series.title}
          </h1>
          <p>{series.description}</p>
        </section>
        <section className="series-wrapper">
          <div className="programs">
            <h2>Available Episodes</h2>
            {episodes}
            <div className="podcast" title={`Podcast URL for ${series.title}`}>
              <SubscribeButton 
                title={series.title}
                color="#e0ca59"
                imageUrl="/images/podcast.png"
                description={series.description}
                feedUrl={`${siteUrl}/rss/${series.id}.xml`} />
            </div>
          </div>
          <div className="related_documents">
            <h2>Related Documents</h2>
            <RelatedDocuments
              relatedNames={authorityNames}
              relatedDocs={relatedDocs}
              documents={documents}
            />
          </div>
        </section>
        <section className="series-meta metadata">
          <dl>
            {displayMetadataValues(subjects, "subject", "Subjects")}
            {displayMetadataValues(creators, "creator", "Creators")}
            {displayMetadataValues(contributors, "contributor", "Contributors")}
            {displayMetadataValues(genres, "genre", "Genres")}
            {displayMetadataValues(times, "decade", "Time Periods")}
          </dl>
        </section>
      </div>
    </Layout>
  )
}

function displayMetadataValues(s, facetName, facetTitle) {
  let l = Array.from(s.values()).sort()
  l = l.map((v, i) => [
    i > 0 && "; ",
    <Link key={`${facetName}:${v}`} to={`/search/?f=${facetName}:${v}`}>
      {v}
    </Link>,
  ])
  if (l.length > 0) {
    return (
      <>
        <dt className="label">{facetTitle}</dt>
        <dd>{l}</dd>
      </>
    )
  } else {
    return ""
  }
}

export default Series

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
      relatedFolders {
        iaId
        title
      }
      relatedItems {
        iaId
        title
      }
    }
    allEpisodesJson(
      filter: { series: { id: { eq: $id } } }
      sort: { fields: broadcastDate, order: DESC }
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
