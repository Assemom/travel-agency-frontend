import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Card, Badge, Alert } from 'react-bootstrap';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { tourDetails } from '../../utils/data'; // Import tour data

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
  const [bookingHistory] = useState([
    {
      id: 1,
      tourName: "Pyramids of Giza Tour",
      date: "2024-03-15",
      status: "upcoming",
      price: 299,
      guests: 2
    },
    {
      id: 2,
      tourName: "Nile River Cruise",
      date: "2024-02-01",
      status: "completed",
      price: 599,
      guests: 1
    }
  ]);
  const [notifications] = useState([
    { id: 1, type: 'info', message: 'Your upcoming tour is in 3 days!' },
    { id: 2, type: 'success', message: 'Successfully updated profile' }
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    preferences: user.preferences || {
      newsletter: true,
      notifications: true,
      language: 'English'
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        showAlertMessage('error', 'Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        // Update user in localStorage with new image
        const updatedUser = { ...user, profileImage: imageUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        showAlertMessage('success', 'Profile picture updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const showAlertMessage = (type, message) => {
    setAlertInfo({ type, message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { 
      ...user, 
      name: formData.name, 
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      preferences: formData.preferences
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    showAlertMessage('success', 'Profile updated successfully!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showAlertMessage('error', "New passwords don't match!");
      return;
    }
    if (formData.newPassword.length < 6) {
      showAlertMessage('error', "Password should be at least 6 characters!");
      return;
    }
    showAlertMessage('success', 'Password updated successfully!');
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePreferenceChange = (key, value) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [key]: value
      }
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: <Badge bg="primary">Upcoming</Badge>,
      completed: <Badge bg="success">Completed</Badge>,
      cancelled: <Badge bg="danger">Cancelled</Badge>
    };
    return badges[status] || <Badge bg="secondary">Unknown</Badge>;
  };
  useEffect(() => {
    document.title = "Manage Profile";
    window.scroll(0, 0);
  }, []);
  return (
    <div className="dashboard-page">
      {showAlert && (
        <Alert 
          variant={alertInfo.type} 
          className="alert-floating"
          onClose={() => setShowAlert(false)} 
          dismissible
        >
          {alertInfo.message}
        </Alert>
      )}
      
      <Container>
        <Row className="dashboard-container">
          <Col md={3}>
            <Card className="profile-card text-center">
              <div className="profile-image-container">
                <img 
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=f0c17a&color=fff`} 
                  alt={user.name}
                  className="profile-image"
                />
                <label className="image-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <i className="bi bi-camera"></i>
                </label>
              </div>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <div className="user-stats">
                  <div className="stat-item">
                    <span className="stat-value">{bookingHistory.length}</span>
                    <span className="stat-label">Bookings</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {bookingHistory.filter(b => b.status === 'upcoming').length}
                    </span>
                    <span className="stat-label">Upcoming</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Nav variant="pills" className="flex-column dashboard-nav">
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'profile'}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="bi bi-person"></i> Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'bookings'}
                  onClick={() => setActiveTab('bookings')}
                >
                  <i className="bi bi-calendar-check"></i> My Bookings
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'security'}
                  onClick={() => setActiveTab('security')}
                >
                  <i className="bi bi-shield-lock"></i> Security
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'preferences'}
                  onClick={() => setActiveTab('preferences')}
                >
                  <i className="bi bi-gear"></i> Preferences
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'notifications'}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="bi bi-bell"></i> Notifications
                  {notifications.length > 0 && (
                    <Badge bg="danger" className="ms-2">{notifications.length}</Badge>
                  )}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {activeTab === 'profile' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>Profile Settings</h4>
                  </Card.Header>
                  <Card.Body>
                    <form onSubmit={handleUpdateProfile}>
                      <Row>
                        <Col md={6}>
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              type="email"
                              className="form-control"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                            />
                          </div>
                        </Col>
                      </Row>
                      <button type="submit" className="btn-update">
                        Update Profile
                      </button>
                    </form>
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'bookings' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>My Bookings</h4>
                  </Card.Header>
                  <Card.Body>
                    {bookingHistory.length > 0 ? (
                      bookingHistory.map((booking) => (
                        <div key={booking.id} className="booking-item">
                          <Row className="align-items-center">
                            <Col md={3}>
                              <h5>{booking.tourName}</h5>
                              <p className="text-muted mb-0">
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                            </Col>
                            <Col md={3}>
                              <p className="mb-0">
                                <strong>Guests:</strong> {booking.guests}
                              </p>
                              <p className="mb-0">
                                <strong>Total:</strong> ${booking.price}
                              </p>
                            </Col>
                            <Col md={3}>
                              {getStatusBadge(booking.status)}
                            </Col>
                            <Col md={3} className="text-end">
                              <button className="btn-view-details">
                                View Details
                              </button>
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <div className="no-bookings">
                        <i className="bi bi-calendar-x"></i>
                        <p>No bookings found</p>
                        <button 
                          className="btn-primary"
                          onClick={() => navigate('/tours')}
                        >
                          Browse Tours
                        </button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>Security Settings</h4>
                  </Card.Header>
                  <Card.Body>
                    <form onSubmit={handleUpdatePassword}>
                      <div className="form-group">
                        <label>Current Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                      </div>
                      <button type="submit" className="btn-update">
                        Update Password
                      </button>
                    </form>
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'preferences' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>Preferences</h4>
                  </Card.Header>
                  <Card.Body>
                    <div className="preferences-section">
                      <div className="preference-item">
                        <label className="d-flex justify-content-between align-items-center">
                          <span>Newsletter Subscription</span>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.preferences.newsletter}
                              onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                            />
                          </div>
                        </label>
                      </div>
                      <div className="preference-item">
                        <label className="d-flex justify-content-between align-items-center">
                          <span>Email Notifications</span>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.preferences.notifications}
                              onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                            />
                          </div>
                        </label>
                      </div>
                      <div className="preference-item">
                        <label>Language Preference</label>
                        <select
                          className="form-control"
                          value={formData.preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        >
                          <option value="English">English</option>
                          <option value="Arabic">Arabic</option>
                          <option value="French">French</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      className="btn-update mt-3"
                      onClick={handleUpdateProfile}
                    >
                      Save Preferences
                    </button>
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>Notifications</h4>
                  </Card.Header>
                  <Card.Body>
                    {notifications.length > 0 ? (
                      <div className="notifications-list">
                        {notifications.map((notification) => (
                          <Alert 
                            key={notification.id} 
                            variant={notification.type}
                            className="notification-item"
                          >
                            {notification.message}
                          </Alert>
                        ))}
                      </div>
                    ) : (
                      <div className="no-notifications">
                        <i className="bi bi-bell-slash"></i>
                        <p>No new notifications</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard; 