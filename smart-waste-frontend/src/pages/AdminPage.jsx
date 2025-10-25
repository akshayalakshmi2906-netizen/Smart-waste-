// src/pages/AdminPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const [view, setView] = useState("none"); // "reports" or "ideas"
  const [reports, setReports] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/issues/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      setError("❌ Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch ideas
  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/ideas/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIdeas(res.data);
    } catch (err) {
      setError("❌ Failed to fetch ideas.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update issue status (Accept / Reject)
  const updateIssueStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/issues/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`✅ Issue marked as ${status}`);
      fetchReports(); // refresh
    } catch (err) {
      alert("❌ Failed to update issue status.");
    }
  };

  // ✅ Allocate points to idea
  const allocatePoints = async (ideaId, points) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/ideas/${ideaId}`,
        { points, status: "accepted" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Points allocated!");
      fetchIdeas(); // refresh ideas
    } catch (err) {
      alert("❌ Failed to allocate points.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
    window.location.reload();
  };

  return (
    <div className="admin-page-wrapper">
    <div className="admin-page-container">
      {/* Header with centered title + tiny logout */}
      <div className="admin-header">
        <h2>Welcome Admin - Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Navigation buttons */}
      <div className="admin-buttons">
        <button onClick={() => { setView("reports"); fetchReports(); }}>📋 View Reports</button>
        <button onClick={() => { setView("ideas"); fetchIdeas(); }}>💡 View Ideas</button>
      </div>

      {/* Loading / Errors */}
      {loading && <p>Loading...</p>}
      {error && <p className="error-msg">{error}</p>}

      {/* Reports List */}
      {view === "reports" && reports.length > 0 && (
        <div className="reports-list">
          {reports.map((issue) => (
            <div key={issue._id} className="report-card">
              <h3>{issue.issue}</h3>
              <p><strong>Reported by:</strong> {issue.name}</p>
              <p><strong>Location:</strong> {issue.location}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${issue.status || "pending"}`}>
                  {issue.status || "Pending"}
                </span>
              </p>

              {/* Admin Actions */}
              <div className="admin-actions">
                <button onClick={() => updateIssueStatus(issue._id, "accepted")}>✅ Accept</button>
                <button onClick={() => updateIssueStatus(issue._id, "rejected")}>❌ Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ideas List */}
      {view === "ideas" && ideas.length > 0 && (
        <div className="idea-list">
          {ideas.map((idea) => (
            <div key={idea._id} className="idea-card">
              <h3>{idea.text}</h3>
              <p><strong>Posted by:</strong> {idea.userName}</p>
              <p><strong>Current Points:</strong> {idea.points}</p>
              <input
                type="number"
                placeholder="Enter points"
                id={`points-${idea._id}`}
              />
              <button
                onClick={() =>
                  allocatePoints(
                    idea._id,
                    document.getElementById(`points-${idea._id}`).value
                  )
                }
              >
                Allocate Points
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminPage;
