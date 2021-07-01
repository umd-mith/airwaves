import React, { useRef, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import { Timeline } from "@knight-lab/timelinejs"
import events from "../../static/data/visualizations/pbtimeline.json"

import "@knight-lab/timelinejs/dist/css/timeline.css"
import "./visualizations.css"

const VisualizationsPage = () => {
  const timelineEl = useRef(null)
  const mapEl = useRef(null)

  useEffect(() => {
    if (timelineEl.current) {
      const timeline = new Timeline(timelineEl.current, events)
    }
    if (mapEl.current && window.tableau) {
      const url =
        "https://public.tableau.com/app/profile/emily4895/viz/dualaxis_map_test/Sheet1"
      // const map = new window.tableau.Viz(mapEl.current, url)
    }
  })

  return (
    <Layout url="/visualizations/">
      <Helmet>
        <script src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script>
      </Helmet>

      <div className="page-visualizations">
        <section id="timeline">
          <h1>Visualizations</h1>
          <div ref={timelineEl} />
        </section>

        <section id="map">
          <iframe
            title="Unlocking the Airwaves - U.S. Map of Major Organizations"
            width="100%"
            height="600"
            src="https://public.tableau.com/views/UnlockingtheAirwaves-U_S_MapofMajorOrganizations/AirwavesU_S_Map?:language=en-US&:showVizHome=no&:embed=true"
          ></iframe>
          {/* <div ref={mapEl} /> */}
        </section>

        <section className="embed-host">
          <iframe
            title="Content standards represented in NAEB Collection"
            width="100%"
            height="200"
            frameborder="0"
            src="https://observablehq.com/embed/e24bce73498fa7dc?cells=chart"
          ></iframe>
        </section>
      </div>
    </Layout>
  )
}

export default VisualizationsPage
