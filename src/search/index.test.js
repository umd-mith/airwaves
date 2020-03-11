import { Index } from "./index"
import data from "../../static/data/flexsearch.json"

const index = new Index()
index.import(data)

describe("Search", () => {

  it("basic query", () => {
    const results = index.search('america')
    expect(results.length).toBeGreaterThan(0)
  })

  it("can search by title", () => {
    const results = index.search({query: 'america', field: ['title']})
    expect(results.length).toBeGreaterThan(0)
  })

  it("can search by text", () => {
    const results = index.search({query: 'america', field: ['text']})
    expect(results.length).toBeGreaterThan(0)
  })

  it("can search by description", () => {
    const results = index.search({query: 'america', field: ['description']})
    expect(results.length).toBeGreaterThan(0)
  })

  it("can search by series", () => {
    const results = index.search({query: 'america', field: ['series']})
    expect(results.length).toBeGreaterThan(0)
  })

  it("can search by subject", () => {
    const results = index.search({query: 'america', field: ['subject']})
    expect(results.length).toBeGreaterThan(0)
  })

})

