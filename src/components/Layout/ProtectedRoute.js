import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isBroker }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false && isAuthenticated === false) {
    return <Navigate to={`/login`} />;
  }

  if (loading === false && isBroker === true && user.role !== "broker") {
    return <Navigate to={"/login"} />;
  }

  return <Fragment>{loading === false && <Outlet />}</Fragment>;
};

export default ProtectedRoute;
