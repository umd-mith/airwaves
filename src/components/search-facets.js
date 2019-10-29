import React, { Component } from 'react'
import { Link } from 'gatsby'
import './search-facets.css'

class SearchFacets extends Component {

  render() {

    const facets = getFacets(this.props.results)

    return (
      <div className="facets">

		    <div className="facet-panel item-total">
			    Refine Results <span className="item-count">{this.props.results.length}</span>
		    </div>

        {facets.map(facet => (
        <div className="facet-panel facet-type">
          <label className="facet-label facet-label-type">Filter By {facet.name}</label>
          <dl className="facet-list">
            {facet.counts.map((f, i) => (
              <React.Fragment key={`facet-${facet.name}-${i}`}>
                <dd className="item-count">{f[1]}</dd>
                <dt>
                  <input
                    type="checkbox"
                    name="item-type"
                    value="all"
                    defaultChecked={true} 
                    onClick={this.setCategory} />
                  <label title="{f[0]}">{f[0]}</label>
                </dt>
              </React.Fragment>
            ))}
          </dl>
        </div>
        ))}

        <div className="facet-panel facet-decade">
          <label className="facet-label facet-label-decade">Filter by Decade</label>
          <dl className="facet-list">
            <dd className="item-count">999</dd>
            <dt>
              <input type="checkbox" name="item-decade" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">99</dd>
            <dt>
              <input type="checkbox" name="item-decade" value="1950s" onClick={this.setCategory} />
              <label title="1950s">1950 &ndash; 1959</label>
            </dt>
          </dl>
        </div>

      </div>
    )
  }

}

function getFacets(results) {

  let type = new Map()
  let subject = new Map()
  let creator = new Map()
  let decade = new Map()

  for (const r of results) {
    type.set(r.type, type.has(r.type) ? type.get(r.type) + 1 : 1)
    tally(r.subject, subject)
    tally(r.creator, creator)
    tallyDecade(r, decade)
  }

  type = sortMap(type, results.length).slice(0, 10)
  subject = sortMap(subject, results.length).slice(0, 10)
  creator = sortMap(creator, results.length).slice(0, 10)
  decade = sortDecade(decade, results.length).slice(0, 10)

  return [
    {name: 'type', counts: type},
    {name: 'subject', counts: subject},
    {name: 'creator', counts: creator},
    {name: 'decade', counts: decade}
  ]

}

function tally(values, map) {
  if (values) {
    for (let v of values) {
      map.set(v.name, map.has(v.name) ? map.get(v.name) + 1 : 1)
    }
  }
}

function tallyDecade(r, map) {
  const date = r.type === 'document' ? r.date : r.year
  if (! date) return

  // a hack to accomodate "1931", "1931-05-23" and "May 1931"
  const match = date.match(/\d{4}/) 
  if (! match) return

  const decadeStart = Math.floor(match[0] / 10) * 10
  if (decadeStart == NaN) return

  const decade = `${decadeStart}-${decadeStart + 9}`
  if (decade == 'NaN-NaN') {
    console.log(r)
  }
  map.set(decade, map.has(decade) ? map.get(decade) + 1 : 1)
}

function sortMap(map, total) {
  return [['All', total], ...map.entries()].sort((a, b) => b[1] - a[1])
}

function sortDecade(map, total) {
  return [['All', total], ...map.entries()].sort((a, b) => a[0] < b[0])
}

export default SearchFacets
