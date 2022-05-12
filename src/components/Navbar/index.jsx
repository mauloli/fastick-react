import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function NavbarPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const { role } = JSON.parse(localStorage.getItem("dataUser"));
  return (
    <div>
      <Navbar bg="white" expand="lg" className={styles.navbarContainer}>
        <Container>
          <Navbar.Brand>
            <img
              src={logo}
              alt=""
              className={styles.imgLogo}
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${styles.navbarList}`}>
              <Nav.Link href="/login" className={styles.navbarList_text}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link
                href={window.location.href == "http://localhost:3000/" ? "#nowShowing" : ""}
                className={styles.navbarList_text}
              >
                Movie List
              </Nav.Link>
            </Nav>
            {!token ? (
              <button className={styles.buttonSignUp}>Sign Up</button>
            ) : (
              <form action="">
                <input
                  className={isSearch ? `` : styles.inputIsSearch}
                  type="text"
                  placeholder="Search Movie Name"
                  style={{ textAlign: "center", height: "40px", borderRadius: "16px" }}
                />
                <i
                  className={`bi bi-search ${isSearch ? styles.isSearch : ""}`}
                  style={{ margin: "0px 25px", cursor: "pointer" }}
                  onClick={() => setIsSearch(!isSearch)}
                ></i>
                <img
                  src={require("../../assets/user1.png")}
                  alt=""
                  style={{ width: "46px", height: "46px", borderRadius: "50%", margin: "0px 25px" }}
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
