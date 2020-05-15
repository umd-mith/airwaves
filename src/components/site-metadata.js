import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery, withPrefix } from "gatsby"

import gatsbyIcon from "../images/mith.png"

const SiteMetadata = ({ pathname, title, locale, feedUrl }) => {
  const {
    site: {
      siteMetadata: { siteUrl, siteTitle, twitter },
    },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          siteTitle: title
          twitter
        }
      }
    }
  `)

  let feed = ''
  if (feedUrl) {
    feed = <link rel="alternate" type="application/rss+xml" href={`${siteUrl}${feedUrl}`} />
  }

  const pageTitle = title ? `${siteTitle} - ${title}` : siteTitle

  return (
    <Helmet 
      defer={false}
      defaultTitle={pageTitle}>

      <html lang={locale} />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <link rel="icon" href={withPrefix('/images/favicon.png')} />
      <meta name="docsearch:version" content="2.0" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />

      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={`${siteUrl}${gatsbyIcon}`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:title" content={pageTitle} />
      {feed}

    </Helmet>
  )
}

export default SiteMetadata
