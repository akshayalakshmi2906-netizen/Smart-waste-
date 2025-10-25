import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import "./Login.css";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      nav("/home");
    } catch (error) {
      setErr(error?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={onSubmit} className="login-form">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
          />
          {err && <div className="login-error">{err}</div>}
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="login-foot">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>

        <p className="login-admin">
          👉 Click if you are an <Link to="/admin-login">Admin</Link>
        </p>
      </div>
    </div>
  );
}
