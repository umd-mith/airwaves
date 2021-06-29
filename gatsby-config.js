const fs = require("fs")
const path = require("path")
const now = new Date()

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  },
  siteMetadata: {
    title: "Unlocking the Airwaves",
    description:
      "An online collection of early educational public radio content from the National Association of Educational Broadcasters (NAEB).",
    author: `Maryland Institute for Technology in the Humanities`,
    siteUrl: `https://mith.umd.edu/airwaves/`,
    twitter: `https://twitter.com/umd_mith`,
    siteNav: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "About",
        link: "/about/",
      },
      {
        name: "Explore the Archive",
        link: "/explore/",
      },
      {
        name: "Exhibits",
        link: "/exhibits/",
      },
      {
        name: "Visualizations",
        link: "/visualizations/",
      },
      {
        name: "Search",
        link: "/search/",
      },
    ],
  },
  pathPrefix: `/airwaves`,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        name: `svg`,
        rule: {
          include: path.resolve(__dirname, "src/svg"),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, "src/images"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(__dirname, "static/data/"),
        ignore: [
          path.resolve(__dirname, "static/data/index.json"),
          path.resolve(__dirname, "static/data/ocr"),
          path.resolve(__dirname, "static/data/snac"),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `exhibits`,
        path: `${__dirname}/src/pages/exhibits`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `exhibit-images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `cms-pages`,
        path: `${__dirname}/static/data/cms-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Unlocking the Airwaves`,
        short_name: `Airwaves`,
        icon: `./src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ["/", "/about/", "/explore/", "/search/", "/exhibits/"],
      },
    },
  ],
}
