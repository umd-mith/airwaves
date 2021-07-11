import React, { useRef, useEffect } from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import { Timeline } from "@knight-lab/timelinejs"
import events from "../../../static/data/visualizations/pbtimeline.json"

// import "@knight-lab/timelinejs/dist/css/timeline.css"

const TimelinePage = () => {
  const timelineEl = useRef(null)

  useEffect(() => {
    if (timelineEl.current) {
      const timeline = new Timeline(timelineEl.current, events)
    }
  })

  return (
    <Layout url="/visualizations/naeb-timeline/">
      <div className="page-visualization-naeb-timeline">
        <div className="text-block">
          <h2>
            <Link className="breadcrumb" to="/visualizations/">
              Visualizations
            </Link>{" "}
            Public Broadcasting Timeline
          </h2>
          <p>
            Below are a set of slides which chronologically depict the major
            events that contributed to the formation and evolution of the NAEB.
            The timeline ends in the late 60s when the Public Broadcasting Act
            was passed. The Act led to the formation of the Corporation for
            Public Broadcasting, National Public Radio (NPR), and Public
            Television Service (PBS), which ultimately supplanted the NAEB.
          </p>
        </div>
        <div id="timeline" className="full-bleed" ref={timelineEl} />
      </div>
    </Layout>
  )
}

export default TimelinePage
