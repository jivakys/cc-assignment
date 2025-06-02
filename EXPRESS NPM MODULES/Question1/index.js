const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "db.json");

app.use(express.json());

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.post("/courses", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  const db = readDB();
  const newCourse = {
    id: Date.now(),
    title,
    description,
  };

  db.courses.push(newCourse);
  writeDB(db);

  res
    .status(201)
    .json({ message: "Course added successfully.", course: newCourse });
});

app.get("/courses", (req, res) => {
  const db = readDB();
  res.json(db.courses);
});

app.listen(PORT, () => {
  console.log(`✅ LMS server running at http://localhost:${PORT}`);
});
