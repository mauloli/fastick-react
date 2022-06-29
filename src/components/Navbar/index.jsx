import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import axios from "../../utils/axios";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function NavbarPage() {
  useEffect(() => {
    getDataRole();
  }, []);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [role, setRole] = useState("");

  const getDataRole = () => {
    if (token) {
      const { role } = JSON.parse(localStorage.getItem("dataUser"));
      setRole(role);
    }
  };
  const onSignUp = () => {
    navigate("/register");
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    localStorage.clear();
    const result = await axios.post(`auth/logout`);
    console.log(result);
    navigate("/login");
  };

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
                {role == "admin" ? (
                  <Link to="/manageSchedule" style={{ textDecoration: "none", color: "black" }}>
                    Manage Schedule
                  </Link>
                ) : (
                  <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                    Home
                  </Link>
                )}
              </Nav.Link>
              <Nav.Link
                href={window.location.href == "http://localhost:3000/" ? "#nowShowing" : ""}
                className={styles.navbarList_text}
              >
                {role == "admin" ? (
                  <Link to="/manageMovie" style={{ textDecoration: "none", color: "black" }}>
                    Manage Movie
                  </Link>
                ) : (
                  <Link to="/viewAll" style={{ textDecoration: "none", color: "black" }}>
                    Movie List
                  </Link>
                )}
              </Nav.Link>
            </Nav>
            {!token ? (
              <button className={styles.buttonSignUp} onClick={() => navigate("/register")}>
                Sign Up
              </button>
            ) : (
              <form className={styles.navbarProfile} action="">
                <input
                  className={isSearch ? `` : styles.inputIsSearch}
                  type="text"
                  placeholder="Search Movie Name"
                  style={{ textAlign: "center", height: "40px", borderRadius: "16px" }}
                />
                <i
                  className={`bi bi-search ${isSearch ? styles.isSearch : ""}  ${
                    styles.iconSearch
                  }`}
                  style={{ margin: "0px 25px", cursor: "pointer" }}
                  onClick={() => setIsSearch(!isSearch)}
                ></i>
                <div className={styles.profileLogout}>
                  <NavDropdown
                    title={
                      <img
                        src={require("../../assets/user1.png")}
                        alt=""
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "50%",
                          margin: "0px 25px",
                          cursor: "pointer"
                        }}
                      />
                    }
                  >
                    <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>

                  <button className={styles.logout}>Logout</button>
                </div>
              </form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarPage;
