/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
const React = require("react")

const bodyScripts = [
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: `timeline = new TL.Timeline('timeline', '/data/visualizations/pbtimeline.json')`,
    }}
  />,
]

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents(bodyScripts)
}
