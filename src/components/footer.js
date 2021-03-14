import React from 'react'
// import './footer.css'

import MITH from '../svg/logo_mith.svg'
import WHS from '../svg/logo_whs.svg'
import UWM from '../svg/logo_uw.svg'
import NEH from '../svg/logo_neh.svg'

const Footer = () => (
  <footer>
    <section>
      <article className="columns">
        <a className="col-3 col-6-md col-6-sm col-12-xs" href="https://mith.umd.edu/"> <MITH /> </a>
        <a className="col-3 col-6-md col-6-sm col-12-xs" href="https://www.wisconsinhistory.org/"> <WHS /> </a>
        <a className="col-3 col-6-md col-6-sm col-12-xs" href="https://www.wisc.edu/"> <UWM /> </a>
        <a className="col-3 col-6-md col-6-sm col-12-xs" href="https://www.neh.gov/"> <NEH /> </a>
      </article>
      <article className="disclaimer">
        <p>Unlocking the Airwaves has been made possible in part by a major grant from the National Endowment for the Humanities' Humanities Collections and Reference Resources (HCRR) program.</p>
      </article>
    </section>
  </footer>
)

export default Footer