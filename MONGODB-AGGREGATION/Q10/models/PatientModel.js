const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  medicalHistory: [String],
});

const PatientModel = mongoose.model("Patient", patientSchema);

module.exports = PatientModel;
