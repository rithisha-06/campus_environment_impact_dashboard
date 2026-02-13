import { useEffect, useState } from "react";
import "../App.css";

function Goals() {
  const [data, setData] = useState(null);

  /* LOAD DASHBOARD TOTALS */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dashboardTotals"));
    if (saved) setData(saved);
  }, []);

  if (!data) {
    return <h2 style={{ padding: "30px" }}>Loading Goals...</h2>;
  }

  const percent = (v, t) =>
    t === 0 ? 0 : Math.min(((v / t) * 100).toFixed(1), 100);

  /* DOWNLOAD REPORT */
  const downloadReport = () => {
    const content = `
SUSTAINABILITY GOALS REPORT

Energy: ${data.energy.value} / ${data.energy.target} kWh
Water: ${data.water.value} / ${data.water.target} Litres
Waste: ${data.waste.value} / ${data.waste.target} kg
Carbon: ${data.carbon.value} / ${data.carbon.target} Tons CO2
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Goals_Report.txt";
    link.click();
  };

  return (
    <div className="dashboard-container">
      <h1>Sustainability Goals</h1>

      {/* ENERGY */}
      <div className="goal-card">
        <h3>⚡ Energy Goals</h3>
        <div className="progress-bar">
          <div
            className="progress-fill energy"
            style={{ width: `${percent(data.energy.value, data.energy.target)}%` }}
          />
        </div>
        <div className="goal-info">
          <span>{percent(data.energy.value, data.energy.target)}%</span>
          <span>{data.energy.value} / {data.energy.target} kWh</span>
        </div>
      </div>

      {/* WATER */}
      <div className="goal-card">
        <h3>💧 Water Goals</h3>
        <div className="progress-bar">
          <div
            className="progress-fill water"
            style={{ width: `${percent(data.water.value, data.water.target)}%` }}
          />
        </div>
        <div className="goal-info">
          <span>{percent(data.water.value, data.water.target)}%</span>
          <span>{data.water.value} / {data.water.target} Litres</span>
        </div>
      </div>

      {/* WASTE */}
      <div className="goal-card">
        <h3>🗑 Waste Goals</h3>
        <div className="progress-bar">
          <div
            className="progress-fill waste"
            style={{ width: `${percent(data.waste.value, data.waste.target)}%` }}
          />
        </div>
        <div className="goal-info">
          <span>{percent(data.waste.value, data.waste.target)}%</span>
          <span>{data.waste.value} / {data.waste.target} kg</span>
        </div>
      </div>

      {/* CARBON */}
      <div className="goal-card">
        <h3>🌿 Carbon Goals</h3>
        <div className="progress-bar">
          <div
            className="progress-fill carbon"
            style={{ width: `${percent(data.carbon.value, data.carbon.target)}%` }}
          />
        </div>
        <div className="goal-info">
          <span>{percent(data.carbon.value, data.carbon.target)}%</span>
          <span>{data.carbon.value} / {data.carbon.target} Tons</span>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="goal-overview">
        <h3>Goal Overview</h3>
        <p>Active Goals: 4</p>
        <p>
          Achieved Goals:{" "}
          {Object.values(data).filter(
            (g) => g.value <= g.target
          ).length}
        </p>
      </div>

      {/* DOWNLOAD */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button className="save-btn" onClick={downloadReport}>
          ⬇ Download Report
        </button>
      </div>
    </div>
  );
}

export default Goals;
