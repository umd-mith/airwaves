const slack = require('./slack')

exports.handler = async (event, context) => {
  slack.notify({
      username: "Netlify",
      text: "The staging site build just failed.",
      icon_emoji: ":fire:"
  })
}
