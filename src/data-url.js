import { withPrefix } from "gatsby"

// Set at build time in CI; empty locally so `gatsby develop` serves from static/.
const BASE = process.env.GATSBY_DATA_BASE_URL || ""

export function dataUrl(path) {
  return BASE ? `${BASE}${path}` : withPrefix(path)
}
