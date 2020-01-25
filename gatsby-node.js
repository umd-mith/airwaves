const fs = require('fs')
const RSS = require('rss')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await episodes(createPage, graphql, pathPrefix)
  await documents(createPage, graphql, pathPrefix)
  await series(createPage, graphql, pathPrefix)
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

async function rss(graphql) {

  // only create rss if the directory isn't there
  if (fs.existsSync('./static/rss')) {
    return
  }
  fs.mkdirSync('./static/rss')

  const results = await graphql(`
  {
    allSite {
      nodes {
        siteMetadata {
          siteUrl
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

  results.data.allSeriesJson.nodes.forEach(series => {
    const feedPath = `./static/rss/${series.id}.xml`
    const feedUrl = `https://umd-mith.github.io/airwaves/rss/${series.id}.xml`

    const feed = new RSS({
      title: series.title,
      description: series.description,
      feed_url: feedUrl,
      site_url: siteUrl,
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

    console.log(feedPath)
    fs.writeFileSync(feedPath, feed.xml()) 
  })

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

function safeMap(l, f) {
  return l === null ? [] : l.map(f)
}
