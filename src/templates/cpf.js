import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import "./cpf.css"

import Layout from "../components/layout"

const CPF = ({ data }) => {
  const cpf = data.cpfJson

  let image = (
    <StaticImage
      src="../images/missing-person.png"
      width={300}
      alt="Unknown Image"
    />
  )

  let abstract = ""

  if (cpf.cpfPage.image) {
    const img = getImage(cpf.cpfPage.image)
    image = <GatsbyImage image={img} alt={cpf.name} />
  }

  if (cpf.cpfPage.description) {
    abstract = (
      <p>
        {cpf.cpfPage.description}
        <em>
          Read more at <a href={cpf.cpfPage.wikipediaUrl}>Wikipedia</a>...
        </em>
      </p>
    )
  }

  let birth = null
  if (cpf.cpfPage.birthDate) {
    const t = new Date(cpf.cpfPage.birthDate)
    birth = `${t.getUTCFullYear()}`
    if (cpf.cpfPage.birthPlace) {
      birth += `, ${cpf.cpfPage.birthPlace}`
    }
  }

  let death = null
  if (cpf.cpfPage.deathDate) {
    const t = new Date(cpf.cpfPage.deathDate)
    death = `${t.getUTCFullYear()}`
    if (cpf.cpfPage.deathPlace) {
      death += `, ${cpf.cpfPage.deathPlace}`
    }
  }

  let inception = null
  if (cpf.cpfPage.inceptionDate) {
    const t = new Date(cpf.cpfPage.inceptionDate)
    inception = `${t.getUTCFullYear()}`
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
              <h2>{cpf.cpfPage.name}</h2>
              {abstract}
              <p>
                <Field label="Born" value={birth} />
                <Field label="Died" value={death} />
                <Field label="Inception" value={inception} />
              </p>
              <p>
                <Field label="Alternate Names" value={cpf.cpfPage.altNames} />
                <Field label="Occupation(s)" value={cpf.cpfPage.occupation} />
                <Field
                  label="Field(s) of Work"
                  value={cpf.cpfPage.occuptation}
                />
                <Field
                  label="Field(s) of Work"
                  value={cpf.cpfPage.fieldOfWork}
                />
                <Field label="Employer(s)" value={cpf.cpfPage.employer} />
                <Field label="Broadcast to" value={cpf.cpfPage.broadastTo} />
                <Field label="Member of" value={cpf.cpfPage.memberOf} />
                <Field label="Owned by" value={cpf.cpfPage.ownedBy} />
                <Field label="Website" value={cpf.cpfPage.website} />
                <Field label="Associated Place(s)" value={cpf.cpfPage.placeNames} />
                <SubjectField subjects={cpf.cpfPage.subjects} />
              </p>
              <p>
                <OptionalLink text="Social Networks and Archival Context (SNAC) Record" url={cpf.cpfPage.snacArk} />
                <OptionalLink text="Library of Congress Name Authority File (LCNAF)" url={cpf.cpfPage.lccn} />
                <OptionalLink text="Virtual International Authority File (VIAF)" url={cpf.cpfPage.viaf} />
                <OptionalLink text="WorldCat Record" url={cpf.cpfPage.worldcat} />
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

const SubjectField = ({subjects}) => {
  if (subjects) {
    return(
      <>
        <span className="label">Associated Subject(s)</span>: &nbsp;
        {subjects.map((s, i) => ( 
          <span key={`subject-${s.title}`}>
            {i > 0 && ", "}
            <Link to={`/search/?f=subject:${s.title}`}>{s.title}</Link>
          </span>
        ))}
      </> 
    )
  } else {
    return ''
  } 
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

const OptionalLink = ({text, url}) => {
  if (url) {
    return <><a href={url}>{text}</a><br /></>
  } else {
    return ''
  } 
}

function joinLists(a, b) {
  if (!a) a = []
  if (!b) b = []
  return a.concat(b)
}

export const query = graphql`
  query($id: String!) {
    cpfJson(id: { eq: $id }) {
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
        placeNames
        sameAs
        snacId
        subjects
      }
      cpfPage {
        airtableId
        altNames
        birthDate
        birthPlace
        deathDate
        description
        deathPlace
        employer
        fieldOfWork
        inceptionDate
        lccn
        name
        memberOf
        occupation
        ownedBy
        placeNames
        subjects {
          id
          title 
        }
        snacArk
        viaf
        website
        wikidataId
        wikipediaUrl
        worldcat
        image {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
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
