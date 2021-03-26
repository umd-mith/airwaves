import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"

import './nav.css'

const Nav = () => {
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

  return(
    <nav className="main-nav">
        <ul className="main-nav-menu">
            {navData.site.siteMetadata.siteNav.map(link => (
                <li key={link.name}>
                    <Link activeClassName="active" to={link.link}>{link.name}</Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Nav