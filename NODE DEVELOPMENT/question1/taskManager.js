const fs = require("fs");
const path = require("path");
const tasksFile = path.join(__dirname, "tasks.json");

// Load tasks
function loadTasks() {
  if (!fs.existsSync(tasksFile)) return [];
  const data = fs.readFileSync(tasksFile, "utf-8");
  return JSON.parse(data || "[]");
}

// Save tasks
function saveTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Add a new task
function addTask(title, dueDate) {
  if (!title || !dueDate) {
    return { success: false, message: "Title and due date are required." };
  }
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    title,
    dueDate,
    status: "pending",
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return { success: true, message: `Task "${title}" added.` };
}

// List all tasks
function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }
  console.log("\nTasks:");
  tasks.forEach((task) => {
    console.log(
      `ID: ${task.id}\nTitle: ${task.title}\nDue: ${task.dueDate}\nStatus: ${task.status}\n`
    );
  });
}

// Complete a task by ID or title
function completeTask(identifier) {
  const tasks = loadTasks();
  const task = tasks.find(
    (t) => t.id.toString() === identifier || t.title === identifier
  );
  if (!task) return { success: false, message: "Task not found." };
  task.status = "completed";
  saveTasks(tasks);
  return {
    success: true,
    message: `Task "${task.title}" marked as completed.`,
  };
}

module.exports = {
  addTask,
  listTasks,
  completeTask,
};
