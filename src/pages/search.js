import React from "react"
import Search from "../components/search"
import queryString from "query-string"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SearchPage = ({location}) => {
  const qs = queryString.parse(location.search)

  return (
    <Layout>
      <SEO title="Home" keywords={[`archive`, `radio`]} />
      <Search query={qs.q} />
    </Layout>
  )
}

export default SearchPage
