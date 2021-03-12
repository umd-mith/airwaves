const https = require('https')

const slack = process.env.SLACK_WEBHOOK
const url = new URL(slack)

/**
 * Send notification to Slack via a webhook URL configured in the Netlify environment.
 */

exports.notify = msg => {
  const data = JSON.stringify(msg)

  const options = {
    hostname: url.host,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  console.log(options)
  console.log(msg)

  const req = https.request(options, res => {
    res.on('data', d => {
      console.log(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}
