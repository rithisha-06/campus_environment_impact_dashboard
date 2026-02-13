const mongoose = require("mongoose");

const waterSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  week: {
    type: String,   // optional (weekly report use panna)
  },
  usage: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Water", waterSchema);
