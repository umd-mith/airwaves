import React from "react"
import "./footer.css"

import MITHLogo from "../svg/logo_mith.svg"
import WHSLogo from "../svg/logo_whs.svg"
import UWMLogo from "../svg/logo_uw.svg"
import NEHLogo from "../svg/logo_neh.svg"

const Footer = () => (
  <footer>
    <div className="footer-content-wrapper">
      <div className="sponsors">
        <a href="https://mith.umd.edu/">
          {" "}
          <MITHLogo />{" "}
        </a>
        <a href="https://www.wisconsinhistory.org/">
          {" "}
          <WHSLogo />{" "}
        </a>
        <a href="https://www.wisc.edu/">
          {" "}
          <UWMLogo />{" "}
        </a>
        <a href="https://www.neh.gov/">
          {" "}
          <NEHLogo />{" "}
        </a>
      </div>
      <div className="disclaimer">
        <p>
          <small>
            Unlocking the Airwaves has been made possible in part by a major
            grant from the National Endowment for the Humanities' Humanities
            Collections and Reference Resources (HCRR) program.
          </small>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
