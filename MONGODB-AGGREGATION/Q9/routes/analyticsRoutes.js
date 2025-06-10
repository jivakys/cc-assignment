const express = require("express");
const mongoose = require("mongoose");
const analyticsRouter = express.Router();
const Attendance = require("../models/attendance");

analyticsRouter.get("/analytics/total-attendance", async (req, res) => {
  try {
    const data = await Attendance.aggregate([
      { $match: { status: "Present" } },
      { $group: { _id: "$employeeId", presentDays: { $sum: 1 } } },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/attendance-history/:id", async (req, res) => {
  try {
    const employeeId = new mongoose.Types.ObjectId(req.params.id);
    const data = await Attendance.find({ employeeId }).sort({ date: -1 });
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/top-attendees", async (req, res) => {
  try {
    const data = await Attendance.aggregate([
      {
        $group: {
          _id: "$employeeId",
          total: { $sum: 1 },
          present: {
            $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          attendancePercentage: {
            $multiply: [{ $divide: ["$present", "$total"] }, 100],
          },
        },
      },
      { $match: { attendancePercentage: { $gte: 95 } } },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/absent-employees", async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const data = await Attendance.aggregate([
      { $match: { status: "Absent", date: { $gte: startOfMonth } } },
      { $group: { _id: "$employeeId", absentCount: { $sum: 1 } } },
      { $match: { absentCount: { $gt: 5 } } },
    ]);

    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/recent-attendance", async (req, res) => {
  try {
    const data = await Attendance.aggregate([
      { $sort: { date: -1 } },
      {
        $group: {
          _id: "$employeeId",
          recentRecords: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          recentRecords: { $slice: ["$recentRecords", 5] },
        },
      },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = analyticsRouter;
