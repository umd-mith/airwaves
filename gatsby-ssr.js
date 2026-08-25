/**
 * Gatsby inlines the entire global stylesheet into every generated page. At
 * ~198 KB across ~7,400 pages that is ~1.4 GB of duplicated CSS, which alone
 * pushes the build artifact past GitHub Pages' 1 GB limit.
 *
 * The external stylesheet is emitted either way, so swap the inline <style>
 * for a <link> to it. Costs one extra request on first load; every subsequent
 * page then reuses the cached file.
 */
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()

  headComponents.forEach(el => {
    if (el.type === "style" && el.props && el.props["data-href"]) {
      el.type = "link"
      el.props.href = el.props["data-href"]
      el.props.rel = "stylesheet"
      el.props.type = "text/css"
      delete el.props["data-href"]
      delete el.props.dangerouslySetInnerHTML
    }
  })

  replaceHeadComponents(headComponents)
}
