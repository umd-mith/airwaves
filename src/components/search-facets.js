import React, { Component } from 'react'
import { Link } from 'gatsby'
import './search-facets.css'

class SearchFacets extends Component {

  render() {

    return (
      <div className="facets">

		    <div className="facet-panel item-total">
			    Refine Results <span className="item-count">1111</span>
		    </div>

        <div className="facet-panel facet-type">
          <label className="facet-label facet-label-type">Filter By Type</label>
          <dl className="facet-list">
            <dd className="item-count">999</dd>
            <dt>
              <input type="radio" name="item-type" value="all" defaultChecked={true} 
                  onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">999</dd>
            <dt>
              <input type="radio" name="item-type" value="episodes" 
                  onClick={this.setCategory} />
              <label title="Media">Media</label>
            </dt>
            <dd className="item-count">99</dd>
            <dt>
              <input type="radio" name="item-type" value="documents"
                  onClick={this.setCategory} />
              <label title="Documents">Documents</label>
            </dt>
          </dl>
        </div>

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

        <div className="facet-panel facet-expandable facet-subject">
          <label className="facet-label facet-label-subject">Filter by Subject</label>
          <dl className="facet-list">
            <dd className="item-count">777</dd>
            <dt>
              <input type="checkbox" name="item-subject" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">77</dd>
            <dt>
              <input type="checkbox" name="item-subject" value="s1" onClick={this.setCategory} />
              <label title="s1">Subject One</label>
            </dt>
          </dl>
        </div>

        <div className="facet-panel facet-expandable facet-creator">
          <label className="facet-label facet-label-creator">Filter by Creator</label>
          <dl className="facet-list">
            <dd className="item-count">888</dd>
            <dt>
              <input type="checkbox" name="item-creator" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">88</dd>
            <dt>
              <input type="checkbox" name="item-creator" value="c1" onClick={this.setCategory} />
              <label title="c1">Creator Name</label>
            </dt>
          </dl>
        </div>

        <div className="facet-panel facet-expandable facet-genre">
          <label className="facet-label facet-label-genre">Filter by Genre</label>
          <dl className="facet-list">
            <dd className="item-count">555</dd>
            <dt>
              <input type="checkbox" name="item-genre" value="all" defaultChecked={true} onClick={this.setCategory} />
              <label title="All">All</label>
            </dt>
            <dd className="item-count">55</dd>
            <dt>
              <input type="checkbox" name="item-genre" value="g1" onClick={this.setCategory} />
              <label title="g1">Genre One</label>
            </dt>
          </dl>
        </div>

		    <div>
          <label className="facet-label">
            <Link to="/series/" className="button">View all Series</Link>
          </label>
        </div>

      </div>
    )
  }

}

export default SearchFacets
