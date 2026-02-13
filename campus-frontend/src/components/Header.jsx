import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="header">

      {/* LEFT - Website Name */}
      <div className="logo">
        🌿 Campus Environmental Dashboard
      </div>

      {/* CENTER - Main Navigation */}
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/goals">Goals</Link>
      </div>

      {/* RIGHT - Icons */}
      <div className="right-section">

        {/* Notification Bell */}
        <FaBell
          className="icon"
          onClick={() => setShowNotifications(!showNotifications)}
        />

        {/* Admin Profile */}
        <FaUserCircle
          className="icon"
          onClick={() => setShowMenu(!showMenu)}
        />

        {/* Admin Dropdown */}
        {showMenu && (
          <div className="dropdown">
            <Link to="/">Dashboard</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/goals">Goals</Link>
            <Link to="/settings">Settings</Link>
            <p>Logout</p>
          </div>
        )}

        {/* Notification Panel */}
        {showNotifications && (
          <div className="notification-panel">
            <h4>Notifications</h4>
            <p>⚡ Energy usage exceeded</p>
            <p>🌿 New report generated</p>
            <p>🎯 Goal updated</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Header;
