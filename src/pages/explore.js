import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

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
          materials in the collections, but if you’d prefer a more serendipitous
          approach, you may also browse the collections by either radio programs, documents, people, or organizations. Read below for
          more on how to explore by browsing.
        </p>
        <Link className="button" to="/search/">
          Search the Collections
        </Link>
        <img
          className="howto-gif"
          src="/images/explore-search.gif"
          width={300}
          alt=""
        />
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
          Click the 'Browse Radio Programs' button to see a list of all the program series 
          in the NAEB collections, sorted and grouped alphabetically by title. 
          Type in the search box if there is a particular title or keyword 
          you're looking for.
        </p>
        <Link to="/programs/" className="button">
          Browse Programs
        </Link>
        <img
          className="howto-gif"
          src="/images/explore-programs.gif"
          width={300}
          alt=""
        />
      </section>
      <section>
        <h2>3. Browse Documents</h2>
        <p>
          Click the 'Browse Documents' button to browse materials from the NAEB paper
          collection, housed at the Wisconsin Historical Society (WHS) on the campus
          of the University of Wisconsin-Madison. The NAEB papers mainly cover
          the period from 1950–1970, and include correspondence, scripts,
          reports, promotional materials, speeches of long-time president
          William G. Harley, ﬁles of the Office of Research and Development and
          of National Educational Radio (a division of the NAEB), newsletters
          and other publications. Below you can access a version of the WHS
          ﬁnding aid for the collection, which contains important scope and
          content notes, notes about the collection’s provenance, and most
          importantly, the Contents List. Expand the Contents lists to see what 
          folders and items have been digitized and select 'View Folder' or 
          'View Item' to view them on our website.
        </p>
        <Link to="/materials/" className="button">
          Browse Documents
        </Link>{" "}
        <img
          className="howto-gif"
          src="/images/explore-documents.gif"
          width={300}
          alt=""
        />
      </section>
      <section>
        <h2>4. Browse People and Organizations</h2>
        <p>
          Educational and public broadcasting collections are a window into the
          history of the American experience. These collections are not just
          about unique content, they’re also about unique people and
          organizations. Click the 'Browse People' or 'Browse Organizations' buttons
          to see a list of some of the major people and organizations 
          represented in the collections. Note that this list will be expanding
          and growing as we move into the next phase of our project.
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
          Browse People
        </Link>{" "}
        &nbsp;
        <Link to="/organizations/" className="button">
          Browse Organizations
        </Link>
        <img
          className="howto-gif"
          src="/images/explore-people.gif"
          width={300}
          alt=""
        />
      </section>
    </div>
  </Layout>
)

export default ExplorePage
