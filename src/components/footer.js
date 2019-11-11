import React from 'react'
import { Link } from "gatsby"
import './footer.css'

import mith from '../images/logo_mith.svg'
import whs from '../images/logo_whs.svg'
import uwm from '../images/logo_uw.svg'
import neh from '../images/logo_neh.svg'

const Footer = () => (
  <footer>
    <section>
      <article id="footer_logos" className="columns">
        <Link to="https://mith.umd.edu/"><img src={mith} alt="University of Maryland" /></Link>
        <Link to="https://www.wisconsinhistory.org/"><img src={whs} alt="Wisconsin Historical Society" /></Link>
        <Link to="https://www.wisc.edu/"><img src={uwm} alt="University of Wisconsin-Madison" /></Link>
        <Link to="https://www.neh.gov/"><img src={neh} alt="National Endowment for the Humanities (NEH)" /></Link>
      </article>
      <article>
        <p>Unlocking the Airwaves has been made possible in part by a major grant from the National Endowment for the Humanities' Humanities Collections and Reference Resources (HCRR) program.</p>
      </article>
    </section>
  </footer>
)

export default Footer