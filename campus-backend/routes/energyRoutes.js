const express = require("express");
const router = express.Router();
const Energy = require("../models/Energy");
console.log("🔥 energyRoutes file loaded");

// GET all energy data
router.get("/", async (req, res) => {
  try {
    const data = await Energy.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST energy data
router.post("/", async (req, res) => {
  console.log("✅ POST HIT AAGIDUCHU");
  console.log("📦 BODY:", req.body);

  try {
    const energy = new Energy(req.body);
    await energy.save();
    res.status(201).json(energy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE energy data
router.delete("/:id", async (req, res) => {
  try {
    const deletedData = await Energy.findByIdAndDelete(req.params.id);

    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all energy data
router.get("/", async (req, res) => {
  try {
    const energyData = await Energy.find();
    res.json(energyData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
