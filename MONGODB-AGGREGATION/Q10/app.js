const express = require("express");
const connectDB = require("./config/db");
// const appointmentRoutes = require("./routes/appointmentRoutes");
// const analyticsRoutes = require("./routes/analyticsRoutes");
connectDB();
const app = express();
app.use(express.json());

// app.use(appointmentRoutes);
// app.use(analyticsRoutes);

app.listen(8888, () => {
  console.log("Server running on port 8888");
});
