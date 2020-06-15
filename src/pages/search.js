import React, { useState } from "react"
import { navigate } from "gatsby"
import Search from "../components/search"
import queryString from "query-string"
import Layout from "../components/layout"
import Loader from "../components/loader"
import "./search.css"

const SearchPage = ({location, data}) => {
  const qs = queryString.parse(location.search)
  const themes = data.allThemesJson.nodes
  
  const [query, setQuery] = useState(qs.q)
  const [facets, setFacets] = useState(qs.f)

  return (
    <Layout title="Search">
      <Loader>
        {facets}
        <Search query={query} facets={facets} />
        <div className="themes">
        {themes.map(t => (
          <div className="theme"
            key={`theme-${t.name}`}
            onClick={e => {
              setFacets(`subject:${t.name}`)
              navigate(`/search/?f=subject:${t.name}`)
            }}>
            {t.name}
          </div>
        ))}
        </div>
      </Loader>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allThemesJson(sort: {fields: name}) {
      nodes {
        name
      }
    }
  }
`

export default SearchPage
