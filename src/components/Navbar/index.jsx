import React from "react";
import styles from "./Navbar.module.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";

function NavbarPage() {
  return (
    <div>
      <Navbar bg="white" expand="lg" className={styles.navbarContainer}>
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="" className={styles.imgLogo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${styles.navbarList}`}>
              <Nav.Link href="/login" className={styles.navbarList_text}>
                Home
              </Nav.Link>
              <Nav.Link href="#link" className={styles.navbarList_text}>
                Movie List
              </Nav.Link>
            </Nav>
            <button className={styles.buttonSignUp}>Sign Up</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
