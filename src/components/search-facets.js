import React, { Component } from 'react'
import { FaSearch } from 'react-icons/fa'
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
          <label className={`facet-label facet-label-${facet.name}`}>< FaSearch /> Filter By {facet.name}</label>
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
                  <label title={f[0]}>{f[0]}</label>
                </dt>
              </React.Fragment>
            ))}
          </dl>
        </div>
        ))}

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
    tally(r.subject, subject)
    tally(r.creator, creator)
    tallyDecade(r, decade)
    tallyType(r, type)
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

function tallyType(r, map) {
  const recType = r.id[0] === 'd' ? 'Document' : 'Episode'
  map.set(recType, map.has(recType) ? map.get(recType) + 1 : 1)
}

function tallyDecade(r, map) {
  const date = r.id[0] === 'd' ? r.date : r.year
  if (! date) return

  // a hack to accomodate "1931", "1931-05-23" and "May 1931"
  const match = date.match(/\d{4}/) 
  if (! match) return

  const decadeStart = Math.floor(match[0] / 10) * 10
  if (isNaN(decadeStart)) return

  const decade = `${decadeStart}-${decadeStart + 9}`
  map.set(decade, map.has(decade) ? map.get(decade) + 1 : 1)
}

function sortMap(map, total) {
  return [['All', total], ...map.entries()].sort((a, b) => b[1] - a[1])
}

function sortDecade(map, total) {
  return [['All', total], ...map.entries()].sort((a, b) => a[0] < b[0])
}

export default SearchFacets
