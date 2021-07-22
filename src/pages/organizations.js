import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Registry from "../components/registry"

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
            <p> 
              Listed below are organizations represented in the NAEB's programs and documents. Click on an organization's name to go to their landing page with brief biographical information from Wikidata and Wikipedia, as well as links to associated programs and documents on <em>Unlocking the Airwaves</em>. Each organization has a unique ID that comes from the Wikidata knowledge base, which begins with the letter 'Q' in the URL of each landing page. This identifier can also be used to locate the organization's record on <a href="https://www.wikidata.org">Wikidata</a>, which contains links to other references to the person across the web (Library of Congress, VIAF, and more).
            </p>
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
