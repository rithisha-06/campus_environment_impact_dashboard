import { useEffect, useState, useContext } from "react";
import "../App.css";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const { theme, changeTheme } = useContext(ThemeContext);

  const [campusName, setCampusName] = useState("");
  const [role, setRole] = useState("Admin");
  const [energyAlert, setEnergyAlert] = useState(true);
  const [waterAlert, setWaterAlert] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));
    if (saved) {
      setCampusName(saved.campusName || "");
      setRole(saved.role || "Admin");
      setEnergyAlert(saved.energyAlert ?? true);
      setWaterAlert(saved.waterAlert ?? true);
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        campusName,
        role,
        energyAlert,
        waterAlert,
      })
    );
    alert("✅ Settings Saved");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        🌳 Campus Environmental Impact Dashboard
        <span>👤 Admin</span>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <button className="menu-btn active">⚙️ Settings</button>
          <button className="menu-btn">General</button>
          <button className="menu-btn">Notifications</button>
          <button className="menu-btn">Theme</button>
        </div>

        <div className="settings-content">
          <h2>General Settings</h2>

          <div className="card">
            <label>Campus Name</label>
            <input
              type="text"
              value={campusName}
              onChange={(e) => setCampusName(e.target.value)}
            />
          </div>

          <div className="flex-row">
            <div className="card">
              <h3>User Role</h3>

              <label>
                <input
                  type="radio"
                  checked={role === "Admin"}
                  onChange={() => setRole("Admin")}
                />{" "}
                Admin
              </label>

              <br />

              <label>
                <input
                  type="radio"
                  checked={role === "Staff"}
                  onChange={() => setRole("Staff")}
                />{" "}
                Staff
              </label>

              <h3 style={{ marginTop: 15 }}>Alerts</h3>

              <div className="toggle">
                Energy Alerts
                <input
                  type="checkbox"
                  checked={energyAlert}
                  onChange={(e) => setEnergyAlert(e.target.checked)}
                />
              </div>

              <div className="toggle">
                Water Alerts
                <input
                  type="checkbox"
                  checked={waterAlert}
                  onChange={(e) => setWaterAlert(e.target.checked)}
                />
              </div>
            </div>

            <div className="card">
              <h3>Theme</h3>

              <div className="theme-row">
                <div
                  className={`theme-card ${
                    theme === "light" ? "selected" : ""
                  }`}
                  onClick={() => changeTheme("light")}
                >
                  🌞 Light
                </div>

                <div
                  className={`theme-card ${
                    theme === "dark" ? "selected" : ""
                  }`}
                  onClick={() => changeTheme("dark")}
                >
                  🌙 Dark
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="save-btn" onClick={saveSettings}>
              ⬇ Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
