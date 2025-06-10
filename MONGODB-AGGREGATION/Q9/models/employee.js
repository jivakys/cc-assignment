const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  position: String,
  joiningDate: Date,
});

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = { employeeModel };
