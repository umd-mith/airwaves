import React from "react"
import { graphql, Link } from "gatsby"
import { FaAngleUp } from 'react-icons/fa'

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../templates/series.css"

export default ({ data }) => {

  const seriesList = data.allSeriesJson.edges.map( ({node}) => (
    <li><Link to={`/series/${node.id}/`}>{node.title}</Link></li>
  ))

  return (
  <Layout>
  <SEO title="Unlocking the Airwaves: Series" keywords={[`archive`, `radio`]} />  
  <div id="series" className="page-series series">
    <section className="leader">
      <h1>Explore Radio Programs</h1>
      <article>
        <p>The radio programming service of the NAEB, known as the National Educational Radio Network (NERN), comprised broadcasts which balanced a focus on public service reporting of national events (e.g., the economy, the depression, World War II, the Civil Rights movement) with providing a forum for local issues (e.g., agricultural prices, community events, elections) and with expanding public education. These broadcasts, mostly stemming from university and public school-run radio stations, provide an in-depth look at the engagements and events of American history, as they were broadcast to and received by the general public in the twentieth century.</p>
        <p>The data below is a list of all NERN radio series and individual programs held by the University of Maryland Libraries, and digitized as part of the American Archive of Public Broadcasting (AAPB) project. Use the search bar at the top to ﬁnd a speciﬁc series, or use the alphabetical index to jump to a particular letter. When you expand an arrow next to a series you’ll see a list of all individual episodes of that series below it. Programs which were special one-time programs not part of a series are listed under ‘Individual Programs.’ Clicking on an individual episode will launch the program details, including the media ﬁle and transcript, in a new browser tab. If you want to continue exploring diﬀerent programs, close the new browser tab and return to this page.</p>
      </article>
      <article className="col_full">
        <input 
          type="text"
          placeholder="Search by program name"
        />
      </article>
    </section>
    <section className="columns alpha-list">
        <Link to="/series/#A">A</Link><Link to="/series/#B">B</Link><Link to="/series/#C">C</Link><Link to="/series/#D">D</Link><Link to="/series/#E">E</Link><Link to="/series/#F">F</Link><Link to="/series/#G">G</Link><Link to="/series/#H">H</Link><Link to="/series/#I">I</Link><Link to="/series/#J">J</Link><Link to="/series/#K">K</Link><Link to="/series/#L">L</Link><Link to="/series/#M">M</Link><Link to="/series/#N">N</Link><Link to="/series/#O">O</Link><Link to="/series/#P">P</Link><Link to="/series/#Q">Q</Link><Link to="/series/#R">R</Link><Link to="/series/#S">S</Link><Link to="/series/#T">T</Link><Link to="/series/#U">U</Link><Link to="/series/#V">V</Link><Link to="/series/#W">W</Link><Link to="/series/#X">X</Link><Link to="/series/#Y">Y</Link><Link to="/series/#Z">Z</Link>
    </section>
    <section className="">
      <article>
        <div className="alpha-list-section">
          <div className="section-header"><a name="A">A</a><Link className="back" to="/sereis/#series">back to top < FaAngleUp /></Link></div>
          <ul className="section-A">
            <li><a href="/series/a-musical-voice/">A musical voice</a></li>
            <li><a href="/series/artist-speaks/">Artist Speaks</a></li>
            <li><a href="/series/america-on-stage/">America on stage</a></li>
          </ul>
        </div>
        <div className="alpha-list-section">
          <div className="section-header"><a name="B">B</a><Link className="back" to="/sereis/#series">back to top < FaAngleUp /></Link></div>
          <ul className="section-B">
            <li><a href="/series/a-musical-voice/">A musical voice</a></li>
            <li><a href="/series/artist-speaks/">Artist Speaks</a></li>
            <li><a href="/series/america-on-stage/">America on stage</a></li>
          </ul>
        </div>
        <div className="alpha-list-section">
          <div className="section-header"><a name="C">C</a><Link className="back" to="/sereis/#series">back to top < FaAngleUp /></Link></div>
          <ul className="section-C">
            <li><a href="/series/a-musical-voice/">A musical voice</a></li>
            <li><a href="/series/artist-speaks/">Artist Speaks</a></li>
            <li><a href="/series/america-on-stage/">America on stage</a></li>
          </ul>
        </div>
        <ul>
          {seriesList}
        </ul>    
      </article>
    </section>
  </div>
  </Layout>
  )

}

export const query = graphql`
  query {
    allSeriesJson {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`