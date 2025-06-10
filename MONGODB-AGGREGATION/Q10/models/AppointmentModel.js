const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  appointmentDate: Date,
  status: String,
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
module.exports = AppointmentModel;
