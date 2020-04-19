const fs = require('fs')
const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Unlocking the Airwaves',
    description: 'An online collection of early educational public radio content from the National Association of Educational Broadcasters (NAEB).',
    author: `Maryland Institute for Technology in the Humanities`,
    siteUrl: `https://mith.umd.edu/airwaves/`,
    twitter: `https://twitter.com/umd_mith`
  },
  pathPrefix: `/airwaves`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        name: `svg`,
        rule: {
          include: path.resolve(__dirname, 'src/svg')
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, 'src/images')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(__dirname, 'static/data/'),
        ignore: [
          path.resolve(__dirname, 'static/data/index.json'),
          path.resolve(__dirname, 'static/data/ocr')
        ]
      }
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
