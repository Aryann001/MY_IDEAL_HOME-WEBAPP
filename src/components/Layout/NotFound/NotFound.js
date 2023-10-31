import React from "react";
import { BiError as ErrorIcon } from "react-icons/bi";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <div>
        <ErrorIcon />
      </div>
      <p>Page Not Found </p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
