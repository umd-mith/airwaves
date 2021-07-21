import React, { Component } from "react"
import ReactModal from "react-modal"
import "./search-facets.css"

class SearchFacets extends Component {
  render() {
    // helps ensure screen readers don't get confused by the modal
    ReactModal.setAppElement(".site-wrapper")

    // get all the facets for the search results
    const facets = getFacets(this.props.results)

    return (
      <div className="facets">
        <div className="facet-panel item-total">
          <span>Refine Results</span>{" "}
          <span className="item-count">{this.props.results.length}</span>
        </div>
        {facets.map(facet => (
          <FacetGroup
            key={`facet-group-${facet.name}`}
            facet={facet}
            activeFacets={this.props.activeFacets}
            updateFacets={this.props.updateFacets}
          />
        ))}
      </div>
    )
  }
}

class FacetGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  openModal() {
    this.setState({ showModal: true })
  }

  closeModal() {
    this.setState({ showModal: false })
  }

  render() {
    const facet = this.props.facet

    const seeAll =
      facet.counts.length > 10 ? (
        <button className="button" onClick={e => this.openModal()}>
          See All
        </button>
      ) : (
        ""
      )

    const displayCounts = facet.counts.slice(0, 10)

    // add any counts for active facets that are missing from the 10 that are
    // being displayed
    for (const af of this.props.activeFacets) {
      if (!displayCounts.find(f => f && f[0] === af.name)) {
        const count = facet.counts.find(f => f && f[0] === af.name)
        if (count) {
          displayCounts.push(count)
        }
      }
    }

    return (
      <div className={`facet-panel facet-${facet.name}`}>
        <label className={`facet-label facet-label-${facet.name}`}>
          Filter By {facet.name}
        </label>

        <div className="facet-list">
          {displayCounts.map((f, i) => (
            <div
              className="facet-item"
              key={`${this.props.query}-${facet.name}-${f[0]}`}
            >
              <FacetSelector
                key={`${this.props.query}-${facet.name}-${f[0]}-sidebar`}
                activeFacets={this.props.activeFacets}
                updateFacets={this.props.updateFacets}
                type={facet.name}
                name={f[0]}
              />
              <label title={this.props.name} className="cb-label">
                {f[0]}
              </label>
              <span className="item-count">{f[1]}</span>
            </div>
          ))}
          <div className="more-facets">{seeAll}</div>
        </div>

        <ReactModal isOpen={this.state.showModal} contentLabel="View">
          <div className="close-modal">
            <button className="button" onClick={e => this.closeModal()}>
              Close
            </button>
          </div>
          <div className="facet-firehose">
            {facet.counts.map((f, i) => (
              <div
                className="facet-item"
                key={`fh-${this.props.query}-${facet.name}-${f[0]}`}
              >
                <div>
                  <FacetSelector
                    key={`${this.props.query}-${facet.name}-${f[0]}-firehose`}
                    activeFacets={this.props.activeFacets}
                    updateFacets={this.props.updateFacets}
                    type={facet.name}
                    name={f[0]}
                  />
                </div>
                <div className="facet-value">{f[0]}</div>
                <div className="facet-count">{f[1]}</div>
              </div>
            ))}
          </div>
        </ReactModal>
      </div>
    )
  }
}

class FacetSelector extends Component {
  render() {
    const isActive =
      this.props.activeFacets.filter(
        f => f.type === this.props.type && f.name === this.props.name
      ).length > 0

    return (
      <input
        className="cb-input cb-toggle"
        aria-label={this.props.name}
        type="checkbox"
        name="item-type"
        checked={isActive}
        onClick={e => {
          this.toggle(isActive)
        }}
      />
    )
  }

  toggle(isActive) {
    this.props.updateFacets({
      type: this.props.type,
      name: this.props.name,
      active: !isActive,
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

  type = sortMap(type, results.length)
  subject = sortMap(subject, results.length)
  creator = sortMap(creator, results.length)
  contributor = sortMap(contributor, results.length)
  genre = sortMap(genre, results.length)
  decade = sortDecade(decade, results.length)

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
