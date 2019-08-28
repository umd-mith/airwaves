This site contains a prototype viewer for the [Unlocking the Airwaves] project.

## Build

The airwaves web application is a static website that is built and then deployed as a set of files to a web server.

    npm install
    npm run build
    cp -r public /var/www/airwaves

## Develop

    npm run develop
    open http://localhost:8080

## Data

The application relies on external metadata that is downloaded from Airtable. You can rerun this process to fetch the latest data:

    npm run fetch-data
    npm run index

[Unlocking the Airwaves]: https://mith.umd.edu/research/unlocking-the-airwaves/
[NAEB]: https://en.wikipedia.org/wiki/National_Association_of_Educational_Broadcasters
