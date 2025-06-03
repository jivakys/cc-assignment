const express = require("express");
const fs = require("fs");
const path = require("path");
const courseRouter = express.Router();

const dbPath = path.join(__dirname, "db.json");

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Create a new course
courseRouter.post("/", (req, res) => {
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

// all courses
courseRouter.get("/", (req, res) => {
  const db = readDB();
  res.json(db.courses);
});

// Update a course
courseRouter.put("/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const { title, description } = req.body;
  const db = readDB();

  const courseIndex = db.courses.findIndex((course) => course.id === courseId);
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found." });
  }

  if (!title && !description) {
    return res
      .status(400)
      .json({ message: "Nothing to update. Provide title or description." });
  }

  if (title) db.courses[courseIndex].title = title;
  if (description) db.courses[courseIndex].description = description;

  writeDB(db);
  res.status(200).json({
    message: "Course updated successfully.",
    course: db.courses[courseIndex],
  });
});

// Delete a course
courseRouter.delete("/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const db = readDB();

  const courseIndex = db.courses.findIndex((course) => course.id === courseId);
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found." });
  }

  const deletedCourse = db.courses.splice(courseIndex, 1)[0];
  writeDB(db);

  res.status(200).json({ message: `Course deleted successfully.` });
});

module.exports = { courseRouter };
