import React, { Component } from "react"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'

import Layout from "../components/layout"

class MaterialsPage extends Component {

  state = {
    open: false
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    let el = e.target
    while (el) {
      if (el.id) {
        this.setState({[el.id]: !this.state[el.id]})
        break
      } else {
        el = el.parentNode
      }
    }
  }

  render() {
    return (
      <Layout>
        <h1>Materials</h1>
        <List>

          <ListItem id="i1" button onClick={this.handleClick}>
            <ListItemText>One</ListItemText>
            <ExpandMore />
            <ExpandLess />
          </ListItem>
          <Collapse in={this.state.i1} timeout="auto" unmountOnExit>
            <List>
              <ListItem button>
                <ListItemText>One A</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  One B
                </ListItemText>
              </ListItem>
            </List>
           </Collapse>

          <ListItem id="i2" button onClick={this.handleClick}>
            <ListItemText>Two</ListItemText>
            <ExpandMore />
            <ExpandLess />
          </ListItem>
          <Collapse in={this.state.i2} timeout="auto" unmountOnExit>
            <List>
              <ListItem>
                <ListItemText>Two A</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Two B</ListItemText>
              </ListItem>
            </List>
          </Collapse>

        </List>
      </Layout>
    )
  }
}

export default MaterialsPage
