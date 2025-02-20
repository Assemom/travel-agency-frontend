import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "../Tours/tour.css";
import { tourDetails, popularsData } from "../../utils/data";
import { NavLink, useNavigate } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Modal, Form } from "react-bootstrap";

import {
  Container,
  Row,
  Nav,
  Col,
  Tab,
  ListGroup,
  Accordion,
  Card,
  Stack,
} from "react-bootstrap";

const TourDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('tourReviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      {
        id: 1,
        userId: 1,
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing experience! The tour guide was very knowledgeable.',
        date: '2024-02-15',
        userImage: 'https://ui-avatars.com/api/?name=John+Doe&background=f0c17a&color=fff'
      }
    ];
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    document.title = "Trip Details";
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('tourReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReview = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    const review = {
      id: Date.now(),
      userId: user.id || Date.now(),
      userName: user.name,
      userImage: user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=f0c17a&color=fff`,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      tourId: tourDetails.id
    };

    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem('tourReviews', JSON.stringify(updatedReviews));
    setNewReview({ rating: 5, comment: '' });
    setShowReviewModal(false);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({
      rating: review.rating,
      comment: review.comment
    });
    setShowReviewModal(true);
  };

  const handleUpdateReview = () => {
    const updatedReviews = reviews.map(review => 
      review.id === editingReview.id 
        ? { 
            ...review, 
            rating: newReview.rating, 
            comment: newReview.comment,
            lastEdited: new Date().toISOString().split('T')[0]
          }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem('tourReviews', JSON.stringify(updatedReviews));
    setShowReviewModal(false);
    setEditingReview(null);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem('tourReviews', JSON.stringify(updatedReviews));
    }
  };

  const getTourReviews = (tourId) => {
    const allReviews = JSON.parse(localStorage.getItem('tourReviews')) || [];
    return allReviews.filter(review => review.tourId === tourId);
  };

  return (
    <>
      <Breadcrumbs
        title={tourDetails.title}
        pagename={<NavLink to="/tours">Tours</NavLink>}
        childpagename={tourDetails.title}
      />

      <section className="tour_details py-5">
        <Container>
          <Row>
            <h1 className="fs-2 font-bold mb-4">{tourDetails.title}</h1>

            {/* Gallery Section */}
            <div className="gallery-wrapper">
              <div className="main-gallery">
                <ImageGallery
                  items={tourDetails.images}
                  showPlayButton={false}
                  showNav={false}
                  showFullscreenButton={true}
                  thumbnailPosition="right"
                  showBullets={false}
                  lazyLoad={true}
                  slideDuration={300}
                  onSlide={(currentIndex) => {
                    setSelectedImage(currentIndex);
                  }}
                />
              </div>
            </div>

            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row className="py-5">
                <Col md={8} className="mb-3 mb-md-0">
                  <Col md={12}>
                    <Nav variant="pills" className="flex-row nav_bars rounded-2">
                      <Nav.Item>
                        <Nav.Link eventKey="1">Overview</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2">Journey Timeline</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="3">Inclusions & Exclusion</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="4">Location</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="5">Reviews</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="1">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Overview
                        </h1>
                        <p className="body-text">{tourDetails.des}</p>

                        <h5 className="font-bold mb-2 h5 mt-3">Tour Info</h5>

                        <ListGroup>
                          {tourDetails.tourInfo.map((val, index) => (
                            <ListGroup.Item
                              className="border-0 pt-0 body-text"
                              key={index}
                              dangerouslySetInnerHTML={{ __html: val }}
                            ></ListGroup.Item>
                          ))}
                        </ListGroup>

                        <h5 className="font-bold mb-2 h5 mt-3">Tour highlights</h5>

                        {tourDetails.highlights.map((val, index) => (
                          <ListGroup.Item
                            className="border-0 pt-0 body-text"
                            key={index}
                          >
                            {val}
                          </ListGroup.Item>
                        ))}
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="2">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Itinerary
                        </h1>

                        <Accordion defaultActiveKey="0" className="mt-4">
                          {tourDetails.itinerary.map((val, index) => (
                            <Accordion.Item
                              eventKey={index}
                              key={index}
                              className="mb-4"
                            >
                              <Accordion.Header>
                                <h1
                                  dangerouslySetInnerHTML={{
                                    __html: val.title,
                                  }}
                                ></h1>
                              </Accordion.Header>
                              <Accordion.Body className="body-text">
                                {val.des}
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="3">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Inclusions & Exclusions
                        </h1>

                        <h5 className="font-bold mb-3 h5 mt-3">Inclusion</h5>

                        {tourDetails.included.map((val, index) => (
                          <ListGroup.Item
                            className="border-0 pt-0 body-text d-flex align-items-center"
                            key={index}
                          >
                            <i className="bi bi-check-lg me-2 text-success h4 m-0"></i>{" "}
                            {val}
                          </ListGroup.Item>
                        ))}

                        <h5 className="font-bold mb-3 h5 mt-3">Exclusion</h5>

                        {tourDetails.exclusion.map((val, index) => (
                          <ListGroup.Item
                            className="border-0 pt-0 body-text d-flex align-items-center"
                            key={index}
                          >
                            <i className="bi bi-x-lg me-2 text-danger h5 m-0"></i>{" "}
                            {val}
                          </ListGroup.Item>
                        ))}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                      <div className="tour_details">
                        <h1 className="font-bold mb-4 h3 border-bottom pb-2">
                          Location
                        </h1>

                        <iframe
                          src="https://maps.app.goo.gl/mAVnSGF7QPDRzr7D9"
                          width="100%"
                          height="400px"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="5">
                      <div className="tour_details">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h1 className="font-bold h3 border-bottom pb-2 mb-0">
                            Reviews & Ratings
                          </h1>
                          <Button 
                            variant="primary" 
                            onClick={() => setShowReviewModal(true)}
                            className="add-review-btn"
                          >
                            <i className="bi bi-plus-lg"></i> Add Review
                          </Button>
                        </div>

                        <div className="reviews-container">
                          {reviews.map(review => (
                            <Card key={review.id} className="review-card mb-3">
                              <Card.Body>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex gap-3">
                                    <img 
                                      src={review.userImage} 
                                      alt={review.userName}
                                      className="review-avatar"
                                    />
                                    <div>
                                      <h5 className="mb-1">{review.userName}</h5>
                                      <div className="rating mb-2">
                                        {[...Array(5)].map((_, index) => (
                                          <i 
                                            key={index}
                                            className={`bi bi-star${index < review.rating ? '-fill' : ''} text-warning`}
                                          ></i>
                                        ))}
                                      </div>
                                      <p className="review-comment mb-1">{review.comment}</p>
                                      <small className="text-muted">{review.date}</small>
                                    </div>
                                  </div>
                                  {user?.id === review.userId && (
                                    <div className="review-actions">
                                      <Button 
                                        variant="link" 
                                        className="text-primary"
                                        onClick={() => handleEditReview(review)}
                                      >
                                        <i className="bi bi-pencil"></i>
                                      </Button>
                                      <Button 
                                        variant="link" 
                                        className="text-danger"
                                        onClick={() => handleDeleteReview(review.id)}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                <Col md={4}>
                  <aside>
                    <Card className="rounded-3 p-2 shadow-sm mb-4 price-info">
                      <Card.Body>
                        <Stack gap={2} direction="horizontal">
                          <h1 className="font-bold mb-0 h2">
                            ${tourDetails.price}
                          </h1>
                          <span className="fs-4"> /person</span>
                        </Stack>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <ListGroup horizontal>
                            <ListGroup.Item className="border-0 me-2 fw-bold">
                              {tourDetails.rating}
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-half"></i>
                            </ListGroup.Item>
                          </ListGroup>
                          <h5 className="h6"> ({tourDetails.reviews})</h5>
                        </div>

                        <NavLink
                          to="/booking"
                          className="primaryBtn w-100 d-flex justify-content-center fw-bold"
                        >
                          Book Now
                        </NavLink>
                      </Card.Body>
                    </Card>

                    <Card className="card-info p-2 shadow-sm">
                      <Card.Body>
                        <h1 className="font-bold mb-2 h3">Need Help ?</h1>

                        <ListGroup>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-telephone me-1"></i> Call us on:{" "}
                            <strong>+90909090</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-alarm me-1"></i> Timing:{" "}
                            <strong>10AM to 7PM</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <strong>
                              {" "}
                              <i className="bi bi-headset me-1"></i> contact with us now
                            </strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-calendar-check me-1"></i>{" "}
                            <strong> Book Appointments</strong>{" "}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
              </Row>
            </Tab.Container>

            {/* Related Trips Section */}
            <section className="related-trips">
              <h2 className="fs-4 font-bold mb-3">Related Trips</h2>
              <Row>
                {popularsData.slice(0, 3).map((trip) => (
                  <Col md={4} key={trip.id}>
                    <Card className="mb-3 related-trip-card">
                      <NavLink to={`/tour/${trip.id}`} className="text-dark text-decoration-none">
                        <Card.Img variant="top" src={trip.image} />
                        <Card.Body>
                          <Card.Title>{trip.title}</Card.Title>
                          <Card.Text>
                            <i className="bi bi-geo-alt"></i> {trip.location}
                          </Card.Text>
                          <Card.Text>
                            <strong>${trip.price}</strong>
                          </Card.Text>
                        </Card.Body>
                      </NavLink>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </Row>
        </Container>
      </section>

      {/* Add Review Modal */}
      <Modal show={showReviewModal} onHide={() => {
        setShowReviewModal(false);
        setEditingReview(null);
        setNewReview({ rating: 5, comment: '' });
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{editingReview ? 'Edit Review' : 'Add Review'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div className="rating-input">
                {[...Array(5)].map((_, index) => (
                  <i 
                    key={index}
                    className={`bi bi-star${index < newReview.rating ? '-fill' : ''} text-warning`}
                    style={{ cursor: 'pointer', fontSize: '24px' }}
                    onClick={() => setNewReview({...newReview, rating: index + 1})}
                  ></i>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Share your experience..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={editingReview ? handleUpdateReview : handleAddReview}
          >
            {editingReview ? 'Update Review' : 'Add Review'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TourDetails;
