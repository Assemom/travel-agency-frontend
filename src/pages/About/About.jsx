import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row, Col, Card } from "react-bootstrap";
import aboutImg from "../../assets/images/greatpyramid.jpg";
import "../About/about.css";
import icons1 from "../../assets/images/icons/destination.png";
import icons2 from "../../assets/images/icons/best-price.png";
import icons3 from "../../assets/images/icons/quick.png";

const About = () => {
  useEffect(() => {
    document.title = "About Discover Egypt";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs title="About Us" pagename="About Us" />
      <section className="py-5">
        <Container>
          <Row>
            <Col md="8">
              <div className="about-content">
                <div className="about-image position-relative">
                  <img
                    src={aboutImg}
                    alt="Egyptian Pyramids"
                    className="img-fluid rounded-2"
                  />
                  
                </div>
              </div>
              <h2 className="h2 font-bold pt-4 pb-2">
                Your Gateway to Egyptian Adventures
              </h2>
              <p className="body-text mb-2">
                Welcome to Discover Egypt, your premier destination for experiencing the wonders of ancient and modern Egypt. With decades of expertise in Egyptian tourism, we specialize in crafting unforgettable journeys through the land of the pharaohs.
              </p>
              <p className="body-text mb-2">
                Our team of expert guides and Egyptologists brings history to life, offering unique insights into Egypt's rich cultural heritage, from the magnificent pyramids of Giza to the serene waters of the Nile River. We take pride in providing authentic, immersive experiences that connect our visitors with the heart of Egyptian civilization.
              </p>
              <p className="body-text mb-2">
                Whether you're dreaming of exploring ancient temples, cruising down the Nile, or experiencing the vibrant culture of modern Egypt, our carefully curated tours ensure a perfect blend of adventure, comfort, and cultural discovery.
              </p>
            </Col>
            <Col md="4">
              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons1} alt="Destinations" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">20+ Egyptian Destinations</Card.Title>
                  <p className="mb-2 body-text">
                    Explore Egypt's most iconic sites, from ancient monuments to hidden gems across the country.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons2} alt="Best Price" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Best Value Tours</Card.Title>
                  <p className="mb-2 body-text">
                    Competitive prices without compromising on the quality of your Egyptian adventure.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons3} alt="Quick Booking" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Expert Local Guides</Card.Title>
                  <p className="mb-2 body-text">
                    Professional Egyptologists and local experts to enhance your journey through Egypt.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
