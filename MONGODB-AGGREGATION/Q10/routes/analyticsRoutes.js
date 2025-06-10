const express = require("express");
const analyticsRouter = express.Router();
const AppointmentModel = require("../models/AppointmentModel");
const DoctorModel = require("../models/DoctorModel");
const mongoose = require("mongoose");

analyticsRouter.get(
  "/analytics/doctors-with-appointments",
  async (req, res) => {
    try {
      const data = await AppointmentModel.aggregate([
        { $group: { _id: "$doctorId", totalAppointments: { $sum: 1 } } },
        {
          $lookup: {
            from: "doctors",
            localField: "_id",
            foreignField: "_id",
            as: "doctorInfo",
          },
        },
        { $unwind: "$doctorInfo" },
        {
          $project: {
            _id: 0,
            doctorName: "$doctorInfo.name",
            specialty: "$doctorInfo.specialty",
            totalAppointments: 1,
          },
        },
      ]);
      if (!data.length)
        return res.status(200).json({ message: "No data found" });
      res.status(200).json(data);
    } catch {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

analyticsRouter.get(
  "/analytics/patient-medical-history/:id",
  async (req, res) => {
    try {
      const patientId = new mongoose.Types.ObjectId(req.params.id);
      const data = await AppointmentModel.aggregate([
        { $match: { patientId } },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctor",
          },
        },
        { $unwind: "$doctor" },
        {
          $lookup: {
            from: "patients",
            localField: "patientId",
            foreignField: "_id",
            as: "patient",
          },
        },
        { $unwind: "$patient" },
        {
          $project: {
            _id: 0,
            patientName: "$patient.name",
            medicalHistory: "$patient.medicalHistory",
            doctorName: "$doctor.name",
            specialty: "$doctor.specialty",
            appointmentDate: 1,
            status: 1,
          },
        },
      ]);
      if (!data.length)
        return res.status(200).json({ message: "No data found" });
      res.status(200).json(data);
    } catch {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

analyticsRouter.get("/analytics/top-specialties", async (req, res) => {
  try {
    const data = await AppointmentModel.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },
      {
        $group: {
          _id: "$doctor.specialty",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/cancelled-appointments", async (req, res) => {
  try {
    const data = await AppointmentModel.aggregate([
      {
        $group: {
          _id: "$doctorId",
          total: { $sum: 1 },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          doctorId: "$_id",
          cancelRate: {
            $multiply: [{ $divide: ["$cancelled", "$total"] }, 100],
          },
        },
      },
    ]);
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/monthly-appointments", async (req, res) => {
  try {
    const data = await AppointmentModel.aggregate([
      {
        $group: {
          _id: { $month: "$appointmentDate" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/active-patients", async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const data = await AppointmentModel.aggregate([
      { $match: { appointmentDate: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: "$patientId",
          visitCount: { $sum: 1 },
        },
      },
      { $match: { visitCount: { $gt: 3 } } },
    ]);
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

analyticsRouter.get("/analytics/doctor-availability/:day", async (req, res) => {
  try {
    const day = req.params.day;

    const data = await DoctorModel.aggregate([
      { $unwind: "$availability" },
      { $match: { availability: day } },
      {
        $project: {
          _id: 0,
          name: 1,
          specialty: 1,
          availability: 1,
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
