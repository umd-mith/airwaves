import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const People = ({ data }) => {
  const people = data.allPeopleJson.nodes
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
          <ul className="long-list">
            {people.map(p => (
              <li>
                <Link to={`/people/${p.wikidata.wikidataId}/`}>{p.name}</Link>:
                &nbsp;
                {p.wikidata.description}
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
