import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

import "./visualizations.css"

const VisualizationsPage = () => {
  return (
    <Layout url="/visualizations/">
      <div className="page-visualizations">
        <section className="visualizations">
          <h1>Visualizations</h1>
          <p>
            I am an introduction to this page. Bacon ipsum dolor amet leberkas
            excepteur cupidatat short ribs doner deserunt. Biltong pancetta
            ground round lorem et velit culpa tail eu adipisicing. Cow brisket
            landjaeger enim drumstick, tenderloin strip steak eu buffalo venison
            veniam esse. Ea nulla dolore prosciutto commodo tongue beef ribs
            pancetta ham shank exercitation est chislic sed.
          </p>
          <Link to="/visualizations/naeb-timeline/">
            <img
              className="viz-screencap"
              src="https://via.placeholder.com/1024x600.png?text=Click+for+timeline"
              alt="Timeline"
            />
          </Link>
          <Link to="/visualizations/naeb-map/">
            <img
              className="viz-screencap"
              src="https://via.placeholder.com/500x300.png?text=Click+for+map"
              alt="Map"
            />
          </Link>
          <Link to="/visualizations/content-standards/">
            <img
              className="viz-screencap"
              src="https://via.placeholder.com/510x300.png?text=Click+for+content+tree"
              alt="Tree Diagram"
            />
          </Link>
        </section>
      </div>
    </Layout>
  )
}

export default VisualizationsPage
