import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const Organizations = ({ data }) => {
  const people = data.allPeopleJson.nodes
  return (
    <Layout title="Organizations">
      <section>
        <h2>Organizations</h2>
        <ul>
        {people.map(p => (
          <li>
            <Link to={`/organizations/${p.wikidata.wikidataId}`}>{p.name}</Link>: 
            {p.wikidata.description}</li>
        ))}
        </ul>
      </section>
    </Layout>
  )
}

export const query = graphql`
{
  allPeopleJson(
    filter: {wikidata: {wikidataId: {ne: null}}, type: {eq: "Corporate Body"}}
    sort: {fields: name}
  ) {
    nodes {
      airtableId
      name
      wikidata {
        name
        description
        wikidataId
      }
    }
  }
}
`

export default Organizations 