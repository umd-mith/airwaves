import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Registry from "../components/registry"

const Programs = ({ data }) => {

  const maxLen = 250
  const items = data.allSeriesJson.nodes.map(s => {
    const desc = s.description.length > 0 && s.description[0] ? s.description[0] : ''
    return {
      name: s.title,
      url: `/programs/${s.id}/`,
      description: desc.length > maxLen ? desc.substr(0, maxLen) + '...' : desc
    }
  })

  return (
    <Layout title="Programs">
      <div id="programs" className="page-programs programs">
        <section>
          <h1>
            <Link className="breadcrumb" to="/explore/">
              Explore
            </Link>{" "}
            Browse Radio Programs
          </h1>
          <article>
            <p>
              The radio programming service of the NAEB, known as the National
              Educational Radio Network (NERN), comprised broadcasts which
              balanced a focus on public service reporting of national events
              (e.g., the economy, the depression, World War II, the Civil Rights
              movement) with providing a forum for local issues (e.g.,
              agricultural prices, community events, elections) and with
              expanding public education. These broadcasts, mostly stemming from
              university and public school-run radio stations, provide an
              in-depth look at the engagements and events of American history,
              as they were broadcast to and received by the general public in
              the twentieth century.
            </p>
            <p>
              Below is a list of all NERN radio programs held by the University of Maryland Libraries and
              digitized as part of the American Archive of Public Broadcasting
              (AAPB) project. Use the search bar at the top to ﬁnd a speciﬁc
              series or keyword, or use the alphabetical index to jump to a particular
              letter. Clicking on a series link will send you to a page with a
              a list of all the individual episodes of that series. Clicking on an 
              individual episode will launch a page in a new browse tab, containing 
              the streaming audio and transcript for that program. If you want to continue
              exploring diﬀerent programs, close the new browser tab and return
              to this page.
            </p>
          </article>
        </section>
        <section>
         <Registry name="series name" items={items} />
        </section>
      </div>
    </Layout>
  )
}

export default Programs

export const query = graphql`
  query {
    allSeriesJson(sort: { fields: title, order: ASC }) {
      nodes {
        id
        title
        description
      }
    }
  }
`
