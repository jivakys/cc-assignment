const express = require("express");
const app = express();
const logger = require("./middlewares/loggerMiddleware");
const adminRouter = require("./routes/adminRouter");
const readerRouter = require("./routes/readerRouter");

app.use(express.json());
app.use(logger);

app.use("/admin", adminRouter);
app.use("/reader", readerRouter);

app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
