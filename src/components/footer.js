import React from "react"
import "./footer.css"

import MITHLogo from "../svg/logo_mith.svg"
import UMDLogo from "../svg/logo_umd.svg"
import WHSLogo from "../svg/logo_whs.svg"
import UWMLogo from "../svg/logo_uw.svg"
import NEHLogo from "../svg/logo_neh.svg"

const Footer = () => (
  <footer>
    <div className="footer-content-wrapper">
      <div className="partners">
        <a className="logo" href="https://mith.umd.edu/">
          <span className="screen-reader-text">MITH web page</span>
          <MITHLogo />{" "}
        </a>
        <a className="logo" href="https://umd.edu/">
          <span className="screen-reader-text">
            University of Maryland web page
          </span>
          <UMDLogo />{" "}
        </a>
        <a className="logo" href="https://www.wisconsinhistory.org/">
          <span className="screen-reader-text">
            Wisconsin Historical Society web page
          </span>
          <WHSLogo />{" "}
        </a>
        <a className="logo" href="https://www.wisc.edu/">
          <span className="screen-reader-text">
            University of Wisconsin web page
          </span>
          <UWMLogo />{" "}
        </a>
      </div>
      <div className="sponsors">
        <a className="logo" href="https://www.neh.gov/">
          <span className="screen-reader-text">
            National Endowment for the Humanities web page
          </span>
          <NEHLogo />{" "}
        </a>
        <div className="disclaimer">
          <p>
            <small>
              Unlocking the Airwaves has been made possible in part by a major
              grant from the National Endowment for the Humanities' Humanities
              Collections and Reference Resources (HCRR) program. Any views,
              findings, conclusions, or recommendations expressed in this Web
              resource, do not necessarily represent those of the National
              Endowment for the Humanities.
            </small>
          </p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
