const express = require("express");
const analyticsRouter = require("./routes/analyticsRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
const { connection } = require("./config/db");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/", attendanceRouter);
app.use("/", analyticsRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database is Connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running at port ${PORT}`);
});
