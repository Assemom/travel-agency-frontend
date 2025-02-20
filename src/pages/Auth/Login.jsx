import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import google from "../../assets/images/googlelogo.jpg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to verify credentials
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    navigate('/');
    window.location.reload(); // Refresh to update header
  };
  useEffect(() => {
    document.title = "Login";
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
              <h2>Welcome Back</h2>
              <p className="subtitle">Welcome back! Please enter your details.</p>
              
              <button className="google-btn">
                <img src={google} alt="Google" />
                Continue With Google
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <form onSubmit={handleLogin}>
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" /> Remember me
                  </label>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <button type="submit" className="submit-btn">Login</button>
              </form>

              <p className="switch-auth">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login; 