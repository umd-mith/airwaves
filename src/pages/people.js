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
            <p> 
              Listed below are major individuals represented in the NAEB's programs and documents. Click on an individual's name to go to their landing page with brief biographical information from Wikidata and Wikipedia, as well as links to associated programs and documents on <em>Unlocking the Airwaves</em>. Each person has a unique ID that comes from the Wikidata knowledge base, which begins with the letter 'Q' in the URL of each landing page. This identifier can also be used to locate the person's record on <a href="https://www.wikidata.org">Wikidata</a>, which contains links to other references to the person across the web (Library of Congress, VIAF, and more).
            </p>
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
