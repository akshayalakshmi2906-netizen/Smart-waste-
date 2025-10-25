import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiMapPin,
  FiCpu,
  FiAlertTriangle,
  FiAward,
  FiUser,
} from "react-icons/fi";
import { FaLeaf } from "react-icons/fa"; // ✅ Correct Leaf icon from FontAwesome
import "./Home.css";

export default function Home() {
  const nav = useNavigate();
  const go = (p) => () => nav(p);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>SmartWaste - AI Powered Community Waste Management System</h1>
        <button className="home-logout-btn" onClick={go("/login")}>
          <FiLogOut size={14} /> Logout
        </button>
      </header>

      {/* Dashboard */}
      <div className="home-dashboard-container">
        <h2>Dashboard</h2>
        <div className="home-card-grid">
          

          <div className="home-dashboard-card" onClick={go("/classifier")}>
            <FiCpu size={32} className="home-card-icon" />
            <h3>Waste Classifier</h3>
            <p>Mini chatbot to classify your waste.</p>
          </div>

          <div className="home-dashboard-card" onClick={go("/report")}>
            <FiAlertTriangle size={32} className="home-card-icon" />
            <h3>Report Issue</h3>
            <p>Submit issues & track status.</p>
          </div>

          <div className="home-dashboard-card" onClick={go("/rewards")}>
            <FiAward size={32} className="home-card-icon" />
            <h3>Rewards & Contest</h3>
            <p>Earn points for good disposal habits.</p>
          </div>

          <div className="home-dashboard-card" onClick={go("/dashboard")}>
            <FiUser size={32} className="home-card-icon" />
            <h3>User Dashboard</h3>
            <p>Your profile & activities.</p>
          </div>

          {/* ✅ New Eco-Challenges card */}
          <div className="home-dashboard-card" onClick={go("/eco-challenges")}>
            <FaLeaf size={32} className="home-card-icon" />
            <h3>Eco-Challenges</h3>
            <p>See the challenges faced by the environment and how you can help.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
