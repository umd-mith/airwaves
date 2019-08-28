import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import './header.css'
import image from '../images/uta-header.jpg'

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <Link to="/">
        <img alt="Unlocking the Airwaves" src={image} />
      </Link>
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
