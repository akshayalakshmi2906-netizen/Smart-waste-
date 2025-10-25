import React, { useEffect, useState } from "react";
import { api } from "../api";
import "./ActivityHistory.css";

const ActivityHistory = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        const { data } = await api.get("/issues/my-issues");
        console.log("Fetched issues:", data); // 🔎 debug
        setIssues(data);
      } catch (err) {
        console.error("Error fetching user issues:", err);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="history-card">
      <h3>Reported Issues</h3>
      {issues.length === 0 ? (
        <p>No issues reported yet.</p>
      ) : (
        issues.map((issue) => (
          <div key={issue._id} className="issue-card">
            <p><strong>Location:</strong> {issue.location}</p>
            <p><strong>Issue:</strong> {issue.issue}</p>
            <p><strong>Status:</strong> {issue.status || "Pending"}</p>
            {issue.reply && <p><strong>Reply:</strong> {issue.reply}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityHistory;
