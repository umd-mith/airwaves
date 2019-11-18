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
  const contributors = doc.contributor.map(c => (
    <div><Link to={`/search/?f=contributor:${c.name}`}>{c.name}</Link></div>
  ))

  if (doc.subject === null) {
    doc.subject = []
  }
  const subjects = doc.subject.map(c => (
    <div><Link to={`/search/?f=subject:${c.name}`}>{c.name}</Link></div>
  ))

  const manifestUrl = `https://iiif.archivelab.org/iiif/${doc.iaId}/manifest.json`

  let canvasIndex = 0
  if (typeof window !== 'undefined' && window.location.hash) {
    canvasIndex = Number.parseInt(window.location.hash.replace('#', '')) - 1
  }
  
  miradorConfig.windows = [
    {
      loadedManifest: manifestUrl,
      view: 'single',
      canvasIndex: canvasIndex
    }
  ]

  return (
    <Layout>
      <div id="document" className="">
        <section className="leader">
          <article>
            <h1>{doc.title}</h1>
          </article>
        </section>
        <section className="columns col_1_2">
          <article className="metadata">
            <dl>
              <dt className="label">Description</dt>
              <dd>{doc.description}</dd>
              <dt className="label">Subject(s)</dt>
              <dd>{subjects}</dd>
              <dt className="label">Contributors</dt>
              <dd>{contributors}</dd>
            </dl>
          </article>
          <article id="doc-viewer">
            <Mirador config={miradorConfig} plugins={[]} />
          </article>
        </section>
      </div>
    </Layout>
 
  )
}

export default Document