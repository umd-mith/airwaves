import React from 'react'
import { graphql, Link } from 'gatsby'
import './document.css'

import Layout from '../components/layout'

const miradorConfig = {
  id: 'mirador-viewer',
  window: {
    allowClose: false,
    allowMaximize: false,
    defaultSideBarPanel: 'info',
    defaultView: 'single',
  },
  thumbnailNavigation: {
    defaultPosition: 'off',
  },
  workspace: {
    type: 'single',
  },
  workspaceControlPanel: {
    enabled: false,
  }
}

export const query = graphql`
  query($iaId: String!) {
    documentsJson(iaId: { eq: $iaId }) {
      id
      iaId
      box
      folder
      title
      description
      date
      subject {
        id
        name
      }
      contributor {
        id
        name
      }
      creator {
        id
        name
      }
    }
  }
`

class Mirador extends React.Component {

  componentDidMount() {
    const {config, plugins} = this.props
    let mirador = require('mirador')
    mirador.viewer(config, plugins)
  }

  render() {
    const { config } = this.props
    return <div id={config.id} />
  }

}

const Document = ({ data }) => {
  const doc = data.documentsJson
  if (doc.contributor === null) {
    doc.contributor = []
  }
  const contributors = doc.contributor.map(c => <div>{c.name}</div>)
  if (doc.subject === null) {
    doc.subject = []
  }
  const subjects = doc.subject.map(c => <div>{c.name}</div>)
  const manifestUrl = `https://iiif.archivelab.org/iiif/${doc.iaId}/manifest.json`
  miradorConfig.windows = [
    {
      loadedManifest: manifestUrl,
      view: 'single'
    }
  ]

  return (
    <Layout>
      <div id="document">
        <div className="metadata">
          <h1>{doc.title}</h1>
          <table>
            <tbody>
              <tr>
                <td className="label">Description</td>
                <td>{doc.description}</td>
              </tr>
              <tr>
                <td className="label">Subject(s)</td>
                <td>{subjects}</td>
              </tr>
              <tr>
                <td className="label">Contributors</td>
                <td>{contributors}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="doc-viewer">
        <Mirador config={miradorConfig} plugins={[]} />
        </div>
      </div>
    </Layout>
  )
}

export default Document