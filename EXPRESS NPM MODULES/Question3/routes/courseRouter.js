const express = require("express");
const courseRouter = express.Router();
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

courseRouter.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.courses);
});

courseRouter.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title?.trim() || !description?.trim()) {
    return res
      .status(400)
      .json({ message: "Title and description cannot be empty." });
  }

  const db = readDB();
  const newCourse = { id: Date.now(), title, description };
  db.courses.push(newCourse);
  writeDB(db);
  res.status(201).json({ message: "Course added.", course: newCourse });
});

courseRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const db = readDB();
  const course = db.courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  if (!title?.trim() && !description?.trim()) {
    return res
      .status(400)
      .json({ message: "Provide title or description to update." });
  }

  if (title) {
    course.title = title;
  }
  if (description) {
    course.description = description;
  }
  writeDB(db);
  res.json({ message: "Course updated.", course });
});

courseRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const index = db.courses.findIndex((c) => c.id === parseInt(id));

  if (index === -1)
    return res.status(404).json({ message: "Course not found." });

  const [deleted] = db.courses.splice(index, 1);
  writeDB(db);
  res.json({ message: `Course "${deleted.title}" deleted.` });
});

courseRouter.get("/search", (req, res) => {
  const { q } = req.query;
  const db = readDB();
  const results = db.courses.filter((c) =>
    c.title.toLowerCase().includes(q?.toLowerCase())
  );
  res.json(results);
});

module.exports = courseRouter;
