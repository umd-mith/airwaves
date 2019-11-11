import React from 'react'
import { Link, withPrefix } from "gatsby"
import './footer.css'

const Footer = () => (
  <footer id="footer" className="columns">
    <Link to="https://www.umd.edu/"><img src={withPrefix("../images/logo_mith.svg")} alt="Maryland Institute for Technology in the Humanities (MITH)" /></Link>
    <Link to="https://mith.umd.edu/"><img src={withPrefix("../images/logo_umd.svg")} alt="University of Maryland" /></Link>
    <Link to="https://www.wisconsinhistory.org/"><img src={withPrefix("../images/logo_whs.jpg")} alt="Wisconsin Historical Society" /></Link>
    <Link to="https://www.wisc.edu/"><img src={withPrefix("../images/logo_uw.svg")} alt="University of Wisconsin-Madison" /></Link>
  </footer>
)

export default Footer