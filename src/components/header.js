import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

// import './header.css'
import Logo from '../svg/uta-header.svg'

const Header = () => {
  const navData = useStaticQuery(graphql`
  {
    site {
      siteMetadata {
        siteNav {
          name
          link
        }
      }
    }
  }
  `)

    return (
      <header className="main-head">
        <Link to="/" className="main-logo">
          <Logo alt="Unlocking the Airwaves" />
        </Link>
        <div className="main-nav">
          <ul className="main-nav-menu">
            {navData.site.siteMetadata.siteNav.map(link => (
              <li key={link.name}>
                <Link activeClassName="active" to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
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
