const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  availability: [String],
});

const DoctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = DoctorModel;
