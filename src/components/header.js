import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import './header.css'
import image from '../images/uta-header.jpg'

const Header = ({ siteTitle }) => (
   <header className="main-head">
    <div className="logo-head">
      <Link to="/">
        <img alt="Unlocking the Airwaves" src={image} />
      </Link>
    </div>
	<div className="main-nav">
	<ul className="main-nav-menu">
            <li className="menu_item"><Link to="/">Home</Link></li>
            <li className="menu_item"><Link to="/">About</Link></li>
            <li className="menu_item"><Link to="/">Explore the Archive</Link></li>
            <li className="menu_item"><Link to="/">Exhibits</Link></li>
            <li className="menu_item"><Link to="/">Teaching Tools</Link></li>
        </ul>
	</div>
  </header>

)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
