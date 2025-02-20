import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../Header/header.css";
import anubisLogo from "../../../assets/images/Anubis-removebg-preview.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // sticky Header 
  const isSticky = (e) => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 120 ? header.classList.add('is-sticky') :
      header.classList.remove('is-sticky');
  };

  const closeMenu = () => {
    if (window.innerWidth <= 991) {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className="header-section">
      <Container>
        <Navbar expand="lg" className="p-0">
          {/* Logo Section  */}
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src={anubisLogo}
              alt="Anubis Logo"
              className="me-3"
              style={{ height: '60px', width: 'auto' }}
            />
            <NavLink to="/">
              Travel Nest
            </NavLink>
          </Navbar.Brand>
          {/* End Logo Section  */}

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={open}
          >
            {/*mobile Logo Section  */}
            <Offcanvas.Header>
              <img
                src={anubisLogo}
                alt="Anubis Logo"
                className="me-3"
                style={{ height: '60px', width: 'auto' }}
              />
              <h1 className="logo">
                Discover Egypt
              </h1>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>
            {/*end mobile Logo Section  */}

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                  Home
                </NavLink>

                <NavLink className="nav-link" to="/tours" onClick={closeMenu}>
                  TRIPS
                </NavLink>

                <NavDropdown
                  title="EGYPT PLACES"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavLink className="nav-link text-dark" to="/destinations" onClick={closeMenu}>
                    <p>CAIRO</p>
                    <p>ALEXANDRIA</p>
                    <p>HURGHADA</p>
                    <p>DAHAB</p>
                    <p>LUXOR</p>
                    <p>ASWAN</p>
                    <p>SIWA</p>
                  </NavLink>
                </NavDropdown>
                <NavLink className="nav-link" to="/about-us" onClick={closeMenu}>
                  ABOUT US
                </NavLink>
                <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                  CONTACT us
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className="ms-md-4 ms-2 d-flex align-items-center">
            {user ? (
              <>
                <div className="user-avatar">
                  <img
                    src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=f0c17a&color=fff`}
                    alt={user.name}
                    className="avatar-img"
                  />
                  <div className="user-dropdown">
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    {user.role === 'admin' ? (
                      <NavLink to="/admin/dashboard" className="dropdown-item">
                        <i className="bi bi-speedometer2"></i>
                        Dashboard
                      </NavLink>
                    ) : (
                      <NavLink to="/dashboard" className="dropdown-item">
                        <i className="bi bi-person-circle"></i>
                        Manage Profile
                      </NavLink>
                    )}
                    <button onClick={handleLogout} className="logout-btn">
                      <i className="bi bi-box-arrow-right"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <NavLink to="/login" className="primaryBtn d-none d-sm-inline-block">
                Login
              </NavLink>
            )}
            <li className="d-inline-block d-lg-none ms-3 toggle_btn">
              <i className={open ? "bi bi-x-lg" : "bi bi-list"} onClick={toggleMenu}></i>
            </li>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
