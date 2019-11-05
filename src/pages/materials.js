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

        <div className="page-materials">
          <section className="leader">
            <h1>Explore Related Materials</h1>
            <article>
              <p>The data below is from the NAEB paper collection, housed at the <a href="https://www.wisconsinhistory.org/" title="Wisconsin Historical Society website" target="_blank">Wisconsin Historical Society</a> on the campus of the <a href="https://www.wisc.edu/" title="University of Wisconsin-Madison website" target="_blank">University of Wisconsin-Madison</a>. The NAEB papers mainly cover the period from 1950&ndash;1970, and include correspondence, scripts, reports, promotional materials, speeches of long-time president William G. Harley, ﬁles of the Office of Research and Development and of National Educational Radio (a division of the NAEB), newsletters and other publications. Below you can access the ﬁnding aid for the collection, which contains important scope and content notes, notes about the collection’s provenance, and most importantly, the Contents List. The Contents, or what is in the boxes and folders themselves, are  organized by what are called archival "series,&rdquo; which, according to the Society of American Archivists, are &ldquo;ﬁle units or documents arranged in accordance with a ﬁling system or maintained as a unit because they relate to a particular subject or function, result from the same activity, have a particular form, or because of some other relationship arising out of their creation, receipt, or use.&rdquo;</p>
        <p>When you expand an arrow next to a folder you’ll see a link to the digitized paper materials. These will launch in a new browser tab. If you want to move on and export a different folder, close the browser tab and return to this page.</p>
            </article>
          </section>

          <section className="columns col_full">
            <article>
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
            </article>
          </section>
        </div>

      </Layout>
    )
  }
}

export default MaterialsPage
