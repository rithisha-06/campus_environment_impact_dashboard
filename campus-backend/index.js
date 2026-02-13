const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
console.log("🚀 THIS index.js IS RUNNING");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const energyRoutes = require("./routes/energyRoutes");
app.use("/api/energy", energyRoutes);

// mongodb connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

// server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
