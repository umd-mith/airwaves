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
      <h3>
        <Link to={localPath}>{title}</Link>
      </h3>
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
        <section className="leader">
          <article>
            <h1>{exhibit.title}</h1>
          </article>
        </section>
        <section className="columns col_1_3">
          <article className="col_main description"> 
          <div 
              dangerouslySetInnerHTML={{__html: exhibit.description }} />
          </article>
          <article className="col_sidebar visuals">
            {exhibit.visuals.map(v => (
              <Visual title={v.title} image={v.image} />
            ))}
          </article>
        </section>
        <section className="columns col_full related_items">
          <h2>Related Items</h2>
          <article className="columns relateds">
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