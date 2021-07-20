import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import "./cpf.css"

import Layout from "../components/layout"

const CPF = ({ data }) => {
  const cpf = data.peopleJson

  let image = (
    <StaticImage
      src="../images/missing-person.png"
      width={300}
      alt="Unknown Image"
    />
  )

  let abstract = ""

  if (data.wikipediaJson) {
    if (data.wikipediaJson.image) {
      const img = getImage(data.wikipediaJson.image)
      image = <GatsbyImage image={img} alt={cpf.name} />
    }
    if (data.wikipediaJson.abstract) {
      abstract = (
        <p>
          {data.wikipediaJson.abstract}
          <em>
            Read more at <a href={cpf.wikidata.wikipediaUrl}>Wikipedia</a>...
          </em>
        </p>
      )
    }
  }

  let birth = null
  if (cpf.wikidata.birthDate) {
    const t = new Date(cpf.wikidata.birthDate)
    birth = `${t.getUTCFullYear()}`
    if (cpf.wikidata.birthPlace) {
      birth += `, ${cpf.wikidata.birthPlace}`
    }
  }

  let death = null
  if (cpf.wikidata.deathDate) {
    const t = new Date(cpf.wikidata.deathDate)
    death = `${t.getUTCFullYear()}`
    if (cpf.wikidata.deathPlace) {
      death += `, ${cpf.wikidata.deathPlace}`
    }
  }

  let inception = null
  if (cpf.wikidata.inception) {
    const t = new Date(cpf.wikidata.inception)
    inception = `${t.getUTCFullYear()}`
    if (cpf.wikidata.settlement) {
      inception += `, ${cpf.wikidata.settlement}`
    }
  }

  const relatedDocuments = DocumentList(
    joinLists(data.asDocumentCreator.nodes, data.asDocumentContributor.nodes)
  )
  const relatedEpisodes = EpisodeList(
    cpf.id,
    joinLists(data.asEpisodeCreator.nodes, data.asEpisodeContributor.nodes)
  )

  const breadcrumb =
    cpf.type === "Person" ? (
      <Link className="breadcrumb" to="/people/">
        People
      </Link>
    ) : (
      <Link className="breadcrumb" to="/organizations/">
        Organizations
      </Link>
    )

  return (
    <Layout>
      <div className="page-cpf">
        <section>
          <h1>
            {breadcrumb} {cpf.name}
          </h1>
          <div className="cpf">
            <div className="image">{image}</div>
            <div className="bio">
              <h2>{cpf.wikidata.name}</h2>
              {abstract}
              <p>
                <Field label="Born" value={birth} />
                <Field label="Died" value={death} />
                <Field label="Inception" value={inception} />
              </p>
              <p>
                <Field label="Alternate Names" value={cpf.wikidata.altNames} />
                <Field label="Occupation(s)" value={cpf.wikidata.occupation} />
                <Field
                  label="Field(s) of Work"
                  value={cpf.wikidata.occuptation}
                />
                <Field
                  label="Field(s) of Work"
                  value={cpf.wikidata.fieldOfWork}
                />
                <Field label="Employer(s)" value={cpf.wikidata.employer} />
                <Field label="Located in" value={cpf.wikidata.locatedIn} />
                <Field label="Broadcast to" value={cpf.wikidata.broadastTo} />
                <Field label="Member of" value={cpf.wikidata.memberOf} />
                <Field label="Owned by" value={cpf.wikidata.ownedBy} />
                <Field label="Website" value={cpf.wikidata.website} />
              </p>
              <div>
                {relatedEpisodes}
                {relatedDocuments}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

const Field = ({ label, value }) => {
  if (typeof value === "string") {
    value = [value]
  }

  if (value === undefined || value === null || value.length === 0) {
    return ""
  }

  if (value[0].match(/^https?:/)) {
    return (
      <>
        <span className="label">{label}</span>: &nbsp;
        {value.map(v => (
          <span>
            <Link to={v}>{v}</Link>&nbsp;
          </span>
        ))}
      </>
    )
  }

  return (
    <>
      <span className="label">{label}</span>: {value.join(", ")} <br />
    </>
  )
}

const DocumentList = docs => {
  if (docs.length === 0) {
    return ""
  }
  return (
    <div>
      <h2>Related Documents</h2>
      <ul>
        {docs.map(d => (
          <li key={d.id}>
            <Link to={`/document/${d.iaId}/`}>{d.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const EpisodeList = (cpfId, episodes) => {
  if (episodes.length === 0) {
    return ""
  }

  // group episode information by series as a map keyed by the series id
  // so that we can output a list of episodes grouped by the series they are a part of
  const seriesMap = new Map()
  for (const e of episodes) {
    if (!seriesMap.has(e.series.id)) {
      seriesMap.set(e.series.id, { title: e.series.title, episodes: [] })
    }
    seriesMap.get(e.series.id).episodes.push(e)
  }
  const seriesIds = Array.from(seriesMap.keys())

  return (
    <div>
      <h2>Related Episodes</h2>
      {seriesIds.map(seriesId => {
        const series = seriesMap.get(seriesId)
        return (
          <div key={seriesId}>
            <b>
              <Link to={`/programs/${seriesId}/`}>{series.title}</Link>
            </b>
            <ul>
              {series.episodes.map(e => {
                let role = ""
                for (const episode of episodes) {
                  const cpfRoles = joinLists(
                    episode.creator,
                    episode.contributor
                  )
                  const cpfRole = cpfRoles.find(e => e.id === cpfId)
                  if (cpfRole) {
                    role = `(${cpfRole.role})`
                  }
                }
                return (
                  <li key={e.id}>
                    <Link to={`/episode/${e.aapbId}/`}>{e.title}</Link> {role}
                  </li>
                )
              })}
            </ul>
            <br />
          </div>
        )
      })}
    </div>
  )
}

function joinLists(a, b) {
  if (!a) a = []
  if (!b) b = []
  return a.concat(b)
}

export const query = graphql`
  query($id: String!) {
    peopleJson(id: { eq: $id }) {
      id
      name
      type
      snac {
        airtableId
        altNames
        associatedWith
        birthDate
        deathDate
        description
        occupations
        places
        sameAs
        snacId
        subjects
      }
      wikidata {
        airtableId
        altNames
        birthDate
        birthPlace
        broadcastTo
        country
        deathDate
        description
        deathPlace
        employer
        geo
        fieldOfWork
        inceptionDate
        instanceOf
        lccn
        locatedIn
        name
        memberOf
        occupation
        ownedBy
        settlement
        state
        snacArk
        viaf
        website
        wikidataId
        wikipediaUrl
      }
    }
    wikipediaJson(personId: { eq: $id }) {
      personId
      abstract
      image {
        childImageSharp {
          gatsbyImageData(width: 300)
        }
      }
    }
    asDocumentCreator: allDocumentsJson(
      filter: { creator: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        id
        iaId
        title
        date
      }
    }
    asDocumentContributor: allDocumentsJson(
      filter: { contributor: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        id
        iaId
        title
        date
      }
    }
    asEpisodeCreator: allEpisodesJson(
      filter: { creator: { elemMatch: { id: { eq: $id } } } }
      sort: { fields: [series___title, broadcastDate] }
    ) {
      nodes {
        aapbId
        title
        creator {
          id
          name
          role
        }
        contributor {
          id
          name
          role
        }
        series {
          title
          id
        }
        id
      }
    }
    asEpisodeContributor: allEpisodesJson(
      filter: { contributor: { elemMatch: { id: { eq: $id } } } }
      sort: { fields: [series___title, broadcastDate] }
    ) {
      nodes {
        aapbId
        title
        series {
          title
          id
        }
        id
        creator {
          id
          name
          role
        }
        contributor {
          id
          name
          role
        }
      }
    }
  }
`

export default CPF
