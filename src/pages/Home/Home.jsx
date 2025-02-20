import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";
import Features from "../../components/Features/Features";
import { Container, Row, Col,  } from "react-bootstrap";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./home.css";

import Cards from "../../components/Cards/Cards";
import { destinationsData, popularsData } from "../../utils/data";
import PopularCard from "../../components/Cards/PopularCard";


const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },
    ],
  };

  useEffect(() => {
    document.title = "Discover Egypt";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Banner />
      <AdvanceSearch />
      <Features />

      {/* tour seciton start */}

      <section className="tours_section slick_slider">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <h1> Explore Egypt's Most Breathtaking Destinations</h1>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Slider {...settings}>
                {destinationsData.map((destination, inx) => {
                  return (
                    <Cards destination={destination} key={inx} />
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      {/* tour seciton start */}

      <section className="popular py-5">
      <Container>
        <Row>
          <Col md="12">
            <div className="main_heading">
              <h1> Must-Do Adventures </h1>
            </div>
          </Col>
        </Row>
        <Row>
          {popularsData.map((val, inx)=>{
            return(
            <Col  md={3} sm={6} xs={12} className="mb-5" key={inx}>
              <PopularCard val={val} />
            </Col>
          )
          })}
        </Row>
      </Container>
    </section>

    <section className="why-choose-us mb-3">
      <Container>
        <Row>
          <Col md="12">
            <div className="main_heading text-center mb-5">
              <h1>Why Travel With Us?</h1>
              <p className="subtitle">Experience Egypt like never before with our expert guidance</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3} sm={6} className="mb-4">
            <div className="choose-card">
              <div className="icon-wrapper">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Licensed & Certified</h3>
              <p>Official Egyptian tourism license holder with certified local guides</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <div className="choose-card">
              <div className="icon-wrapper">
                <i className="bi bi-clock-history"></i>
              </div>
              <h3>15+ Years Experience</h3>
              <p>Decades of expertise in crafting unforgettable Egyptian adventures</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <div className="choose-card">
              <div className="icon-wrapper">
                <i className="bi bi-hand-thumbs-up"></i>
              </div>
              <h3>Tailored Experience</h3>
              <p>Customized itineraries to match your interests and preferences</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <div className="choose-card">
              <div className="icon-wrapper">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <h3>Best Value</h3>
              <p>Competitive prices without compromising on quality</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section className="call_us">
      <Container>
        <Row className="align-items-center">
          <Col md="8">
            <h5 className="title">DISCOVER EGYPT</h5>
            <h2 className="heading">
              READY FOR TIMELESS WONDERS? REMEMBER THE NILE!
            </h2>
            <p className="text">
              Step into a land of ancient Pharaohs and golden sands. Egypt offers pyramid adventures, Nile cruises, and Red Sea wonders. From Luxor's temples to Sharm El Sheikh's reefs, experience 5,000 years of history meeting modern hospitality.
            </p>
          </Col>
          <Col md="4" className="text-center mt-3 mt-md-0">
            <a
              href=""
              className="secondary_btn bounce"
              rel="no"
            >
              Plan Your Journey!
            </a>
          </Col>
        </Row>
      </Container>
  <div className="overlay"></div>
</section>
    </>
  );
};

export default Home;
