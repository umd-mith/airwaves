import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const Organizations = ({ data }) => {
  const people = data.allPeopleJson.nodes
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
          <ul className="long-list">
            {people.map(p => (
              <li>
                <Link to={`/organizations/${p.wikidata.wikidataId}/`}>
                  {p.name}
                </Link>
                : {p.wikidata.description}
              </li>
            ))}
          </ul>
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
