import React from "react"
import Search from "../components/search"
import queryString from "query-string"
import Layout from "../components/layout"
import Loader from "../components/loader"

const SearchPage = ({location}) => {
  const qs = queryString.parse(location.search)

  return (
    <Layout title="Search">
      <Loader>
        <Search query={qs.q} facets={qs.f} />
      </Loader>
    </Layout>
  )
}

export default SearchPage
