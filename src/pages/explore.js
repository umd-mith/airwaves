import React from "react"

import Layout from "../components/layout"

const ExplorePage = () => (
  <Layout>
    <div className="explore columns col_1_2">
    <h1>Exhibits</h1>
    <div>
      <h2>Explore Radio Programs</h2>
      <p>The radio programming service of the NAEB, known as the National Educational Radio Network (NERN), comprised broadcasts which balanced a focus on public service reporting of national events (e.g., the economy, the depression, World War II, the Civil Rights movement) with providing a forum for local issues (e.g., agricultural prices, community events, elections) and with expanding public education.</p>
      <p>These broadcasts, mostly stemming from university and public school-run radio stations, provide an in-depth look at the engagements and events of American history, as they were broadcast to and received by the general public in the twentieth century. They cover crucial educational, political, and cultural events as diverse as the national census, atomic energy, American labor, religion, United States history, agricultural engineering, mathematics, and foreign relations.</p>
      <a href="/programs/" className="button">Explore Programs</a>
    </div>
    <div>
      <h2>Explore Related Materials</h2>
      <p><strong>Unlocking the Airwaves: Revitalizing an Early Public and Educational Radio Collection</strong> is a comprehensive online collection of early educational public radio content from the National Association of Educational Broadcasters (NAEB). The forerunner of CPB and its arms, NPR and PBS, the NAEB developed and distributed educational radio programs and accompanying print materials to schools and communities across the United States. What’s more, the NAEB lobbied extensively to unlock the airwaves—to access precious frequency space—in order to bring the voices of poet Robert Frost, architect Frank Lloyd Wright, anthropologist Margaret Mead, and conservationist “Ranger Mac,” among many other individuals, into American homes and classrooms.</p>
      <a href="/materials/" className="button">Explore Materials</a>      
    </div>
  </div>

  </Layout>
)

export default ExplorePage
