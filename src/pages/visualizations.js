import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

import "./visualizations.css"

const VisualizationsPage = () => {
  return (
    <Layout url="/visualizations/">
      <div className="page-visualizations">
        <section>
          <div className="text-block">
            <h1>Visualizations</h1>
            <p>
              Use these three visualizations as alternate ways of exploring the 
              NAEB's programs and documents on Unlocking the Airwaves. See milestones 
              from the NAEB's history laid out chronologically; navigate through NAEB 
              content creators geographically; or easily find primary sources for teaching
              in different subject areas. Click on any of the three graphics below to go to
              the full, interactive visualization.
            </p>
          </div>
        </section>
        <section className="visualizations full-bleed">
          <div id="naeb-timeline">
            <Link to="/visualizations/naeb-timeline/">
              <img
                className="viz-screencap"
                src="https://via.placeholder.com/1024x600.png?text=Click+for+timeline"
                alt="Timeline"
              />
            </Link>
          </div>
          <div id="naeb-map">
            <Link to="/visualizations/naeb-map/">
              <img
                className="viz-screencap"
                src="https://via.placeholder.com/490x300.png?text=Click+for+map"
                alt="Map"
              />
            </Link>
          </div>
          <div id="content-standards">
            <Link to="/visualizations/content-standards/">
              <img
                className="viz-screencap"
                src="https://via.placeholder.com/490x300.png?text=Click+for+content+tree"
                alt="Tree Diagram"
              />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default VisualizationsPage
