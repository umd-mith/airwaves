exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  episodes(createPage, graphql, pathPrefix)
}

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