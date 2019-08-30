exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await episodes(createPage, graphql, pathPrefix)
  await documents(createPage, graphql, pathPrefix)
  await series(createPage, graphql, pathPrefix)
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
      path: `/series/${series.id}/`,
      component: require.resolve(`./src/templates/series.js`),
      context: {
        id: series.id
      }
    })
  })

}