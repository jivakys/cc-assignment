const express = require("express");
const courseRouter = require("./routes/courseRouter");
const app = express();
const PORT = 6000;

app.use(express.json());
app.use("/courses", courseRouter);

app.get("/", (req, res) => {
  res.send(`<h1> Express App Running </h1>`);
});

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
