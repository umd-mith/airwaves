const axios = require('axios')
const webhook = process.env.SLACK_WEBHOOK

exports.notify = msg => {
  axios.post(webhook, msg)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}
