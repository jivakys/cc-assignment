const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "tasks.json");

function loadTasks() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function generateId() {
  return Date.now().toString();
}

function findTask(tasks, identifier) {
  return tasks.find(
    (task) =>
      task.id === identifier ||
      task.title.toLowerCase() === identifier.toLowerCase()
  );
}

module.exports = {
  addTask(title, dueDate) {
    if (!title || !dueDate)
      return console.log("Title and Due Date are required!");

    const tasks = loadTasks();
    const task = { id: generateId(), title, dueDate, status: "pending" };
    tasks.push(task);
    saveTasks(tasks);
    console.log("Task added:", task);
  },

  listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) return console.log("No tasks available.");
    tasks.forEach((task) => {
      console.log(
        `[${task.id}] "${task.title}" | Due: ${task.dueDate} | Status: ${task.status}`
      );
    });
  },

  completeTask(identifier) {
    const tasks = loadTasks();
    const task = findTask(tasks, identifier);
    if (!task) return console.log("Task not found!");
    task.status = "completed";
    saveTasks(tasks);
    console.log(`Task "${task.title}" marked as completed.`);
  },

  updateTask(identifier, newTitle, newDueDate) {
    const tasks = loadTasks();
    const task = findTask(tasks, identifier);
    if (!task) return console.log("Task not found!");

    if (newTitle) task.title = newTitle;
    if (newDueDate) task.dueDate = newDueDate;
    saveTasks(tasks);
    console.log(`Task "${task.id}" updated.`);
  },

  deleteTask(identifier) {
    let tasks = loadTasks();
    const index = tasks.findIndex(
      (task) =>
        task.id === identifier ||
        task.title.toLowerCase() === identifier.toLowerCase()
    );
    if (index === -1) return console.log("Task not found!");
    const [deleted] = tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Task "${deleted.title}" deleted.`);
  },

  searchTasks(query) {
    const tasks = loadTasks();
    const results = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.dueDate.includes(query)
    );
    if (results.length === 0) return console.log("No matching tasks found.");
    results.forEach((task) => {
      console.log(
        `🔍 [${task.id}] "${task.title}" | Due: ${task.dueDate} | Status: ${task.status}`
      );
    });
  },

  showHelp() {
    console.log(`Available Commands:
----------------------------
add-task         → Add a new task
list-tasks       → List all tasks
complete-task    → Mark task as completed
update-task      → Update task's title or due date
delete-task      → Delete a task
search-tasks     → Search tasks by title or due date
help             → Show available commands
exit             → Exit the application
    `);
  },
};
