const readline = require("readline-sync");
const taskManager = require("./taskManager");

console.log("Welcome to Terminal Task Manager");

while (true) {
  const input = readline
    .question("\nEnter command (type 'help' for options): ")
    .trim();

  switch (input) {
    case "add-task":
      const title = readline.question("Enter task title: ");
      const dueDate = readline.question("Enter due date (YYYY-MM-DD): ");
      taskManager.addTask(title, dueDate);
      break;

    case "list-tasks":
      taskManager.listTasks();
      break;

    case "complete-task":
      const completeId = readline.question(
        "Enter task ID or title to complete: "
      );
      taskManager.completeTask(completeId);
      break;

    case "update-task":
      const updateId = readline.question("Enter task ID or title to update: ");
      const newTitle = readline.question("New title (press enter to skip): ");
      const newDate = readline.question("New due date (press enter to skip): ");
      taskManager.updateTask(updateId, newTitle || null, newDate || null);
      break;

    case "delete-task":
      const deleteId = readline.question("Enter task ID or title to delete: ");
      taskManager.deleteTask(deleteId);
      break;

    case "search-tasks":
      const searchTerm = readline.question(
        "Enter title or due date to search: "
      );
      taskManager.searchTasks(searchTerm);
      break;

    case "help":
      taskManager.showHelp();
      break;

    case "exit":
      console.log("Exiting... Goodbye!");
      process.exit(0);

    default:
      console.log("Unknown command! Type 'help' to see available commands.");
  }
}
