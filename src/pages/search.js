import React from "react"
import { graphql } from "gatsby"
import { navigate } from "gatsby"
import Search from "../components/search"
import queryString from "query-string"
import Layout from "../components/layout"
import Loader from "../components/loader"
import { Index } from "../search"
import "./search.css"

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    const qs = queryString.parse(this.props.location.search)
    this.state = {
      query: qs.q,
      facets: qs.f,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  setFacets(facets) {
    this.setState({
      facets: facets,
    })
  }

  render() {
    const themeGroups = this.props.data.allThemesJson.group

    // only display themes when a query or facet selection has *not* been made
    const showThemes = ! (this.state.query || this.state.facets)  

    return (
      <Layout title="Search">
        <Loader>
          <Search query={this.state.query} facets={this.state.facets} />
          <div className="themes" style={{display: showThemes ? 'block' : 'none'}}>
            {themeGroups.map(tg => {
              const groupKey = tg.fieldValue.replace(/[&,.\s]/g, "")
              return (
                <div key={groupKey} className={`theme-group ${groupKey}`}>
                  <h3>{tg.fieldValue}</h3>
                  <div className="theme-children">
                    {tg.edges.map(t => (
                      <div
                        key={t.node.name}
                        className="theme"
                        role="button"
                        tabIndex={0}
                        onClick={e => {
                          this.setFacets(`subject:${t.node.name}`)
                          navigate(`/search/?f=subject:${t.node.name}`)
                        }}
                      >
                        {t.node.name}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Loader>
      </Layout>
    )
  }

  fetchData() {
    // get the index
    if (!window.__INDEX__) {
      console.log("loading index.json")
      fetch(`${__PATH_PREFIX__}/data/index.json`)
        .then(function(response) {
          return response.json()
        })
        .then(function(data) {
          const index = new Index()
          index.import(data)
          window.__INDEX__ = index
          console.log(`loaded index.json`)
        })
        .catch(function(e) {
          console.error(`Failed fetch search index: ${e}`)
        })
    }

    // get the episodes
    if (!window.__EPISODES__) {
      console.log("loading episodes.json")
      fetch(`${__PATH_PREFIX__}/data/episodes.json`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          window.__EPISODES__ = makeMap(data)
          console.log("loaded episodes.json")
        })
    }

    // get the documents
    if (!window.__DOCUMENTS__) {
      console.log("loading documents.json")
      fetch(`${__PATH_PREFIX__}/data/documents.json`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          window.__DOCUMENTS__ = makeMap(data)
          console.log("loaded documents.json")
        })
    }
  }
}

/**
 * Creates a Map of the objects in a list using a given prop as a key
 * @param {*} objectList
 * @param {*} key
 */

function makeMap(objectList) {
  const m = new Map()
  for (const o of objectList) {
    m.set(o["id"], o)
  }
  return m
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
