const express = require("express");
const todoRouter = require("./routes/todoRouter");
const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/todos", todoRouter);

app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Startup Error:", err);
}
