import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [energy, setEnergy] = useState([]);
  const [water, setWater] = useState([]);
  const [waste, setWaste] = useState([]);
  const [carbon, setCarbon] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  /* ================= LIMITS ================= */
  const MONTHLY_LIMITS = {
    energy: 1500,   // kWh
    water: 5000,    // Litres
    waste: 800,     // kg
    carbon: 20      // Tons CO2
  };

  /* ================= MONTHS ================= */
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  /* ================= YEARS ================= */
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2020; y <= currentYear + 2; y++) {
    years.push(y);
  }

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/energy")
      .then(res => res.json())
      .then(setEnergy)
      .catch(console.error);

    fetch("http://localhost:5000/api/water")
      .then(res => res.json())
      .then(setWater)
      .catch(console.error);

    fetch("http://localhost:5000/api/waste")
      .then(res => res.json())
      .then(setWaste)
      .catch(console.error);

    fetch("http://localhost:5000/api/carbon")
      .then(res => res.json())
      .then(setCarbon)
      .catch(console.error);
  }, []);

  /* ================= FILTER FUNCTION ================= */
  const filterData = (data) =>
    data.filter(
      (item) =>
        item.month === selectedMonth &&
        Number(item.year) === Number(selectedYear)
    );

  /* ================= TOTAL CALCULATIONS ================= */
  const totalEnergy = filterData(energy).reduce(
    (acc, item) => acc + Number(item.usage || 0), 0
  );

  const totalWater = filterData(water).reduce(
    (acc, item) => acc + Number(item.usage || 0), 0
  );

  const totalWaste = filterData(waste).reduce(
    (acc, item) => acc + Number(item.usage || 0), 0
  );

  const totalCarbon = filterData(carbon).reduce(
    (acc, item) => acc + Number(item.usage || 0), 0
  );

  /* ================= STATUS ================= */
  const getStatus = (value, limit) =>
    value <= limit ? "Within Limit" : "Limit Exceeded";

  const getClass = (value, limit) =>
    value <= limit ? "within" : "exceeded";

  const getPercentage = (value, limit) =>
    limit === 0 ? "0" : ((value / limit) * 100).toFixed(1);

  return (
    <div className="dashboard-container">
      <h1>Environmental Dashboard</h1>

      {/* ================= TOP CARDS ================= */}
      <div className="monthly-cards">

        <div className="dashboard-card">
          <h3>⚡ Energy Usage</h3>
          <h2>{totalEnergy} kWh</h2>
          <p>{getPercentage(totalEnergy, MONTHLY_LIMITS.energy)}% of limit</p>
          <p className={getClass(totalEnergy, MONTHLY_LIMITS.energy)}>
            {getStatus(totalEnergy, MONTHLY_LIMITS.energy)}
          </p>
        </div>

        <div className="dashboard-card">
          <h3>💧 Water Usage</h3>
          <h2>{totalWater} Litres</h2>
          <p>{getPercentage(totalWater, MONTHLY_LIMITS.water)}% of limit</p>
          <p className={getClass(totalWater, MONTHLY_LIMITS.water)}>
            {getStatus(totalWater, MONTHLY_LIMITS.water)}
          </p>
        </div>

        <div className="dashboard-card">
          <h3>🗑 Waste Generated</h3>
          <h2>{totalWaste} kg</h2>
          <p>{getPercentage(totalWaste, MONTHLY_LIMITS.waste)}% of limit</p>
          <p className={getClass(totalWaste, MONTHLY_LIMITS.waste)}>
            {getStatus(totalWaste, MONTHLY_LIMITS.waste)}
          </p>
        </div>

        <div className="dashboard-card">
          <h3>🌿 Carbon Emissions</h3>
          <h2>{totalCarbon} Tons CO₂</h2>
          <p>{getPercentage(totalCarbon, MONTHLY_LIMITS.carbon)}% of limit</p>
          <p className={getClass(totalCarbon, MONTHLY_LIMITS.carbon)}>
            {getStatus(totalCarbon, MONTHLY_LIMITS.carbon)}
          </p>
        </div>

      </div>

      {/* ================= MONTHLY REPORTS ================= */}
      <h2 style={{ marginTop: "40px" }}>Monthly Reports</h2>

      <div className="filter-section">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="report-list">
        {["energy", "water", "waste", "carbon"].map((type) => (
          <div key={type} className="report-item">
            <div className="report-left">
              {type === "energy" && "⚡ Energy Usage"}
              {type === "water" && "💧 Water Usage"}
              {type === "waste" && "🗑 Waste Generated"}
              {type === "carbon" && "🌿 Carbon Emissions"}
            </div>

            <div className="report-right">
              <span>{selectedMonth} {selectedYear}</span>
              <button
                className="view-btn"
                onClick={() =>
                  navigate(
                    `/reports?type=${type}&month=${selectedMonth}&year=${selectedYear}`
                  )
                }
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
