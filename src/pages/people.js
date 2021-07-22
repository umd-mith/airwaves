import React from "react"
import { graphql, Link } from "gatsby"

import Registry from "../components/registry"
import Layout from "../components/layout"

const People = ({ data }) => {
  const people = data.allPeopleJson.nodes

  const items = people.map(p => ({
    name: p.name,
    description: p.wikidata.description,
    url: `/people/${p.wikidata.wikidataId}/`
  }))

  return (
    <Layout title="People">
      <div className="page-people">
        <section>
          <h1>
            <Link className="breadcrumb" to="/explore/">
              Explore
            </Link>{" "}
            Browse People
          </h1>
        </section>
        <section>
          <Registry name="person's name" items={items} />
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allPeopleJson(
      filter: { wikidata: { wikidataId: { ne: null } }, type: { eq: "Person" } }
      sort: { fields: name }
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
