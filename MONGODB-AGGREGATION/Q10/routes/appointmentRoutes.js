const express = require("express");
const appointmentRouter = express.Router();
const AppointmentModel = require("../models/AppointmentModel");

appointmentRouter.post("/appointments", async (req, res) => {
  try {
    const appointment = await AppointmentModel.create(req.body);
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = appointmentRouter;
