const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },

  eventType: {
    type: String,
    required: true,
  },

  pageUrl: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },

  x: Number,

  y: Number,
});

module.exports = mongoose.model("Event", eventSchema);