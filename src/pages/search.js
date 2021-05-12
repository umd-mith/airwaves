import React, { useState } from "react"
import { graphql } from "gatsby"
import { navigate } from "gatsby"
import Search from "../components/search"
import queryString from "query-string"
import Layout from "../components/layout"
import Loader from "../components/loader"
import "./search.css"

const SearchPage = ({ location, data }) => {
  const qs = queryString.parse(location.search)
  const themeGroups = data.allThemesJson.group

  const [query] = useState(qs.q)
  const [facets, setFacets] = useState(qs.f)

  return (
    <Layout title="Search">
      <Loader>
        <Search query={query} facets={facets} />
        <div className="themes">
          {themeGroups.map(tg => {
            return (
              <div className="theme-group">
                <h3>{tg.fieldValue}</h3>
                {tg.edges.map(t => (
                  <div
                    className="theme"
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      setFacets(`subject:${t.node.name}`)
                      navigate(`/search/?f=subject:${t.node.name}`)
                    }}
                  >
                    {t.node.name}
                  </div>
                ))}
              </div>
            )
          })}
          {/* <ul>
            {themeGroups.map(t => (
              <div
                className="theme"
                role="button"
                tabIndex={0}
                onClick={e => {
                  setFacets(`subject:${t.name}`)
                  navigate(`/search/?f=subject:${t.name}`)
                }}
              >
                {t.name}
              </div>
            ))}
          </ul> */}
        </div>
      </Loader>
    </Layout>
  )
}

export const query = graphql`
  {
    allThemesJson(sort: { fields: name }) {
      group(field: group) {
        fieldValue
        edges {
          node {
            name
          }
        }
      }
    }
  }
`

export default SearchPage
