import React, { useState } from "react"
import { graphql } from 'gatsby'
import { navigate } from "gatsby"
import Search from "../components/search"
import queryString from "query-string"
import Layout from "../components/layout"
import Loader from "../components/loader"
import "./search.css"

const SearchPage = ({location, data}) => {
  const qs = queryString.parse(location.search)
  const themes = data.allThemesJson.nodes
  
  const [query] = useState(qs.q)
  const [facets, setFacets] = useState(qs.f)

  return (
    <Layout title="Search">
      <Loader>
        <Search query={query} facets={facets} />
        <ul className="columns themes">
          {themes.map(t => (
            <li className="theme col-3 col-4-lg col-6-md col-6-sm col-6-xs"
              key={`theme-${t.name}`}
              onClick={e => {
                setFacets(`subject:${t.name}`)
                navigate(`/search/?f=subject:${t.name}`)
              }}>
              {t.name}
            </li>
          ))}
        </ul>
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
