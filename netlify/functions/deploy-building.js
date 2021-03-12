const slack_webhook = process.env.SLACK_WEBHOOK

exports.handler = async (event, context) => {
  console.log('SLACK_WEBHOOK', slack_webhook)
  console.log(JSON.stringify(event))
}
