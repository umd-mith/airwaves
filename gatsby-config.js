const fs = require('fs')

module.exports = {
  siteMetadata: {
    title: 'Unlocking the Airwaves',
    description: 'An online collection of early educational public radio content from the National Association of Educational Broadcasters (NAEB).',
    author: `Maryland Institute for Technology in the Humanities`,
  },
  pathPrefix: `/airwaves`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /src\/images\/.*.svg$/
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        ignore: [`*\.svg$`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/data/`,
        // we won't be querying this huge flexsearch index with graphql :)
        ignore: [`${__dirname}/static/data/flexsearch.json`]
      }
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
