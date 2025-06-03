const readline = require("readline");
const { addTask, listTasks, completeTask } = require("./taskManager");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to Terminal Task Manager!");
console.log("Commands: add-task | list-tasks | complete-task | exit\n");

function promptCommand() {
  rl.question("> ", (command) => {
    switch (command.trim()) {
      case "add-task":
        rl.question("Enter task title: ", (title) => {
          rl.question("Enter due date (YYYY-MM-DD): ", (dueDate) => {
            const result = addTask(title.trim(), dueDate.trim());
            console.log(result.message);
            promptCommand();
          });
        });
        break;

      case "list-tasks":
        listTasks();
        promptCommand();
        break;

      case "complete-task":
        rl.question(
          "Enter task ID or title to mark as complete: ",
          (idOrTitle) => {
            const result = completeTask(idOrTitle.trim());
            console.log(result.message);
            promptCommand();
          }
        );
        break;

      case "exit":
        console.log("Goodbye!");
        rl.close();
        break;

      default:
        console.log(
          "Invalid command. Try: add-task | list-tasks | complete-task | exit"
        );
        promptCommand();
    }
  });
}

promptCommand();
