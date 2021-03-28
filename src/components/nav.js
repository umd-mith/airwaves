import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState } from 'react';

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
    
    const [hidden, setHidden] = useState(true);

    const toggleMenu = () => {
        setHidden(prevState => !prevState)
    }
    
    return(
        <div className="main-nav-container">
            <button 
                className="header-menu-button" 
                type="button" 
                rel="noopener noreferrer"
                onClick={toggleMenu}>
                    Menu
            </button>
            <nav className="main-nav">
                <ul id="main-nav-menu" className={hidden ? 'menu': 'menu menu-open'}>
                    {navData.site.siteMetadata.siteNav.map(link => (
                        <li key={link.name}>
                            <Link activeClassName="active" to={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Nav