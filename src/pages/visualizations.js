import React, { useRef, useEffect } from "react"
import Layout from "../components/layout"
import { Timeline } from '@knight-lab/timelinejs'
import events from "../../static/data/visualizations/pbtimeline.json"

import '@knight-lab/timelinejs/dist/css/timeline.css'
import "./visualizations.css"

const VisualizationsPage = () => {

  const timelineEl = useRef(null)

  useEffect(() => {
    if (timelineEl.current) {
      const timeline = new Timeline(timelineEl.current, events)
    }
  })

  return (
    <Layout url="/visualizations/">
      <div className="page-visualizations">
        <h1>Visualizations</h1>

        <section id="timeline">
          <div ref={timelineEl} />
        </section>

        <section
          className="embed-host"
          dangerouslySetInnerHTML={{
            __html: `<div class='tableauPlaceholder' id='viz1624957310030' style='position: relative'><noscript><a href='#'><img alt='Sheet 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;du&#47;dualaxis_map_test&#47;Sheet1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='path' value='views&#47;dualaxis_map_test&#47;Sheet1?:language=en-US&amp;:embed=true' /> <param name='toolbar' value='no' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;du&#47;dualaxis_map_test&#47;Sheet1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1624957310030');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>`,
          }}
        ></section>

      </div>

    </Layout>
  )
}

export default VisualizationsPage
