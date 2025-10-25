// src/pages/Rewards.jsx
import React, { useState, useEffect } from "react";
import "./Rewards.css";

const Rewards = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState("");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch user ideas & points on mount
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const res = await fetch("http://localhost:5000/api/rewards", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch ideas");

        const data = await res.json();

        // Ensure ideas is always an array
        setIdeas(Array.isArray(data) ? data : data.ideas || []);

        // Update user points if returned
        if (data.points !== undefined) setPoints(data.points);

      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // ✅ Post new idea
  const handlePostIdea = async () => {
    if (newIdea.trim() === "") {
      alert("❌ Please write your idea before posting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newIdea }),
      });

      if (!res.ok) throw new Error("Failed to post idea");

      const data = await res.json();

      // Add new idea to list
      setIdeas([data.idea, ...ideas]);
      setNewIdea("");
      alert("✅ Idea submitted! Admin will review and allocate points.");
    } catch (err) {
      console.error(err);
      alert("❌ Could not post idea. Please try again.");
    }
  };

  if (loading) return <div className="rewards-container">Loading ideas...</div>;
  if (error) return <div className="rewards-container">Error: {error}</div>;

  return (
  <div className="rewards-wrapper">
    <div className="rewards-container">
      <h2>Rewards & Ideas</h2>
      <p><strong>Your Reward Points:</strong> {points}</p>

      <div className="idea-box">
        <textarea
          placeholder="💡 Share your idea related to waste management..."
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
        />
        <button onClick={handlePostIdea}>Submit Idea</button>
      </div>

      <h3>Your Ideas</h3>
      {ideas.length === 0 ? (
        <p>No ideas posted yet. Be the first to share!</p>
      ) : (
        <ul className="idea-list">
          {ideas.map((idea) => (
            <li key={idea._id} className="idea-item">
              {idea.text}
              {idea.points !== undefined && (
                <span className="idea-points">+{idea.points} points</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

};

export default Rewards;
