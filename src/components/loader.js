import React, { Component } from 'react'
import Antenna from '../svg/antenna.svg'
import './loader.css'

export default class Loader extends Component {

  state = {
    indexChecks: 0,
    indexLoaded: false
  }

  render() {
    let content = this.props.children

    if (! this.state.indexLoaded)  {
      content = (
        <div className="loader">
          <div className="icon">
            <Antenna className="airwave" />
            <br />
            <br />
            Please sit tight while we load the search index ...
          </div>
        </div>
      )
    }

    return (
      <>
        {content}
      </>
    )
  }

  componentDidMount() {
    this.checkIndex()
  }


  checkIndex() {

    // check to see if the index has been fetched, but once it becomes available wait
    // a period of time so that the loading message isn't too rapid on a fast
    // connection.

    const checkInterval = 250
    const waitInterval = 1500

    if (window.__INDEX__ && window.__DOCUMENTS__ && window.__EPISODES__) {
      if (this.state.indexChecks === 0) {
        this.setState({indexLoaded: true})
      } else {
        setTimeout(() => { this.setState({indexLoaded: true}) }, waitInterval)
      }
    } else {
      this.setState({indexChecks: this.state.indexChecks + 1})
      setTimeout(this.checkIndex.bind(this), checkInterval)
    }
  }

}