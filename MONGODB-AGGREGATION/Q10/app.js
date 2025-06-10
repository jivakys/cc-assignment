const express = require("express");
const connectDB = require("./config/db");
const appointmentRouter = require("./routes/appointmentRoutes");
const analyticsRouter = require("./routes/analyticsRoutes");
connectDB();
const app = express();
app.use(express.json());

app.use(appointmentRouter);
app.use(analyticsRouter);

app.listen(8888, () => {
  console.log("Server running on port 8888");
});
