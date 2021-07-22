import React from "react"
import { graphql, Link } from "gatsby"

import Registry from "../components/registry"
import Layout from "../components/layout"

const Organizations = ({ data }) => {
  const orgs = data.allPeopleJson.nodes
  const items = orgs.map(o => ({
    name: o.name,
    description: o.wikidata.description,
    url: `/organizations/${o.wikidata.wikidataId}/`
  }))

  return (
    <Layout title="Organizations">
      <div className="page-organizations">
        <section>
          <h1>
            <Link className="breadcrumb" to="/explore/">
              Explore
            </Link>{" "}
            Browse Organizations
          </h1>
        </section>
        <section>
          <Registry name="organization name" items={items} />
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allPeopleJson(
      filter: {
        wikidata: { wikidataId: { ne: null } }
        type: { eq: "Corporate Body" }
      }
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

export default Organizations
