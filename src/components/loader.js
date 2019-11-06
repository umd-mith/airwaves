import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import './loader.css'
import Antenna from '../svg/antenna.svg'

export default class Loader extends Component {

  state = {
    indexLoaded: false
  }

  render() {
    let content = this.props.children

    if (! this.state.indexLoaded)  {
      content = (
        <div className="loader">
          <div className="icon">
            <Antenna />
            <br />
            <br />
            Please sit tight while we <em>tune in</em> some data ...
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
    if (window.__INDEX__ && window.__DOCUMENTS__ && window.__EPISODES__) {
      console.log('index loaded')
      this.setState({indexLoaded: true})
    } else {
      console.log('index not loaded yet')
      setTimeout(this.checkIndex.bind(this), 1000)
    }
  }

}