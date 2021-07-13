import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import "./explore.css"

const ExplorePage = () => (
  <Layout>
    <div className="page-explore">
      <section>
        <h1>Explore the Archive</h1>
        <p>
          There are four different ways you can explore the NAEB collections
        </p>
      </section>
      <section>
        <h2>1. Search the Collections</h2>
        <p>
          The Search page is a way you can explore the entire Unlocking the
          Airwaves collection, including NAEB radio programs and related
          archival materials, from one point of entry. You may either browse the
          collection using what are called ‘facets’ (pre-defined categories and
          queries) on the left side of the screen, or you can conduct an
          Advanced Search of the whole collection using keywords, names of
          people or organizations, geographic regions, subjects, or time
          periods. The Search page is broadly useful to find a wide variety of
          materials in the collections, but if you’d prefer a more streamlined
          approach, you may also browse the collections by either radio programs
          (by series/episode), or within the series of folders from the
          Wisconsin Historical Society’s NAEB paper collections. Read below for
          more on how to explore by radio program or related materials.
        </p>
        <Link className="button" to="/search/">
          Search the Archive
        </Link>
      </section>
      <section>
        <h2>2. Browse Radio Programs</h2>
        <p>
          The radio programming service of the NAEB, known as the National
          Educational Radio Network (NERN), comprised broadcasts which balanced
          a focus on public service reporting of national events (e.g., the
          economy, the depression, World War II, the Civil Rights movement) with
          providing a forum for local issues (e.g., agricultural prices,
          community events, elections) and with expanding public education.
        </p>
        <p>
          These broadcasts, mostly stemming from university and public
          school-run radio stations, provide an in-depth look at the engagements
          and events of American history, as they were broadcast to and received
          by the general public in the twentieth century. They cover crucial
          educational, political, and cultural events as diverse as the national
          census, atomic energy, American labor, religion, United States
          history, agricultural engineering, mathematics, and foreign relations.
        </p>
        <Link to="/programs/" className="button">
          Explore Programs
        </Link>
      </section>
      <section>
        <h2>3. Browse Documents</h2>
        <p>
          Click the link below to browse materials from the NAEB paper
          collection, housed at the Wisconsin Historical Society on the campus
          of the University of Wisconsin-Madison. The NAEB papers mainly cover
          the period from 1950–1970, and include correspondence, scripts,
          reports, promotional materials, speeches of long-time president
          William G. Harley, ﬁles of the Office of Research and Development and
          of National Educational Radio (a division of the NAEB), newsletters
          and other publications. Below you can access a version of the WHS
          ﬁnding aid for the collection, which contains important scope and
          content notes, notes about the collection’s provenance, and most
          importantly, the Contents List. The Contents, or what is in the boxes
          and folders themselves, are organized by what are called archival
          "series.”
        </p>
        <Link to="/materials/" className="button">
          Explore Materials
        </Link>{" "}
      </section>
      <section>
        <h2>4. Browse People and Organizations</h2>
        <p>
          Educational and public broadcasting collections are a window into the
          history of the American experience. These collections are not just
          about unique content, they’re also about unique people and
          organizations which can act Click the link below to see a full list of
          the major people and organizations represented in the collections
        </p>
        <p>
          This work will be expanded on and complemented by our ongoing work on
          the next phase of this project,{" "}
          <a href="https://mith.umd.edu/research/broadcasting-av-data/">
            Broadcasting Audiovisual Data (BAVD)
          </a>
          . BAVD will create a linked data framework to expand the use of people
          and organizations as connective tissue between siloed collections of
          historic educational radio, and promote new discoveries not just about
          the history of broadcasting, but about the history of how Americans
          shared their stories with each other during some of our nation’s most
          culturally tumultuous decades.
        </p>
        <Link to="/people/" className="button">
          Explore People
        </Link>{" "}
        &nbsp;
        <Link to="/organizations/" className="button">
          Explore Organizations
        </Link>
      </section>
    </div>
  </Layout>
)

export default ExplorePage
