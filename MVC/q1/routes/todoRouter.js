const express = require("express");
const todoRouter = express.Router();
const {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
} = require("../controllers/todoController");

todoRouter.get("/", getAllTodos);
todoRouter.post("/", addTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.get("/search", searchTodos);

module.exports = todoRouter;
