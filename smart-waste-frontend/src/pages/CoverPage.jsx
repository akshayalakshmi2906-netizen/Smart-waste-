import React from "react";
import { useNavigate } from "react-router-dom";
import "./CoverPage.css";

const CoverPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="cover-container">
      {/* Left Curved Section */}
      <div className="cover-left">
        <h1 className="cover-title">
          Smart Waste <br />
          <span>AI Powered Community Waste Management System</span>
        </h1>
        <p className="cover-quote">
          "Recycle today for a better tomorrow."
          <br />
          "Smart solutions for a cleaner planet."
        </p>
        <button className="cover-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>

      {/* Right Section - shows only background image */}
      <div className="cover-right"></div>
    </div>
  );
};

export default CoverPage;
