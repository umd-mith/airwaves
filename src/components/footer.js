import React from 'react'
import { Link } from "gatsby"
import './footer.css'

import MITH from '../images/logo_mith.svg'
import WHS from '../images/logo_whs.svg'
import UWM from '../images/logo_uw.svg'
import NEH from '../images/logo_neh.svg'

const Footer = () => (
  <footer>
    <section>
      <article id="footer_logos" className="columns">
        <Link to="https://mith.umd.edu/"><MITH /></Link>
        <Link to="https://www.wisconsinhistory.org/"><WHS /></Link>
        <Link to="https://www.wisc.edu/"><UWM /></Link>
        <Link to="https://www.neh.gov/"><NEH /></Link>
      </article>
      <article>
        <p>Unlocking the Airwaves has been made possible in part by a major grant from the National Endowment for the Humanities' Humanities Collections and Reference Resources (HCRR) program.</p>
      </article>
    </section>
  </footer>
)

export default Footer