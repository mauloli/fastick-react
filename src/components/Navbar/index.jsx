import React from "react";
import styles from "./Navbar.module.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function NavbarPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="white" expand="lg" className={styles.navbarContainer}>
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="" className={styles.imgLogo} onClick={() => navigate("/")} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${styles.navbarList}`}>
              <Nav.Link href="/login" className={styles.navbarList_text}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link href="#nowShowing" className={styles.navbarList_text}>
                Movie List
              </Nav.Link>
            </Nav>
            {!token ? (
              <button className={styles.buttonSignUp}>Sign Up</button>
            ) : (
              <form action="">
                <i className="bi bi-search" style={{ marginRight: "20px", marginTop: "4px" }}></i>
                <img
                  src={require("../../assets/user1.png")}
                  alt=""
                  style={{ width: "46px", height: "46px", borderRadius: "50%" }}
                />
              </form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
