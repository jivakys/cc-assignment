const express = require("express");
const ticketRouter = require("./routes/ticketRouter");
const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/tickets", ticketRouter);

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
