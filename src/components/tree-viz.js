import React from "react"

export default function TreeViz() {
  return (
    <section className="embed-host">
      <h2>Educational Content Areas Tree</h2>
      <p>
        This interactive tree maps the radio programs and documents in Unlocking the Airwaves to 
        educational content areas using ontologies from EDSITEment and the National Assessment of Educational Progress. 
        Click any black dot to expand or collapse the tree and see content areas related to that parent topic. 
        Click any green dot to open a link in a new tab and explore the radio programs and other materials on 
        Unlocking the Airwaves related to that content area.
      </p>
      <iframe
        width="100%"
        height="204"
        frameborder="0"
        src="https://observablehq.com/embed/b13264f71e4c1fbd?cells=chart"
      ></iframe>
    </section>
  )
}
