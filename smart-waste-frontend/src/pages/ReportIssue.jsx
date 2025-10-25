import React, { useState } from "react";
import "./ReportIssue.css";
import binsImg from "./bins.jpg"; // put your bins image in src folder

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    issue: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(formData),
    });

    const text = await response.text(); // read raw response first
    let data;

    try {
      data = JSON.parse(text); // try parsing as JSON
    } catch {
      console.error("Non-JSON response:", text);
    }

    if (response.ok) {
      setMessage("✅ Issue reported successfully!");
      setFormData({ name: "", location: "", issue: "" });
    } else {
      setMessage("❌ Failed: " + (data?.error || `Status ${response.status}`));
    }
  } catch (error) {
    console.error("Error:", error);
    setMessage("⚠️ Something went wrong.");
  }
};


  return (
    <div
      className="report-background"
      style={{ backgroundImage: `url(${binsImg})` }}
    >
      <div className="report-container">
        <h2>Report an Issue</h2>
        <form onSubmit={handleSubmit} className="report-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Issue:</label>
          <textarea
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
        {message && <p className="response-msg">{message}</p>}
      </div>
    </div>
  );
};

export default ReportIssue;
