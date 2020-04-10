import { Index } from "./index"
import data from "../../static/data/index.json"

const index = new Index()
index.import(data)

describe("Search", () => {

  it("basic query", () => {
    const results = index.search('america')
    expect(results.length).toBeGreaterThan(0)
  })

  it("returns a result", () => {
    const results = index.search('america')
    expect(results[0]).toHaveProperty('ref')
    expect(results[0]).toHaveProperty('score')
  })

})

