import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <>
      <Link to="/basic/counter">Counter App</Link> | <Link to="/basic/react">Basic React</Link> |{" "}
      <button onClick={handleLogout}>Logoutt</button>
    </>
  );
}

export default Navbar;
