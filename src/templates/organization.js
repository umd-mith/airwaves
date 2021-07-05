import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

const Organization = ({ data }) => {
  const org = data.peopleJson
  return (
    <Layout>
      <h2>
        <Link to="/organizations/">Organizations</Link> / {org.name}
      </h2>
      <section>
        {org.wikidata.name}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wikipediaJson(id: {eq: $id}) {
      id
      abstract
      image {
        childImageSharp {
          gatsbyImageData(width:100)
        }
      }
    }
    peopleJson(id: {eq: $id}) {
      id
      name
      type
      snac {
        altNames
        associatedWith
        description
        places
        sameAs
        snacId
        subjects
      }
      wikidata {
        altNames
        broadcastTo
        country
        description
        geo
        inceptionDate
        instanceOf
        lccn
        locatedIn
        name
        memberOf
        ownedBy
        settlment
        state
        snacArk
        viaf
        website
        wikidataId
        wikipediaUrl
      }
    }
    asDocumentCreator: allDocumentsJson(
      filter: {creator: {elemMatch: {id: {eq: $id}}}}
    ) {
      nodes {
        id
        title
        date
      }
    }
    asDocumentContributor: allDocumentsJson(
      filter: {contributor: {elemMatch: {id: {eq: $id}}}}
    ) {
      nodes {
        id
        title
        date
      }
    }
    asEpisodeCreator: allEpisodesJson(
      filter: {creator: {elemMatch: {id: {eq: $id}}}}
      sort: {fields: [series___title, broadcastDate]}
    ) {
      nodes {
        title
        series {
          title
          id
        }
        id
      }
    }
    asEpisodeContributor: allEpisodesJson(
      filter: {contributor: {elemMatch: {id: {eq: $id}}}}
      sort: {fields: [series___title, broadcastDate]}
    ) {
      nodes {
        title
        series {
          title
          id
        }
        id
      }
    }
  }
`

export default Organization