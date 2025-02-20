import React from "react";
import { Carousel } from "react-bootstrap";
import pyramid from "../../assets/images/pyramid.jpg";
import dahab from "../../assets/images/dahab.jpg";
import aswan from "../../assets/images/aswan.jpg";
import tower from "../../assets/images/tower.jpg";
import "../Banner/banner.css"

const Banner = () => {
  return (
    <>
      <section className="slider">
        <Carousel variant="dark">
          <Carousel.Item>
            <img src={pyramid} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                 EXPLORE THE <span>PYRAMIDS OF GIZA</span>
                </h5>
                <p className="sub_text">
                Experience the wonder of ancient Egypt at the Pyramids of Giza, one of the world’s greatest architectural marvels.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={aswan} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                DISCOVER THE BEAUTY OF <span>ASWAN</span>
                </h5>
                <p className="sub_text">
                Explore the rich history and breathtaking landscapes of Aswan, home to stunning temples and the Nile’s beauty.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={tower} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                PANORAMIC VIEWS FROM <span>CAIRO TOWER</span>
                </h5>
                <p className="sub_text">
                  Enjoy breathtaking panoramic views of Cairo from the iconic Cairo Tower, a symbol of modern Egypt.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={dahab} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                RELAX IN <span>DAHAB</span>
                </h5>
                <p className="sub_text">
                Discover the serene beauty of Dahab, a paradise for diving, snorkeling, and relaxing by the Red Sea.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );
};

export default Banner;
