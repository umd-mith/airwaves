import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import './loader.css'
import antenna from '../images/antenna.png'

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
            <img src={antenna} />
            <br /> 
            Welcome, hold tight while we tune in some data ...
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
      setTimeout(this.checkIndex.bind(this), 750)
    }
  }

}