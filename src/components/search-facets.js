import React, { Component } from "react"
import "./search-facets.css"

class SearchFacets extends Component {
  render() {
    const facets = getFacets(this.props.results)

    return (
      <div className="facets">
        <div className="facet-panel item-total">
          <span>Refine Results</span>{" "}
          <span className="item-count">{this.props.results.length}</span>
        </div>

        {facets.map(facet => (
          <div
            key={`facet-${facet.name}`}
            className={`facet-panel facet-${facet.name}`}
          >
            <label className={`facet-label facet-label-${facet.name}`}>
              Filter By {facet.name}
            </label>
            <div className="facet-list">
              {facet.counts.map((f, i) => (
                <div className="facet-item">
                  <Facet
                    key={`${this.props.query}-${facet.name}-${f[0]}`}
                    activeFacets={this.props.activeFacets}
                    updateFacets={this.props.updateFacets}
                    type={facet.name}
                    name={f[0]}
                    count={f[1]}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

class Facet extends Component {
  constructor(props) {
    super(props)

    const isActive =
      this.props.activeFacets.filter(
        f => f.type === this.props.type && f.name === this.props.name
      ).length > 0

    this.state = {
      active: isActive,
    }
  }

  render() {
    // remove "Node" from display of a synthetic theme used by visualizations
    const name = this.props.name.replace(" Node", "")

    return (
      <>
        <input
          aria-label={this.props.name}
          type="checkbox"
          name="item-type"
          defaultChecked={this.state.active}
          onClick={e => {
            this.toggle(e)
          }}
          className="cb-input cb-toggle"
        />
        <label title={this.props.name} className="cb-label">
          {name}
        </label>
        <span className="item-count">{this.props.count}</span>
      </>
    )
  }

  toggle(e) {
    const active = this.state.active
    this.setState({ active: !active })
    this.props.updateFacets({
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
      active: !active,
    })
  }
}

function getFacets(results) {
  let type = new Map()
  let subject = new Map()
  let creator = new Map()
  let contributor = new Map()
  let genre = new Map()
  let decade = new Map()

  for (const r of results) {
    tally(r.subject, subject)
    tally(r.creator, creator)
    tally(r.contributor, contributor)
    tally(r.genre, genre)
    tallyDecade(r, decade)
    tallyType(r, type)
  }

  type = sortMap(type, results.length).slice(0, 10)
  subject = sortMap(subject, results.length).slice(0, 10)
  creator = sortMap(creator, results.length).slice(0, 10)
  contributor = sortMap(contributor, results.length).slice(0, 10)
  genre = sortMap(genre, results.length).slice(0, 10)
  decade = sortDecade(decade, results.length).slice(0, 10)

  return [
    { name: "type", counts: type },
    { name: "subject", counts: subject },
    { name: "creator", counts: creator },
    { name: "contributor", counts: contributor },
    { name: "genre", counts: genre },
    { name: "decade", counts: decade },
  ]
}

function tally(values, map) {
  if (values) {
    for (let v of values) {
      map.set(v.name, map.has(v.name) ? map.get(v.name) + 1 : 1)
    }
  }
}

function tallyType(r, map) {
  const recType = r.id[0] === "d" ? "Document" : "Program"
  map.set(recType, map.has(recType) ? map.get(recType) + 1 : 1)
}

function tallyDecade(r, map) {
  const decade = r.decade
  if (decade) {
    map.set(decade, map.has(decade) ? map.get(decade) + 1 : 1)
  }
}

function sortMap(map, total) {
  return [...map.entries()].sort((a, b) => b[1] - a[1])
}

function sortDecade(map, total) {
  return [...map.entries()].sort((a, b) => a[0] < b[0])
}

export default SearchFacets
