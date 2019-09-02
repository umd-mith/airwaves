/**
 * This utility will walk the episode metadata and make sure MP3 and WEBVTT files are 
 * available for each episode.
 */

const episodes = require('../../static/data/episodes.json')
const fetch = require('node-fetch')
const s3Bucket = 'https://mith-uta.s3.amazonaws.com'

async function main() {
  await checkEpisodes()
}

async function checkEpisodes() {
  for (let i = 0; i < episodes.length; i += 1) {
    const e = episodes[i]
    if (! await checkUrl(`${s3Bucket}/data/audio/${e.aapbId}.mp3`)) {
      console.log(`missing mp3 for ${e.aapbId}`)
    }
    if (! await checkUrl(`${s3Bucket}/data/transcripts/${e.aapbId}/${e.aapbId}.vtt`)) {
      console.log(`missing vtt for ${e.aapbId}`)
    }
  }
}

async function checkUrl(url) {
  const resp = await fetch(url, {method: 'HEAD'})
  return resp.status == 200
}

if (require.main === module) {
  main()
}