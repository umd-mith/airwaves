import React from "react"
import Search from "../components/search"
import './index.css'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`archive`, `radio`]} />
    <br />
    <Search />
  </Layout>
)

export default IndexPage
