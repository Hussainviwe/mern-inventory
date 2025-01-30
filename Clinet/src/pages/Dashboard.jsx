import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Dummy components for different pages
function Profile() {
  return <h2 style={{ color: "#333" }}>👤 Profile Page</h2>;
}

function Settings() {
  return <h2 style={{ color: "#333" }}>⚙️ Settings Page</h2>;
}

function DashboardHome() {
  return <h2 style={{ color: "#333" }}>🏠 Dashboard Overview</h2>;
}

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#F5F5F5"
    }}>
      
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "linear-gradient(135deg, #6E44FF, #B43E8F)",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>
        
        {/* Sidebar Buttons Container */}
        <div style={{ width: "100%" }}>
          <SidebarButton label="🏠 Home" to="/dashboard?tab=home" active={tab === "home"} />
          <SidebarButton label="👤 Profile" to="/dashboard?tab=profile" active={tab === "profile"} />
          <SidebarButton label="⚙️ Settings" to="/dashboard?tab=settings" active={tab === "settings"} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {tab === "profile" && <Profile />}
        {tab === "settings" && <Settings />}
        {tab === "home" && <DashboardHome />}
        {!tab && <h2 style={{ color: "#333" }}>🎉 Welcome to the Dashboard</h2>}
      </div>
    </div>
  );
}

// Sidebar Button Component
function SidebarButton({ label, to, active }) {
  return (
    <Link to={to} style={{
      display: "block",
      padding: "15px",
      margin: "10px 0",
      borderRadius: "10px",
      textAlign: "center",
      background: active ? "#FFD700" : "rgba(255, 255, 255, 0.2)",
      color: active ? "#333" : "#fff",
      fontWeight: "bold",
      textDecoration: "none",
      transition: "0.3s ease-in-out",
      boxShadow: active ? "0px 4px 10px rgba(255, 215, 0, 0.5)" : "none"
    }}>
      {label}
    </Link>
  );
}
