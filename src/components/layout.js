import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import SiteMetadata from "./site-metadata"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/400-italic.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/pt-sans-narrow/700.css"
import "./layout.css"

const Layout = ({ children, feedUrl, title }) => {
  return (
    <div className="site-wrapper">
      <Header />
      <SiteMetadata feedUrl={feedUrl} title={title} locale="en" />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
