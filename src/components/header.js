import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

// import './header.css'
import Logo from '../svg/uta-header.svg'
import Nav from './nav'

const Header = () => {

    return (
      <header>
        <Link to="/" className="main-logo">
          <Logo alt="Unlocking the Airwaves" />
        </Link>
        <Nav />
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
