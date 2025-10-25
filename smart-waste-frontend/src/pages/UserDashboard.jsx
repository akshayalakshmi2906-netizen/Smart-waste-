import React, { useEffect, useState } from "react";
import { api } from "../api";
import "./UserDashboard.css";
import profileImg from "./profile.jpg"; // replace with your profile image
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Go Back icon

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        // ✅ Fetch profile
        const { data: profile } = await api.get("/auth/me");
        setUser(profile);

        // ✅ Fetch reported issues
        const { data: myIssues } = await api.get("/issues/my-issues");
        setIssues(myIssues);

        // ✅ Fetch ideas
        const { data: myIdeas } = await api.get("/ideas");
        setIdeas(myIdeas);
      } catch (err) {
        console.error("Error loading dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-card">
  <img src={profileImg} alt="Profile Avatar" className="profile-avatar" />
  <h3>{user.name}</h3>

  <div className="profile-detail">📧 <span>{user.email}</span></div>
  <div className="profile-divider"></div>

  <div className="profile-detail">📞 <span>{user.phone}</span></div>
  <div className="profile-divider"></div>

  <div className="profile-detail">📍 <span>{user.address}</span></div>
  <div className="profile-divider"></div>

  
</div>


        {/* Go Back button */}
        <button className="back-btn" onClick={() => navigate("/home")}>
          <FaArrowLeft /> Go Back
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2>User Dashboard</h2>

        <div className="card-grid">
          {/* Rewards */}
          <div className="dashboard-card">
            <h3>🏆 Rewards</h3>
            {ideas.length === 0 ? (
              <p>No ideas posted yet.</p>
            ) : (
              ideas.map((idea) => (
                <div key={idea._id} className="idea-item">
                  <strong>💡 {idea.text}</strong> <br />
                  <span>Points: {idea.points || 0}</span>
                </div>
              ))
            )}
          </div>

          {/* Reported Issues */}
          <div className="dashboard-card">
            <h3>📝 My Reported Issues</h3>
            {issues.length === 0 ? (
              <p>No issues reported yet.</p>
            ) : (
              issues.map((issue) => (
                <div key={issue._id} className="issue-item">
                  <strong>{issue.issue}</strong> <br />
                  <span>📍 {issue.location}</span> <br />
                  <span>Status: {issue.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
