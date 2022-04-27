import React from "react";
import styles from "./Navbar.module.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";

function NavbarPage() {
  const token = localStorage.getItem("token");
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
