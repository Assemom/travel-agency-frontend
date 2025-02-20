import React from "react";
import "../Features/features.css";

import feature1 from "../../assets/images/beach-umbrella.png";
import feature2 from "../../assets/images/deal.png";
import feature3 from "../../assets/images/location.png";
import feature4 from "../../assets/images/medal.png";
import { Card, Col, Container, Row } from "react-bootstrap";

const Features = () => {
  const featureList = [
    {
      id: 0,
      image: feature1,
      title: "Discover the possibilities",
      des: "With nearly half a million attractions, hotels & more, you're sure to find joy.",
    },
    {
      id: 1,
      image: feature2,
      title: "Enjoy deals & delights",
      des: "Quality activities. Great prices. Plus, earn credits to save more cash with us.",
    },
    {
      id: 2,
      image: feature3,
      title: "Exploring made easy",
      des: "Book last minute, skip lines & get free cancellation for easier exploring.",
    },
    {
      id: 3,
      image: feature4,
      title: "Travel you can trust",
      des: "Read reviews & get reliable customer support. We're with you at every step.",
    },
  ];

  return (
    <section className="feature-section">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" className="text-center mb-5">
            <h2 className="section-title">Why Choose Our Services</h2>
            <div className="title-divider"></div>
          </Col>
        </Row>
        <Row>
          {featureList.map((feature, inx) => (
            <Col md={3} sm={6} key={inx}>
              <div className="feature-card">
                <div className="icon-box">
                  <img
                    src={feature.image}
                    className="feature-icon"
                    alt={feature.title}
                  />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.des}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
