const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Use explicit collection name 'Contests' to match your Compass view
module.exports = mongoose.model("Contest", contestSchema, "Contests");
