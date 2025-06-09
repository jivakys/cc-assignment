const express = require("express");
const { connection } = require("./config/db");
const { loanRouter } = require("./routes/loanRoutes");
const { borrowerRouter } = require("./routes/analyticsRoutes");
const app = express();
const PORT = 8000;

app.use(express.json());

app.use(loanRouter);
app.use(borrowerRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database is Connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running at port ${PORT}`);
});
