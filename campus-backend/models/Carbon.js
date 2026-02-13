const mongoose = require("mongoose");

const carbonSchema = new mongoose.Schema({
  month: String,
  week: String,
  usage: Number,
  target: Number,
  year: Number,
});

module.exports = mongoose.model("Carbon", carbonSchema);
