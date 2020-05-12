const fs = require('fs')
const RSS = require('rss')
const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await episodes(createPage, graphql, pathPrefix)
  await documents(createPage, graphql, pathPrefix)
  await series(createPage, graphql, pathPrefix)
  await exhibits(createPage, graphql, pathPrefix)
  await rss(graphql)
}

// Create episode pages.

async function episodes(createPage, graphql) {

  let results = await graphql(`
    {
      allEpisodesJson {
        edges {
          node {
            aapbId
          }
        }
      }
    }
  `)

  results.data.allEpisodesJson.edges.forEach(edge => {
    const episode = edge.node
    if (! episode.aapbId) {
      console.log('episode missing aapbId', episode)
      return
    }
    createPage({
      path: `/episode/${episode.aapbId}/`,
      component: require.resolve(`./src/templates/episode.js`),
      context: {
        aapbId: episode.aapbId
      }
    })
  })
}

// Create documents pages.

async function documents(createPage, graphql) {

  results = await graphql(`
    {
      allDocumentsJson {
        edges {
          node {
            iaId
          }
        }
      }
    }
  `)

  results.data.allDocumentsJson.edges.forEach(edge => {
    const doc = edge.node
    createPage({
      path: `/document/${doc.iaId}/`,
      component: require.resolve(`./src/templates/document.js`),
      context: {
        iaId: doc.iaId
      }
    })
  })

}

// Create series pages.

async function series(createPage, graphql) {

  results = await graphql(`
    {
      allSeriesJson {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  results.data.allSeriesJson.edges.forEach(edge => {
    const series = edge.node
    createPage({
      path: `/programs/${series.id}/`,
      component: require.resolve(`./src/templates/series.js`),
      context: {
        id: series.id
      }
    })
  })

}

async function rss(graphql, force=false) {

  // only create rss if the directory isn't there
  if (! fs.existsSync('./static/rss')) {
    fs.mkdirSync('./static/rss')
  }

  const results = await graphql(`
  {
    allSite {
      nodes {
        siteMetadata {
          siteUrl
          description
        }
      }
    }
    allSeriesJson(
      sort: {
        fields: episodes___broadcastDate,
        order: DESC
      }
    ) {
      nodes {
        id
        title
        description
        episodes {
          aapbId
          title
          description
          broadcastDate
          duration
          creator {
            name
          }
          subject {
            name
          }
        }
      }
    }
  }
  `)

  const siteUrl = results.data.allSite.nodes[0].siteMetadata.siteUrl
  const description = results.data.allSite.nodes[0].siteMetadata.description

  let opml = `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="1.0">\n  <head>\n    <title>Unlocking the Airwaves Podcasts</title>\n  </head>\n  <body>`

  results.data.allSeriesJson.nodes.forEach(series => {
    const feedPath = `./static/rss/${series.id}.xml`
    const imageUrl = `${siteUrl}/images/podcast.png`
    const feedUrl = `${siteUrl}/rss/${series.id}.xml`
    const seriesUrl = `${siteUrl}/programs/${series.id}/`

    // only write the RSS file if it's not there already
    // or we have been asked to force a rewrite.

    if (! fs.existsSync(feedPath) || force) {
      let seriesDescription = series.description ? series.description : ''
      if (seriesDescription) {
        seriesDescription += '<br /><br />' + description
      } else {
        seriesDescription = description
      }

      const feed = new RSS({
        title: series.title,
        description: `${series.description}<br /><br />${description}`,
        feed_url: feedUrl,
        site_url: seriesUrl,
        image_url: imageUrl,
        managingEditor: "National Association of Educational Broadcasters"
      })

      series.episodes.forEach(episode => {
        const url = `${siteUrl}/episode/${episode.aapbId}/`
        const mp3Url = `https://mith-uta.s3.amazonaws.com/data/audio/${episode.aapbId}.mp3`
        feed.item({
          title: episode.title,
          description: episode.description,
          url: url,
          date: episode.broadcastDate,
          enclosure: {
            url: mp3Url,
            type: 'audio/mp3'
          },
          custom_elements: [
            {'dc:creator': safeMap(episode.creator, c => c.name)},
            {'dc:subject': safeMap(episode.subject, s => s.name)},
          ]
        })
      })

      // write out the podcast url
      fs.writeFileSync(feedPath, feed.xml()) 
    }

    // add to opml file
    opml += `    <outline type="rss" text="${series.title}" title="${series.title}" xmlUrl="${feedUrl}" htmlUrl="${seriesUrl}"/>\n`
  
  })

  opml += '  </body>\n</opml>\n'
  fs.writeFileSync('./static/rss/programs.opml', opml)
}

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    "type SeriesJson implements Node { episodes: [ EpisodesJson ]}",
    schema.buildObjectType({
      name: 'SeriesJson',
      fields: {
        episodes: {
          type: "[EpisodesJson]",
          resolve: (source, args, context, info) => {
            return context.nodeModel
              .getAllNodes({ type: "EpisodesJson"})
              .filter(episode => {
                return episode.series ? episode.series.id == source.id : false
              })
          }
        }
      }
    })
  ]
  createTypes(typeDefs)
}

async function exhibits(createPage, graphql) {

  results = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            creator
            related {
              title
              description
              url
            }
            title
            visuals {
              image
              title
            }
          }
          html
          fileAbsolutePath
        }
      }
    }
  `)

  results.data.allMarkdownRemark.nodes.forEach(node => {
    const exhibit = {...node.frontmatter, description: node.html}
    exhibit.slug = path.basename(node.fileAbsolutePath).replace(/\.md$/, '')
    console.log(exhibit.slug)
    createPage({
      path: `/exhibits/${exhibit.slug}/`,
      component: require.resolve(`./src/templates/exhibit.js`),
      context: {
        ...exhibit
      }
    })
  })

}



function safeMap(l, f) {
  return l === null ? [] : l.map(f)
}
