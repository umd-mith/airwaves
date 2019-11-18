import React from "react"
import Search from "../components/search"
import queryString from "query-string"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/loader"
import "../components/loader.css"

const SearchPage = ({location}) => {
  const qs = queryString.parse(location.search)

  return (
    <Layout>
      <SEO title="Home" keywords={[`archive`, `radio`]} />
      <Loader>
        <Search query={qs.q} facets={qs.f} />
      </Loader>
    </Layout>
  )
}

export default SearchPage
