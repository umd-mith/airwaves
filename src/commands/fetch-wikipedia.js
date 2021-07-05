/*

Since the Wikipedia abstract and image are not stored in Airtable at this time this
program can be used to fetch this data for people/corporate bodies in people.json
and store it in wikipedia.json.

*/

const fs = require("fs")
const util = require("util")
const chalk = require("chalk")
const cheerio = require('cheerio')
const urlfetch = require("node-fetch")
const { writeJson } = require("./mapper")
const streamPipeline = util.promisify(require("stream").pipeline)

async function main() {
  if (! fs.existsSync('./static/data/people.json')) {
    console.log(chalk.red(`No people.json file to read, run fetch-authorities`))
    return
  }

  const people = JSON.parse(fs.readFileSync('./static/data/people.json', 'utf8'))
  if (! people) {
    console.log(chalk.red(`people.json is empty please run fetch-authorities first`))
    return
  }

  const wikipedia = await scrapeWikipedia(people)
  writeJson(wikipedia, "wikipedia.json")
}

async function scrapeWikipedia(people) {

  let data = []

  // use existing data if possible
  if (fs.existsSync('./static/data/wikipedia.json')) {
    data = JSON.parse(fs.readFileSync('./static/data/wikipedia.json', 'utf8'))
  }

  for (const person of people) {
    if (person.wikidata && person.wikidata.wikipediaUrl) {

      // if the person id is already in the wikipedia data we have skip it
      if (data.find(p => p.id == person.id)) {
        continue
      }

      const w = {
        id: person.id,
        url: person.wikidata.wikipediaUrl, 
        image: null,
        imageUrl: null,
        abstract: null
      }

      console.log(`scraping ${person.wikidata.wikipediaUrl}`)
      const response = await urlfetch(person.wikidata.wikipediaUrl)
      if (response.status != 200) {
        console.log(chalk.red(`got ${response.status}`))
        continue
      }

      const html = await response.text()
      const $ = cheerio.load(html)

      // get the image

      let imageUrl = null
      let el = $('.infobox-image a.image img').first()
      if (el.length == 0) {
        el = $('div.thumb img.thumbimage').first()
      }
      if (el.length != 0) {
        imageUrl = 'https:' + el.attr('src')
        // adjust the url to get a larger size image if possible

        const ext = imageUrl.match(/.\w+$/i)[0]
        const filename = `${person.id}${ext}`
        const path = `./static/images/wikipedia/${filename}`
        if (! fs.existsSync(path)) {
          console.log(`downloading ${imageUrl} to ${path}`)
          const resp = await urlfetch(imageUrl)
          await streamPipeline(resp.body, fs.createWriteStream(path))
        }
        w.image = filename
        w.imageUrl = imageUrl
      }

      // get the abstract

      const abstract = $('.mw-parser-output p')
        .filter((i, el) => el.attribs.class === undefined)
        .slice(0, 2)               // get the first two paragraphs
        .text()
        .replace(/\[\d+\]/g, ' ')  // remove footnotes
        .replace(/\n/g, ' ')       // remove newlines
        .replace(/ +/g, ' ')       // remove any resulting extra spaces

      if (abstract != '') w.abstract = abstract

      data.push(w)

      // requesting too quickly can cause Wikipedia to return 429 messages
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

  }

  return data
}

if (require.main === module) {
  main()
}
