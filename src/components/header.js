import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import './header.css'
import Logo from '../svg/uta-header.svg'

class Header extends React.Component {

  render() {
    return (
      <header className="main-head">
        <Link to="/" className="main-logo">
          <Logo alt="Unlocking the Airwaves" />
        </Link>
        <div className="main-nav">
          <ul className="main-nav-menu">
            <li><Link activeClassName="active" to="/">Home</Link></li>
            <li><Link activeClassName="active" to="/about/">About</Link></li>
            <li><Link activeClassName="active" to="/explore/">Explore the Archive</Link></li>
            <li><Link activeClassName="active" to="/exhibits/">Exhibits</Link></li>
            <li><Link activeClassName="active" to="/teaching-tools/">Teaching Tools</Link></li>
            <li><Link activeClassName="active" to="/search/">Search</Link></li>
          </ul>
        </div>
      </header>
    )
  }

}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
