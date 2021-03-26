import React from 'react'
// import './footer.css'

import MITH from '../svg/logo_mith.svg'
import WHS from '../svg/logo_whs.svg'
import UWM from '../svg/logo_uw.svg'
import NEH from '../svg/logo_neh.svg'

const Footer = () => (
  <footer>
    <div className="sponsors">
      <a href="https://mith.umd.edu/"> <MITH /> </a>
      <a href="https://www.wisconsinhistory.org/"> <WHS /> </a>
      <a href="https://www.wisc.edu/"> <UWM /> </a>
      <a href="https://www.neh.gov/"> <NEH /> </a>
    </div>
    <div className="disclaimer">
      <p>Unlocking the Airwaves has been made possible in part by a major grant from the National Endowment for the Humanities' Humanities Collections and Reference Resources (HCRR) program.</p>
    </div>
  </footer>
)

export default Footer