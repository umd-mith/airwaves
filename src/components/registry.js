import React, { useState } from "react"
import { Link } from "gatsby"
import { FaAngleUp } from "react-icons/fa"

import "./registry.css"

export default function Registry({ name, items }) {
  const [searchQuery, setSearchQuery] = useState("")

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  const itemsByLetter = new Map(letters.map(l => [l, []]))

  // a category for items that don't start with A-Z
  itemsByLetter.set("Other", [])

  for (const item of items) {
    if (!item.name.match(new RegExp(searchQuery, "i"))) {
      continue
    }

    const firstLetter = item.name[0].toUpperCase()

    if (itemsByLetter.has(firstLetter)) {
      itemsByLetter.get(firstLetter).push(item)
    } else {
      itemsByLetter.get("Other").push(item)
    }
  }

  const scrollBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="registry">
      <input
        className="registry-search"
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder={`Search by ${name}`}
        aria-label="Search"
      />

      <div className="registry-nav">
        {letters.map(letter => (
          <a href={`#letter-${letter}`}>{letter}</a>
        ))}
      </div>

      {Array.from(itemsByLetter.keys()).map(letter => {
        const hasItems = itemsByLetter.get(letter).length > 0
        return (
          <section style={{ display: hasItems ? "block" : "none" }}>
            <div className="letter-section">
              <div className="letter" id={`letter-${letter}`}>
                {letter}
              </div>
              <div>
                <button className="button back" onClick={scrollBack}>
                  <FaAngleUp />
                </button>
              </div>
            </div>

            <ul>
              {itemsByLetter.get(letter).map(item => (
                <li>
                  <Link to={item.url}>{item.name}</Link>: {item.description}
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
