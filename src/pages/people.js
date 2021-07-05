import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const People = ({ data }) => {
  const people = data.allPeopleJson.nodes
  return (
    <Layout title="People">
      <section>
        <h2>People</h2>
        <ul>
        {people.map(p => (
          <li>
            <Link to={`/people/${p.wikidata.wikidataId}/`}>{p.name}</Link>: &nbsp;
            {p.wikidata.description}
          </li>
        ))}
        </ul>
      </section>
    </Layout>
  )
}

export const query = graphql`
{
  allPeopleJson(
    filter: {wikidata: {wikidataId: {ne: null}}, type: {eq: "Person"}}
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

export default People