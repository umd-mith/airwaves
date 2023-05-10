import React from "react"
import { Link, withPrefix } from "gatsby"
import Layout from "../components/layout"
import FeaturedExhibitsProvider from "../components/featured-exhibits-provider"
// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
import "./index.css"

// const sliderSettings = {
//   className: "carousel",
//   centerMode: true,
//   initialSlide: 2,
//   centerPadding: "120px",
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   variableWidth: true,
//   draggable: true,
//   responsive: [
//     {
//       breakpoint: 600,
//       settings: {
//         centerPadding: "10px",
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         infinite: false,
//       },
//     },
//   ],
// }

const IndexPage = () => (
  <Layout>
    <div className="page-home">
      <section className="site-intro">
        <h1 id="site-head">Unlocking the Airwaves</h1>
        <p>
          A comprehensive online collection of early educational public radio
          content
        </p>
        <p>from the National Association of Educational Broadcasters (NAEB).</p>
      </section>
      <section className="featured-exhibits">
        <h2>Featured Exhibits</h2>
        <FeaturedExhibitsProvider />
      </section>
      <div className="below-the-fold">
        <section>
          <p>
            The forerunner of CPB and its arms, NPR and PBS, the NAEB developed
            and distributed educational radio programs and accompanying print
            materials to schools and communities across the United States.
            What’s more, the NAEB lobbied extensively to unlock the airwaves—to
            access precious frequency space—in order to bring the voices of poet
            Robert Frost, architect Frank Lloyd Wright, anthropologist Margaret
            Mead, and conservationist “Ranger Mac,” among many other
            individuals, into American homes and classrooms.
          </p>
          <p>
            The NAEB’s history is the dramatic story of idealists who believed
            in the utopian possibilities of technology for education and social
            uplift and who faced considerable challenges in pursuit of those
            goals, including economic depression, world war, and the scarcity of
            the electromagnetic spectrum. It’s a story that has much to tell us
            about 20th century American culture, as well as the 21st century’s
            environment of online educational technology and podcasting that we
            live in today.
          </p>
          <p>
            Despite its historic importance and contemporary relevance, most of
            the NAEB members’ programs were never heard again after their
            initial brief moments on the air. The archives for the radio
            programs and their related paper documentation have been split for
            over 25 years between two institutions: the University of Maryland
            and the Wisconsin Historical Society. Unlocking the Airwaves
            reunites the split collections, ﬁnally realizing the potential of
            the collections of the NAEB for exploration and and the broader
            public.
          </p>
          <p>
            Click on the "Linked Data" button to visit the website for <i>Broadcasting Audiovisual Data</i>, an <i>Unlocking the Airwaves</i> sister project. BA/VD centers on authority records for people and organizations (entities) in not only the NAEB collections, but also three additional radio collections at the University of Maryland, the University of Minnesota, and the University of Wisconsin-Madison.
          </p>
        </section>
        <section className="internal-jump-links">
          <Link className="button" to="/about/">
            Read More about the Project
          </Link>
          <Link className="button" to="/explore/">
            Explore the Archive
          </Link>
          <Link className="button" to="https://bavd.unlockingtheairwaves.org/">
            Linked Data
          </Link>
        </section>
      </div>
    </div>
  </Layout>
)

export default IndexPage
