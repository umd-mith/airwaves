import { Link, withPrefix } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.css"
import Nav from "./nav"

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <Link aria-label="Unlocking the Airwaves home page" to="/">
          <img
            className="main-logo"
            src={withPrefix("/svg/uta-header.svg")}
            alt=""
          />
          <img
            className="alt-logo"
            src={withPrefix("/svg/uta-header-core_only.svg")}
            alt=""
          />
        </Link>
        <Nav />
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
