import React from 'react'
import { graphql, Link } from 'gatsby'
import { Player } from 'webvtt-player'
import './episode.css'

import Layout from '../components/layout'

export const query = graphql`
  query($aapbId: String!) {
    episodesJson(aapbId: { eq: $aapbId }) {
      id
      aapbId
      title
      description
      temporalCoverage
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
    }
  }
`

const Episode = ({ data }) => {
  const s3Bucket = 'https://mith-uta.s3.amazonaws.com'
  const episode = data.episodesJson
  const id = episode.aapbId
  const creators = episode.creator.map(c => {
    return <div><Link to={`/#${c.name}`}>{c.name}</Link> <span>({c.role})</span></div>
  })
  const subjects = episode.subject.map(s => {
    return <div key={`subject-{s.name}`}><Link to={`/#${s.name}`}>{s.name}</Link></div>
  })
  const contributors = episode.contributor.map(c => {
    return <div key={`contributor-${c.name}`}><Link to={`/#${c.name}`}>{c.name}</Link> <span>({c.role})</span></div>
  })
  const genres = episode.genre.map(g => {
    return <div key={`genre-${g.name}`}><Link to={`/#${g.name}`}>{g.name}</Link></div>
  })
  return (
    <Layout>
      <div id="episode">
        <div className="metadata">
          <h1>{episode.title}</h1>
          <table>
            <tbody>
              <tr>
                <td className="label">Series</td>
                <td><Link to={`/series/${episode.series.id}/`}>{episode.series.title}</Link></td>
              </tr>
              <tr>
                <td className="label">Air Date</td>
                <td>{episode.broadcastDate}</td>
              </tr>
              <tr>
                <td className="label">Duration</td>
                <td>{episode.duration} minutes</td>
              </tr>
              <tr>
                <td className="label">Description</td>
                <td>{episode.description}</td>
              </tr>
              <tr>
                <td className="label">Subject(s)</td>
                <td>{subjects}</td>
              </tr>
              <tr>
                <td className="label">Creator(s)</td>
                <td>{creators}</td>
              </tr>
              <tr>
                <td className="label">Contributors</td>
                <td>{contributors}</td>
              </tr>
              <tr>
                <td className="label">Genre(s)</td>
                <td>{genres}</td>
              </tr>
              <tr>
                <td className="label">Geographic Region(s)</td>
                <td>regions</td>
              </tr>
              <tr>
                <td className="label">Time Period</td>
                <td>{episode.temporalCoverage}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recording">
          <Player 
            transcript={`${s3Bucket}/data/transcripts/${id}/${id}.vtt`}
            audio={`${s3Bucket}/data/audio/${id}.mp3`} />
        </div>
      </div>
    </Layout>
  )
}

export default Episode