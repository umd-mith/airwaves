import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import SiteMetadata from "./site-metadata"
import "./layout.css"

const Layout = ({ children, feedUrl }) => {
  return (
    <>
      <Header />
      <SiteMetadata feedUrl={feedUrl} />
      <main className="content">
        {children}
      </main>
      <Footer />
    </>
  )

}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
