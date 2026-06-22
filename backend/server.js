const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Event = require("./models/Event");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/events", async (req, res) => {
  try {

    const event = new Event(req.body);

    await event.save();

    res.json({
      success: true,
      message: "Event saved"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });

  }
});

app.get("/sessions", async (req, res) => {
  try {

    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$sessionId",
          totalEvents: { $sum: 1 }
        }
      }
    ]);

    res.json(sessions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });

  }
});

app.get("/sessions/:sessionId", async (req, res) => {
  try {

    const events = await Event.find({
      sessionId: req.params.sessionId
    }).sort({ timestamp: 1 });

    res.json(events);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });

  }
});

app.get("/heatmap", async (req, res) => {
  try {

    const pageUrl = req.query.pageUrl;

    const clicks = await Event.find({
      pageUrl: pageUrl,
      eventType: "click"
    });

    res.json(clicks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });

  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});