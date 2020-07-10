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
    <div className="related col-3 col-4-lg col-4-md col-4-sm col-6-xs">
      <h3>
        <Link to={localPath}>{title}</Link>
      </h3>
      <div className="description">
        {description}
      </div>
    </div>
  )
}

const Exhibit = ({ pageContext: exhibit }) => {
  if (! exhibit.visuals) exhibit.visuals = []
  return (
    <Layout title={exhibit.title}>
      <div className="exhibit">
        <section className="leader">
          <article>
            <h1>{exhibit.title}</h1>
          </article>
        </section>
        <section className="columns">
          <article className="col-8 col-7-lg col-6-md col-6-sm col-12-xs"> 
          <div 
              dangerouslySetInnerHTML={{__html: exhibit.description }} />
          </article>
          <article className="col-4 col-5-lg col-6-md col-6-sm col-12-xs visuals">
            {exhibit.visuals.map(v => (
              <Visual title={v.title} image={v.image} />
            ))}
          </article>
        </section>
        <section className="related_items">
          <h2 className="hidden">Related Items</h2>
          <article className="columns">
            {exhibit.related.map(r => (
              <RelatedItem 
                title={r.title}
                description={r.description}
                url={r.url} />
            ))}
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default Exhibit
