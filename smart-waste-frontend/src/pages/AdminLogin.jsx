import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token); // ✅ Save token
        navigate("/admin");
        window.location.reload();
      } else {
        setError("❌ Invalid admin credentials");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("❌ Login failed. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      {/* Back to Login button */}
      <button className="back-to-login-btn" onClick={() => navigate("/login")}>
        ⬅ Back to Login
      </button>

      <div className="admin-login-box">
        <h2>Admin Portal Login</h2>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        {error && <p className="error-msg">{error}</p>}

        
      </div>
    </div>
  );
};

export default AdminLogin;
