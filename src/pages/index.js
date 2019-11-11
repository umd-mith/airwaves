import React from "react"
import { Link, withPrefix } from "gatsby"
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
              <img height="200" src={withPrefix("/images/carousel/01.jpg")} />
            </div>
            <div>
              <img height="200" src={withPrefix("/images/carousel/02.jpg")} />
            </div>
            <div>
              <img height="200" src={withPrefix("/images/carousel/03.jpg")} />
            </div>
            <div>
              <img height="200" src={withPrefix("/images/carousel/04.jpg")} />
            </div>
            <div>
              <img height="200" src={withPrefix("/images/carousel/05.jpg")} />
            </div>
            <div>
              <img height="200" src={withPrefix("/images/carousel/06.jpg")} />
            </div>
          </Slider>
        </article>
      </section>
    </div>
  </Layout>
)

export default IndexPage
