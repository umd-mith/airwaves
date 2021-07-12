import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import IFrame from "../../components/iframe"

const TreePage = () => {
  return (
    <Layout>
      <div className="page-visualization-content-standard">
        <section>
          <div className="text-block">
            <h2>
              <Link className="breadcrumb" to="/visualizations/">
                Visualizations
              </Link>{" "}
              Educational Content Areas Tree
            </h2>
            <p>
              This interactive tree maps the radio programs and documents in
              Unlocking the Airwaves to educational content areas using
              ontologies from EDSITEment and the National Assessment of
              Educational Progress. Click any black dot to expand or collapse
              the tree and see content areas related to that parent topic. Click
              any green dot to open a link in a new tab and explore the radio
              programs and other materials on Unlocking the Airwaves related to
              that content area.
            </p>
          </div>
        </section>
        <section className="full-bleed embed-host">
          <IFrame
            title="Educational Content Areas Tree"
            src="https://observablehq.com/embed/b13264f71e4c1fbd?cells=chart"
            height="800"
          />
        </section>
      </div>
    </Layout>
  )
}

export default TreePage
