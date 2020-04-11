import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { FaAngleUp } from 'react-icons/fa'

import SEO from "../components/seo"
import Layout from "../components/layout"

export default ({ data }) => {

  // keep track of the query in the input box
  const [searchQuery, setSearchQuery] = useState('')

  // a list of letters for the menu
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  // pre-populate series lists
  const series = {}
  letters.forEach(l => {
    series[l] = []
  })

  // collect series information by first letter, and apply search query if there is one
  data.allSeriesJson.edges.forEach(e => {
    const s = e['node']
    const l = s.title[0].toUpperCase()
    if (l.match(/[A-Z]/) && s.title.match(new RegExp(searchQuery, 'i'))) {
      series[l].push(s)
    }
  })

  return (
    <Layout>
      <SEO title="Unlocking the Airwaves: Programs" keywords={[`archive`, `radio`]} />  
      <div id="programs" className="page-programs programs">

        <section className="leader">
          <h1>Explore Radio Programs</h1>
          <article>
            <p>The radio programming service of the NAEB, known as the National Educational Radio Network (NERN), comprised broadcasts which balanced a focus on public service reporting of national events (e.g., the economy, the depression, World War II, the Civil Rights movement) with providing a forum for local issues (e.g., agricultural prices, community events, elections) and with expanding public education. These broadcasts, mostly stemming from university and public school-run radio stations, provide an in-depth look at the engagements and events of American history, as they were broadcast to and received by the general public in the twentieth century.</p>
            <p>The data below is a list of all NERN radio series and individual programs held by the University of Maryland Libraries, and digitized as part of the American Archive of Public Broadcasting (AAPB) project. Use the search bar at the top to ﬁnd a speciﬁc series, or use the alphabetical index to jump to a particular letter. When you expand an arrow next to a series you’ll see a list of all individual episodes of that series below it. Programs which were special one-time programs not part of a series are listed under ‘Individual Programs.’ Clicking on an individual episode will launch the program details, including the media ﬁle and transcript, in a new browser tab. If you want to continue exploring diﬀerent programs, close the new browser tab and return to this page.</p>
          </article>
          <article className="col_full">
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by program name"
            />
          </article>
        </section>

        <section className="columns alpha-list">
          {letters.map(l => (
            <Link to={`/programs/#${l}`}>{l}</Link>
          ))}
        </section>

        <section>
          <article>
            {letters.map(l => (
            <div className="alpha-list-section">
              <div className="section-header">
                <span name={l}>{l}</span>
                <Link className="back" to="/programs/#programs">back to top <FaAngleUp /></Link>
              </div>
              <ul className={`section-{l}`}>
                {series[l].map(s => (
                  <li><Link to={`/programs/${s.id}/`}>{s.title}</Link></li>
                ))}
              </ul>
            </div>
            ))}
          </article>
        </section>

      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allSeriesJson(
      sort: {
        fields: title,
        order: ASC 
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`
