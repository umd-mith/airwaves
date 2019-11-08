import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Loader from './loader'
import "./layout.css"

const Layout = ({ children }) => {

  const data = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="content">
        <Loader>
          {children}
        </Loader>
      </main>
      <Footer />
    </>
  )

}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
