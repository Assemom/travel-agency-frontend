import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav, Card, Badge, Alert, Table, Modal, Button, Form } from 'react-bootstrap';
import './adminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [activeTab, setActiveTab] = useState('profile');
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  // Modals state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddTourModal, setShowAddTourModal] = useState(false);
  const [showEditTourModal, setShowEditTourModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Data states
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'inactive' }
  ]);

  const [tours, setTours] = useState([
    { 
      id: 1, 
      title: 'Pyramids Tour', 
      price: 299, 
      duration: '1 day',
      location: 'Giza',
      status: 'active'
    },
    { 
      id: 2, 
      title: 'Nile Cruise', 
      price: 599, 
      duration: '3 days',
      location: 'Luxor',
      status: 'active'
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      userId: 1,
      userName: 'John Doe',
      tourName: 'Pyramids Tour',
      date: '2024-03-15',
      status: 'confirmed',
      price: 299,
      guests: 2
    }
  ]);

  // Form states
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [newTour, setNewTour] = useState({
    title: '',
    price: '',
    duration: '',
    location: '',
    description: '',
    image: null
  });

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Update the state for editing tours
  const [editTour, setEditTour] = useState({
    id: '',
    title: '',
    price: '',
    duration: '',
    location: '',
    description: '',
    status: ''
  });

  const showAlertMessage = (type, message) => {
    setAlertInfo({ type, message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // User Management Functions
  const handleAddUser = () => {
    const userId = users.length + 1;
    setUsers([...users, { ...newUser, id: userId, status: 'active' }]);
    setShowAddUserModal(false);
    showAlertMessage('success', 'User added successfully!');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      showAlertMessage('success', 'User deleted successfully!');
    }
  };

  // Tour Management Functions
  const handleAddTour = () => {
    const tourId = tours.length + 1;
    setTours([...tours, { ...newTour, id: tourId, status: 'active' }]);
    setShowAddTourModal(false);
    showAlertMessage('success', 'Tour added successfully!');
  };

  const handleEditTour = (tour) => {
    setEditTour({
      id: tour.id,
      title: tour.title,
      price: tour.price,
      duration: tour.duration,
      location: tour.location,
      description: tour.description || '',
      status: tour.status
    });
    setShowEditTourModal(true);
  };

  const handleUpdateTour = () => {
    setTours(tours.map(tour => 
      tour.id === editTour.id ? editTour : tour
    ));
    setShowEditTourModal(false);
    showAlertMessage('success', 'Tour updated successfully!');
  };

  const handleDeleteTour = (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      setTours(tours.filter(tour => tour.id !== tourId));
      showAlertMessage('success', 'Tour deleted successfully!');
    }
  };

  // Add the image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        showAlertMessage('error', 'Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        const updatedUser = { ...user, profileImage: imageUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        showAlertMessage('success', 'Profile picture updated successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add profile update handler
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    showAlertMessage('success', 'Profile updated successfully!');
  };

  // Add password update handler
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

  // Add status toggle handlers
  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
    showAlertMessage('success', 'User status updated successfully!');
  };

  const handleToggleTourStatus = (tourId) => {
    setTours(tours.map(tour => {
      if (tour.id === tourId) {
        const newStatus = tour.status === 'active' ? 'inactive' : 'active';
        return { ...tour, status: newStatus };
      }
      return tour;
    }));
    showAlertMessage('success', 'Tour status updated successfully!');
  };

  // Function to handle user role update
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUserRole = () => {
    setUsers(users.map(u => 
      u.id === selectedUser.id ? { ...u, role: selectedUser.role } : u
    ));
    setShowEditUserModal(false);
    setSelectedUser(null);
    showAlertMessage('success', 'User role updated successfully!');
  };
  useEffect(() => {
    document.title = "Admin Profile";
    window.scroll(0, 0);
  }, []);

  return (
    <div className="admin-dashboard-page">
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
            {/* Admin Profile Card */}
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
                <Badge bg="primary">Administrator</Badge>
              </Card.Body>
            </Card>

            {/* Admin Navigation */}
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
                  active={activeTab === 'users'}
                  onClick={() => setActiveTab('users')}
                >
                  <i className="bi bi-people"></i> Users Management
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'tours'}
                  onClick={() => setActiveTab('tours')}
                >
                  <i className="bi bi-map"></i> Tours Management
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'bookings'}
                  onClick={() => setActiveTab('bookings')}
                >
                  <i className="bi bi-calendar-check"></i> Bookings
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'analytics'}
                  onClick={() => setActiveTab('analytics')}
                >
                  <i className="bi bi-graph-up"></i> Analytics
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>Profile Settings</h4>
                  </Card.Header>
                  <Card.Body>
                    <form onSubmit={handleUpdateProfile}>
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <button type="submit" className="btn-update">
                        Update Profile
                      </button>
                    </form>

                    <hr className="my-4" />

                    <form onSubmit={handleUpdatePassword}>
                      <h5 className="mb-3">Change Password</h5>
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

              {/* Users Management Tab */}
              {activeTab === 'users' && (
                <Card className="dashboard-card">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4>Users Management</h4>
                    <Button 
                      variant="primary" 
                      onClick={() => setShowAddUserModal(true)}
                    >
                      <i className="bi bi-plus-lg"></i> Add User
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                              <Button
                                variant={user.status === 'active' ? 'success' : 'secondary'}
                                size="sm"
                                onClick={() => handleToggleUserStatus(user.id)}
                              >
                                {user.status === 'active' ? 'Active' : 'Inactive'}
                              </Button>
                            </td>
                            <td>
                              <Button 
                                variant="warning" 
                                size="sm"
                                className="me-2"
                                onClick={() => handleEditUser(user)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}

              {/* Tours Management Tab */}
              {activeTab === 'tours' && (
                <Card className="dashboard-card">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4>Tours Management</h4>
                    <Button 
                      variant="primary" 
                      onClick={() => setShowAddTourModal(true)}
                    >
                      <i className="bi bi-plus-lg"></i> Add Tour
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Duration</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tours.map(tour => (
                          <tr key={tour.id}>
                            <td>{tour.id}</td>
                            <td>{tour.title}</td>
                            <td>${tour.price}</td>
                            <td>{tour.duration}</td>
                            <td>{tour.location}</td>
                            <td>
                              <Button
                                variant={tour.status === 'active' ? 'success' : 'secondary'}
                                size="sm"
                                onClick={() => handleToggleTourStatus(tour.id)}
                              >
                                {tour.status === 'active' ? 'Active' : 'Inactive'}
                              </Button>
                            </td>
                            <td>
                              <Button 
                                variant="warning" 
                                size="sm"
                                className="me-2"
                                onClick={() => handleEditTour(tour)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDeleteTour(tour.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>Bookings Management</h4>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>User</th>
                          <th>Tour</th>
                          <th>Date</th>
                          <th>Guests</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map(booking => (
                          <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.userName}</td>
                            <td>{booking.tourName}</td>
                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                            <td>{booking.guests}</td>
                            <td>${booking.price}</td>
                            <td>
                              <Badge bg={booking.status === 'confirmed' ? 'success' : 'warning'}>
                                {booking.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <Card className="dashboard-card">
                  <Card.Header>
                    <h4>Analytics</h4>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="bi bi-people-fill"></i>
                          </div>
                          <div className="stat-details">
                            <h3>{users.length}</h3>
                            <p>Total Users</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="bi bi-map-fill"></i>
                          </div>
                          <div className="stat-details">
                            <h3>{tours.length}</h3>
                            <p>Active Tours</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="bi bi-calendar-check-fill"></i>
                          </div>
                          <div className="stat-details">
                            <h3>{bookings.length}</h3>
                            <p>Total Bookings</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="stat-card">
                          <div className="stat-icon">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                          <div className="stat-details">
                            <h3>
                              ${bookings.reduce((total, booking) => total + booking.price, 0)}
                            </h3>
                            <p>Total Revenue</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Container>

      {/* Add User Modal */}
      <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddUserModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Tour Modal */}
      <Modal show={showAddTourModal} onHide={() => setShowAddTourModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTour.title}
                onChange={(e) => setNewTour({...newTour, title: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newTour.price}
                onChange={(e) => setNewTour({...newTour, price: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={newTour.duration}
                onChange={(e) => setNewTour({...newTour, duration: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newTour.location}
                onChange={(e) => setNewTour({...newTour, location: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTour.description}
                onChange={(e) => setNewTour({...newTour, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tour Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setNewTour({...newTour, image: e.target.files[0]})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddTourModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTour}>
            Add Tour
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Tour Modal */}
      <Modal show={showEditTourModal} onHide={() => setShowEditTourModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTour.title}
                onChange={(e) => setEditTour({...editTour, title: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editTour.price}
                onChange={(e) => setEditTour({...editTour, price: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={editTour.duration}
                onChange={(e) => setEditTour({...editTour, duration: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={editTour.location}
                onChange={(e) => setEditTour({...editTour, location: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editTour.description}
                onChange={(e) => setEditTour({...editTour, description: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editTour.status}
                onChange={(e) => setEditTour({...editTour, status: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditTourModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateTour}>
            Update Tour
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditUserModal} onHide={() => setShowEditUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.name || ''}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedUser?.email || ''}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={selectedUser?.role || ''}
                onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditUserModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUserRole}>
            Update Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard; 