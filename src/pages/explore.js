import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const ExplorePage = () => (
  <Layout>
  <div className="page-explore">
    <section className="leader">
      <h1>Explore the Archive</h1>
      <article>
        <p>The Search page is a way you can explore the entire Unlocking the Airwaves collection, including NAEB radio programs and related archival materials, from one point of entry. You may either browse the collection using what are called ‘facets’ (pre-defined categories and queries) on the left side of the screen, or you can conduct an Advanced Search of the whole collection using keywords, names of people or organizations, geographic regions, subjects, or time periods. The Search page is broadly useful to find a wide variety of materials in the collections, but if you’d prefer a more streamlined approach, you may also browse the collections by either radio programs (by series/episode), or within the series of folders from the Wisconsin Historical Society’s NAEB paper collections. Read below for more on how to explore by radio program or related materials.</p>
        <Link className="button" to="/search/">
        Search the Archive
        </Link>
      </article>
    </section>
    <section className="columns col_1_2">
      <article>
        <h2>Explore Radio Programs</h2>
        <p>The radio programming service of the NAEB, known as the National Educational Radio Network (NERN), comprised broadcasts which balanced a focus on public service reporting of national events (e.g., the economy, the depression, World War II, the Civil Rights movement) with providing a forum for local issues (e.g., agricultural prices, community events, elections) and with expanding public education.</p>
        <p>These broadcasts, mostly stemming from university and public school-run radio stations, provide an in-depth look at the engagements and events of American history, as they were broadcast to and received by the general public in the twentieth century. They cover crucial educational, political, and cultural events as diverse as the national census, atomic energy, American labor, religion, United States history, agricultural engineering, mathematics, and foreign relations.</p>
        <Link to="/programs/" className="button">
        Explore Programs
        </Link>
      </article>
      <article>
        <h2>Explore Related Materials</h2>
        <p><strong>Unlocking the Airwaves: Revitalizing an Early Public and Educational Radio Collection</strong> is a comprehensive online collection of early educational public radio content from the National Association of Educational Broadcasters (NAEB). The forerunner of CPB and its arms, NPR and PBS, the NAEB developed and distributed educational radio programs and accompanying print materials to schools and communities across the United States. What’s more, the NAEB lobbied extensively to unlock the airwaves—to access precious frequency space—in order to bring the voices of poet Robert Frost, architect Frank Lloyd Wright, anthropologist Margaret Mead, and conservationist “Ranger Mac,” among many other individuals, into American homes and classrooms.</p>
        <Link to="/materials/" className="button">
        Explore Materials
        </Link>
      </article>
    </section>
  </div>
  </Layout>
)

export default ExplorePage
