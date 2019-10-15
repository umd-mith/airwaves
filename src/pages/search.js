import React from "react"
import Search from "../components/search"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SearchPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`archive`, `radio`]} />
    <br />
    <Search />
  </Layout>
)

export default SearchPage
