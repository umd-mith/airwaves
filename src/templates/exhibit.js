import React from 'react'
import Layout from '../components/layout'
import { Link, withPrefix } from 'gatsby'
import './exhibit.css'

const Visual = ({title, image}) => (
  <figure className="visual">
    <img alt={title} title={title} src={withPrefix(image)} />
    <figcaption>{title}</figcaption>
  </figure>
)

const RelatedItem = ({title, url, description}) => {
  // adjust the url so we can create an in-app link with Link
  // note: we remove the /airwaves prefix because Link adds it back on
  // when building with --prefix-paths

  const uri = new URL(url)
  let localPath = uri.pathname + uri.search
  localPath = localPath.replace(/^\/airwaves/, '')

  return (
    <article className="related">
      <div>
        <Link to={localPath}>{title}</Link>
      </div>
      <div>
        {description}
      </div>
    </article>
  )
}

const Exhibit = ({ pageContext: exhibit }) => {
  return (
    <Layout title={exhibit.title}>
      <div className="exhibit">
        <section className="main">
          <div>
            <div className="title">
              {exhibit.title}
            </div>
            <div 
              className="description"
              dangerouslySetInnerHTML={{__html: exhibit.description }} />
          </div>
          <div className="visuals">
            {exhibit.visuals.map(v => (
              <Visual title={v.title} image={v.image} />
            ))}
          </div>
        </section>
        <section className="relateds">
          {exhibit.related.map(r => (
            <RelatedItem 
              title={r.title}
              description={r.description}
              url={r.url} />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Exhibit