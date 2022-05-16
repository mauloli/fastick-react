import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { propTypes } from "prop-types";
export default function PublicRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (token && props.restricted) {
    return <Navigate to="/" state={{ form: location }} replace />;
  }
  return <Outlet />;
}
