import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import google from "../../assets/images/googlelogo.jpg";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create account
    localStorage.setItem('user', JSON.stringify({ email, firstName , lastName }));
    navigate('/');
    window.location.reload(); // Refresh to update header
  };
  useEffect(() => {
    document.title = "SignUp";
    window.scroll(0, 0);
  }, []);
  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="auth-image-col">
            {/* Your Egypt image here */}
          </Col>
          <Col md={6} className="auth-form-col">
            <div className="auth-form">
              <h2>Create Account</h2>
              <p className="subtitle">Start your journey with us today!</p>

              <button className="google-btn">
                <img src={google} alt="Google" />
                Continue With Google
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>
              </form>

              <p className="switch-auth">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup; 