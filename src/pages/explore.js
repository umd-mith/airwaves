import React from "react"
import Search from "../components/search"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ExplorePage = () => (
  <Layout>
    <SEO title="Home" keywords={[`archive`, `radio`]} />
    <br />
    <Search />
  </Layout>
)

export default ExplorePage
