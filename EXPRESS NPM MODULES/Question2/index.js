const express = require("express");
const { courseRouter } = require("./course.route");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/courses", courseRouter);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
