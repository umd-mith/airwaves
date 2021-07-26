import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

import TimelineShape from "../svg/timeline_bg_shape.svg"
import MapShape from "../svg/map_bg_shape.svg"
import TreeShape from "../svg/tree_bg_shape.svg"

import "./visualizations.css"

const VisualizationsPage = () => {
  return (
    <Layout url="/visualizations/">
      <div className="page-visualizations">
        <section>
          <div>
            <h1>Visualizations</h1>
            <p>
              Use these three visualizations as alternate ways of exploring the
              NAEB's programs and documents on Unlocking the Airwaves. See
              milestones from the NAEB's history laid out chronologically;
              navigate through NAEB content creators geographically; or easily
              find primary sources for teaching in different subject areas.
              Click on any of the three graphics below to go to the full,
              interactive visualization.
            </p>
          </div>
        </section>
        <section className="visualizations full-bleed">
          <div id="naeb-timeline">
            <Link to="/visualizations/naeb-timeline/">
              <StaticImage
                className="viz-screencap"
                src="../../static/images/visualizations/timeline_screenshot_4_3.png"
                alt="NAEB Timeline"
                placeholder="blurred"
                height={300}
              />
            </Link>
            <div className="label-container">
              <TimelineShape />
              <div className="label-text">
                <p>Interactive Timeline</p>
                <p>A History of Early Public Broadcasting&nbsp;</p>
                <p>(1922–1967)</p>
              </div>
            </div>
          </div>
          <div id="naeb-map">
            <Link to="/visualizations/naeb-map/">
              <StaticImage
                className="viz-screencap"
                src="../../static/images/visualizations/map_screenshot_4_3.png"
                alt="Map"
                placeholder="blurred"
                width={450}
              />
            </Link>
            <div className="label-container">
              <MapShape />
              <div className="label-text">
                <p>Interactive Map</p>
                <p>U.S. Organizations in the NAEB</p>
              </div>
            </div>
          </div>
          <div id="content-standards">
            <Link to="/visualizations/content-standards/">
              <StaticImage
                className="viz-screencap"
                src="../../static/images/visualizations/tree_screenshot_4_3.png"
                alt="Tree Diagram"
                placeholder="blurred"
                width={450}
              />
            </Link>
            <div className="label-container">
              <TreeShape />
              <div className="label-text">
                <p>Interactive Content Tree</p>
                <p>Explore content related to educational subject areas</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default VisualizationsPage
