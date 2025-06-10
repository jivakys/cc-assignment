const express = require("express");
const attendanceRouter = express.Router();
const Attendance = require("../models/attendance");

attendanceRouter.post("/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = attendanceRouter;
