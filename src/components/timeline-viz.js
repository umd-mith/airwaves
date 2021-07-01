import React, { useRef, useEffect } from "react"
import { Timeline } from "@knight-lab/timelinejs"
import events from "../../static/data/visualizations/pbtimeline.json"

import "@knight-lab/timelinejs/dist/css/timeline.css"

export default function TimelineViz() {
  const timelineEl = useRef(null)

  useEffect(() => {
    if (timelineEl.current) {
      const timeline = new Timeline(timelineEl.current, events)
    }
  })

  return (
    <section id="timeline">
      <h2>Title Me</h2>
      <p>
        Bacon ipsum dolor amet leberkas excepteur cupidatat short ribs doner
        deserunt. Biltong pancetta ground round lorem et velit culpa tail eu
        adipisicing. Cow brisket landjaeger enim drumstick, tenderloin strip
        steak eu buffalo venison veniam esse. Ea nulla dolore prosciutto commodo
        tongue beef ribs pancetta ham shank exercitation est chislic sed.
      </p>
      <div ref={timelineEl} />
    </section>
  )
}
