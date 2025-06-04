const express = require("express");
const dishRouter = require("./dish.route");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", dishRouter);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
