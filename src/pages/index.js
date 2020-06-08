import React from 'react'
import { Link, withPrefix } from 'gatsby'
import Layout from "../components/layout"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const sliderSettings = {
  className: "carousel",
  centerMode: true,
  initialSlide: 2,
  centerPadding: "120px",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  variableWidth: true,
  draggable: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        centerPadding: "10px",
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false
      }
    }
  ]
}

const IndexPage = () => (
  
  <Layout>
    <div className="page-home">
      <section className="leader">
        <article>
          <Slider {...sliderSettings}>
            <div>
              <img alt="Document Page" height="200" src={withPrefix("/images/carousel/01.jpg")} />
            </div>
            <div>
              <img alt="Document folded" height="200" src={withPrefix("/images/carousel/02.jpg")} />
            </div>
            <div>
              <img alt="Folders" height="200" src={withPrefix("/images/carousel/03.jpg")} />
            </div>
            <div>
              <img alt="The Jeffersonian Heritage Program" height="200" src={withPrefix("/images/carousel/04.jpg")} />
            </div>
            <div>
              <img alt="Ace Tape Program" height="200" src={withPrefix("/images/carousel/05.jpg")} />
            </div>
            <div>
              <img alt="Human Behavior Pamphlet" height="200" src={withPrefix("/images/carousel/06.jpg")} />
            </div>
          </Slider>
        </article>
      </section>
      <section className="columns">
        <article className="col-7 col-5-sm col-10-xs">
          <h2>Unlocking the Airwaves</h2>
          <p>Unlocking the Airwaves: Revitalizing an Early Public and Educational Radio Collection is a comprehensive online collection of early educational public radio content from the National Association of Educational Broadcasters (NAEB). The forerunner of CPB and its arms, NPR and PBS, the NAEB developed and distributed educational radio programs and accompanying print materials to schools and communities across the United States. What’s more, the NAEB lobbied extensively to unlock the airwaves—to access precious frequency space—in order to bring the voices of poet Robert Frost, architect Frank Lloyd Wright, anthropologist Margaret Mead, and conservationist “Ranger Mac,” among many other individuals, into American homes and classrooms.</p>
          <p>The NAEB’s history is the dramatic story of idealists who believed in the utopian possibilities of technology for education and social uplift and who faced considerable challenges in pursuit of those goals, including economic depression, world war, and the scarcity of the electromagnetic spectrum. It’s a story that has much to tell us about 20th century American culture, as well as the 21st century’s environment of online educational technology and podcasting that we live in today.</p>
          <p>Despite its historic importance and contemporary relevance, most of the NAEB members’ programs were never heard again after their initial brief moments on the air. The archives for the radio programs and their related paper documentation have been split for over 25 years between two institutions: the University of Maryland and the Wisconsin Historical Society. Unlocking the Airwaves reunites the split collections, ﬁnally realizing the potential of the collections of the NAEB for exploration and and the broader public.</p>
          <div className="columns">
            <Link to="/about/" className="col-6 col-12-xs button">Read More about the Project</Link>
            <Link to="/explore/" className="col-6 col-12-xs button">Explore the Archive</Link>
          </div>                          
        </article>
        <article id="featured" className="col-3 col-5-sm col-10-xs">
          <h2>Featured Exhibits</h2>
          <div>
            <Link to="/" style={{ color: "#444" }}>
              <p className="columns">
                <img className="col-6 col-12-xs" alt="Cold War 1" width="100%" src={withPrefix("/images/exhibits/ex_cold-war1.jpg")} />
                <img className="col-6 col-12-xs" alt="Cold War 2" width="100%" src={withPrefix("/images/exhibits/ex_cold-war2.jpg")} />
              </p>
              <span className="caption">Radio During the Cold War</span>
            </Link>
          </div>
          <div>
            <Link to="/" style={{ color: "#444" }}>
              <p className="columns">
                <img className="col-6 col-12-xs" alt="Jazz 1" width="100%" src={withPrefix("/images/exhibits/ex-american-jazz1.jpg")} />
                <img className="col-6 col-12-xs" alt="Jazz 2" width="100%" src={withPrefix("/images/exhibits/ex-american-jazz2.jpg")} />
              </p>
              <span className="caption">American Jazz in the 60s</span>
            </Link>
          </div>
          <Link to="/exhibits/" className="button">More Exhibits</Link>
        </article>                             
      </section>
    </div>
  </Layout>
)

export default IndexPage
