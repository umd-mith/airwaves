import React from "react"
import Layout from "../components/layout"
import TimelineViz from "../components/timeline-viz"
import MapViz from "../components/map-viz"
import TreeViz from "../components/tree-viz"

import "./visualizations.css"

const VisualizationsPage = () => {
  return (
    <Layout url="/visualizations/">
      <div className="page-visualizations">
        <section>
          <h1>Visualizations</h1>
        </section>
        <TimelineViz />
        <MapViz />
        <TreeViz />
      </div>
    </Layout>
  )
}

export default VisualizationsPage
