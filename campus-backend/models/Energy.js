const mongoose = require("mongoose");

const energySchema = new mongoose.Schema({
  month: String,
  week: String,
  year: Number,
  usage: Number,
  target: Number
});

module.exports = mongoose.model("Energy", energySchema);
