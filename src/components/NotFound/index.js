// src/NotFound.js
import React from "react";
import "./NotFound.css";
import notFound from "../../assets/notFound.png"; // Import gambar

const NotFound = ({ show }) => {
  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="not-found-container">
        <img src={notFound} alt="404 Not Found" className="not-found-image" />
        <p className="not-found-message">
          Oops! The page you are looking for does not exist.
        </p>
        <a href="/" className="not-found-link">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
