const slack = require('./slack')

exports.handler = async (event, context) => {
  slack.notify({
      username: "Netlify",
      text: "The staging site was just deployed: https://unlocking.netlify.app",
      icon_emoji: ":tada:"
  })
}
