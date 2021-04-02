import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import './header.css'
import Logo from '../svg/uta-header.svg'
import MobileLogo from '../svg/uta-header-core_only.svg'
import Nav from './nav'

const Header = () => {

    return (
      <header>
        <div className="header-content">
          <Link to="/">
            <Logo className="main-logo" alt="Unlocking the Airwaves" />
            <MobileLogo className="alt-logo" alt="Unlocking the Airwaves" />
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
