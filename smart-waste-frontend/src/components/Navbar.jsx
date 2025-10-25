import { Link, useNavigate } from 'react-router-dom'
import { loadUser, clearAuth } from '../auth'


export default function Navbar(){
const nav = useNavigate()
const user = loadUser()
return (
<div className="navbar">
<div className="brand">Smart Waste AI</div>
<nav>
<Link to="/home">Home</Link>
<Link to="/bins">Nearest Bins</Link>
<Link to="/classifier">Classifier</Link>
<Link to="/report">Report</Link>
<Link to="/rewards">Rewards</Link>
<Link to="/dashboard">My Account</Link>
</nav>
<div className="nav-actions">
{user ? (
<button className="btn small" onClick={() => { clearAuth(); nav('/login') }}>Logout</button>
) : (
<Link className="btn small" to="/login">Login</Link>
)}
</div>
</div>
)
}