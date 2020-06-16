import React from 'react'
import { graphql, Link } from 'gatsby'
import { Player } from 'webvtt-player'
import { formatDuration } from '../utils'
import './episode.css'

import Layout from '../components/layout'

export const query = graphql`
  query($aapbId: String!) {
    episodesJson(aapbId: { eq: $aapbId }) {
      id
      aapbId
      title
      description
      temporal
      duration
      broadcastDate
      creator {
        name
        role
      }
      contributor {
        name
        role
      }
      subject {
        name
      }
      genre {
        name
      }
      series {
        id
        title
      }
      seriesDescription
    }
  }
`

const Episode = ({ data }) => {
  const s3Bucket = 'https://mith-uta.s3.amazonaws.com'
  const episode = data.episodesJson
  const id = episode.aapbId

  let creators = ""
  if (episode.creator) {
    creators = episode.creator.map(c => {
      return <div key={`creator-${c.name}`}><Link to={`/search/?f=creator:${c.name}`}>{c.name}</Link> <span>({c.role})</span></div>
    })
  }

  let subjects = ""
  if (episode.subject) {
    subjects = episode.subject.map(s => {
      return <div key={`subject-${s.name}`}><Link to={`/search/?f=subject:${s.name}`}>{s.name}</Link></div>
    })
  }

  let contributors = ""
  if (episode.contributor) {
    contributors = episode.contributor.map(c => {
      return <div key={`contributor-${c.name}`}><Link to={`/search/?f=contributor:${c.name}`}>{c.name}</Link> <span>({c.role})</span></div>
    })
  }

  let genres = ""
  if (episode.genre) {
    genres = episode.genre.map(g => {
      return <div key={`genre-${g.name}`}><Link to={`/search/?f=genre:${g.name}`}>{g.name}</Link></div>
    })
  }

  let series = ""
  if (episode.series) {
    series = <Link to={`/programs/${episode.series.id}/`}>{episode.series.title}</Link>
  }

  let pageTitle = `${series}: ${episode.title}`

  return (
    <Layout title={pageTitle}>
      <div id="episode" className="">
        <section className="leader">
          <article>
            <h1>{episode.title}</h1>
          </article>
        </section>

        <section className="columns">
          <article className="metadata col-6 col-12-xs">
            <dl>
              <dt className="label">Series</dt>
              <dd>{series}</dd>
              <dt className="label">Air Date</dt>
              <dd>{episode.broadcastDate}</dd>
              <dt className="label">Duration</dt>
              <dd>{formatDuration(episode.duration)}</dd>
              <dt className="label">Episode Description</dt>
              <dd>{episode.description}</dd>
              <dt className="label">Series Description</dt>
              <dd>{episode.seriesDescription}</dd>
              <dt className="label">Subject(s)</dt>
              <dd>{subjects}</dd>
              <dt className="label">Creator(s)</dt>
              <dd>{creators}</dd>
              <dt className="label">Contributors</dt>
              <dd>{contributors}</dd>
              <dt className="label">Genre(s)</dt>
              <dd>{genres}</dd>
              <dt className="label">Geographic Region(s)</dt>
              <dd>regions</dd>
              <dt className="label">Time Period</dt>
              <dd>{episode.temporal}</dd>
            </dl>
          </article>
          <article className="recording col-6 col-12-xs">
            <Player 
              transcript={`${s3Bucket}/data/transcripts/${id}/${id}.vtt`}
              audio={`${s3Bucket}/data/audio/${id}.mp3`} />
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default Episode
