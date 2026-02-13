const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
  month: String,
  week: String,
  usage: Number,
  target: Number,
  year: Number,
});

module.exports = mongoose.model("Waste", wasteSchema);
