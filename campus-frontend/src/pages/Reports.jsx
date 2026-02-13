import { useEffect, useState } from "react";
import "../App.css";

function Reports() {
  const [energy, setEnergy] = useState([]);
  const [water, setWater] = useState([]);
  const [waste, setWaste] = useState([]);
  const [carbon, setCarbon] = useState([]);

  // ✅ Weekly Limits
  const WEEKLY_LIMITS = {
    energy: 500,
    water: 500,
    waste: 500,
    carbon: 500,
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/energy")
      .then(res => res.json())
      .then(data => setEnergy(data));

    fetch("http://localhost:5000/api/water")
      .then(res => res.json())
      .then(data => setWater(data));

    fetch("http://localhost:5000/api/waste")
      .then(res => res.json())
      .then(data => setWaste(data));

    fetch("http://localhost:5000/api/carbon")
      .then(res => res.json())
      .then(data => setCarbon(data));
  }, []);

  const getStatus = (usage, limit) => {
    return usage <= limit ? "Within Limit" : "Limit Exceeded";
  };

  const getStatusClass = (usage, limit) => {
    return usage <= limit ? "within" : "exceeded";
  };

  const renderTable = (title, data, limit, unit) => (
    <div className="report-section">
      <h2 className="section-title">{title}</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Usage ({unit})</th>
            <th>Target Limit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>Week {index + 1}</td>
              <td>{item.usage}</td>
              <td>{limit}</td>
              <td className={getStatusClass(item.usage, limit)}>
                {getStatus(item.usage, limit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="report-container">
      <h1>Reports</h1>

      {renderTable(
        "Energy Usage Report",
        energy,
        WEEKLY_LIMITS.energy,
        "kWh"
      )}

      {renderTable(
        "Water Usage Report",
        water,
        WEEKLY_LIMITS.water,
        "Litres"
      )}

      {renderTable(
        "Waste Generated Report",
        waste,
        WEEKLY_LIMITS.waste,
        "kg"
      )}

      {renderTable(
        "Carbon Emission Report",
        carbon,
        WEEKLY_LIMITS.carbon,
        "Tons CO2"
      )}
    </div>
  );
}

export default Reports;
