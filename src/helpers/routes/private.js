import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { propTypes } from "prop-types";
export default function PrivateRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  let dataUser = localStorage.getItem("dataUser");
  dataUser = JSON.parse(dataUser);
  console.log(dataUser);
  if (dataUser !== null) {
    if (props.isAdmin && dataUser.role !== "admin") {
      return <Navigate to="/" state={{ form: location }} replace />;
    }
  } else {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }

  return <Outlet />;
}
