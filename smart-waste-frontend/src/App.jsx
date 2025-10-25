import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NearestBins from "./pages/NearestBins"
import WasteClassifier from "./pages/WasteClassifier"
import ReportIssue from "./pages/ReportIssue"
import Rewards from "./pages/Rewards"
import UserDashboard from "./pages/UserDashboard"
import AdminLogin from "./pages/AdminLogin"
import AdminPage from "./pages/AdminPage"
import CoverPage from "./pages/CoverPage";
import EcoChallenges from "./pages/EcoChallenges" 
function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/bins" element={<NearestBins />} />
      <Route path="/classifier" element={<WasteClassifier />} />
      <Route path="/report" element={<ReportIssue />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/eco-challenges" element={<EcoChallenges />} />

    </Routes>
  )
}

export default App
