This repository contains a prototype web application for the [Unlocking the
Airwaves] project. It is a static site built with [Gatsby], which depends on
document image scans that are available at the [Internet Archive], and audio files
that are available in an S3 bucket managed by MITH.

## Develop

    npm install
    npm run develop
    open http://localhost:8080

## Data

The application relies on external metadata that is downloaded from Airtable.
You can rerun this process to fetch the latest data. In order to fetch data from
the Airtable API you will need to set AIRTABLE_API_KEY in your environment.

    npm run fetch-data
    npm run index

## Publish

The website is currently published using GitHub pages. You can publish the
latest code using the `publish` command:

    npm run publish

[Unlocking the Airwaves]: https://mith.umd.edu/research/unlocking-the-airwaves/
[NAEB]: https://en.wikipedia.org/wiki/National_Association_of_Educational_Broadcasters
[Gatsby]: https://www.gatsbyjs.org/
[Internet Archive]: https://archive.org/search.php?query=creator%3A%22National+Association+of+Educational+Broadcasters%22
