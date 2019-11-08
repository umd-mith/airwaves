import React from "react"
import Layout from "../components/layout"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const sliderSettings = {
  className: "carousel slider variable-width",
  centerMode: true,
  centerPadding: "60px",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  variableWidth: true
}

const IndexPage = () => (
  <Layout>
    <Slider {...sliderSettings}>
      <div>
        <img height="200" src="/images/carousel/01.jpg" />
      </div>
      <div>
        <img height="200" src="/images/carousel/02.jpg" />
      </div>
      <div>
        <img height="200" src="/images/carousel/03.jpg" />
      </div>
      <div>
        <img height="200" src="/images/carousel/04.jpg" />
      </div>
      <div>
        <img height="200" src="/images/carousel/05.jpg" />
      </div>
      <div>
        <img height="200" src="/images/carousel/06.jpg" />
      </div>
    </Slider>
  </Layout>
)

export default IndexPage
