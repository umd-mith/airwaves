import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import IFrame from "../../components/iframe"

const TimelinePage = () => {
  return (
    <Layout url="/visualizations/naeb-timeline/">
      <div className="page-visualization-naeb-timeline">
        <section>
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
        </section>
        <section id="timeline" className="full-bleed">
          <IFrame
            title="Public Broadcasting Timeline"
            src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=144eviIzLtoK2OCmDD9GIIP3yxkMT58RGTtIhTQ0gA_Q&font=https://ssapienza.github.io/ssapienza/timeline-modified-3.css&lang=en&initial_zoom=2"
            height="650"
          />
        </section>
      </div>
    </Layout>
  )
}

export default TimelinePage
