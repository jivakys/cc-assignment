const { readTodos, writeTodos } = require("../models/todoModel");

let getAllTodos = (req, res) => {
  const todos = readTodos();
  res.json(todos);
};

let addTodo = (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof completed !== "boolean") {
    return res.status(400).json({ message: "Invalid data" });
  }

  const todos = readTodos();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed,
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

let updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  let todos = readTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) todos[index].title = title;
  if (completed !== undefined) todos[index].completed = completed;

  writeTodos(todos);
  res.json(todos[index]);
};

let deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  let todos = readTodos();

  const filtered = todos.filter((t) => t.id !== id);
  if (filtered.length === todos.length) {
    return res.status(404).json({ message: "Todo not found" });
  }

  writeTodos(filtered);
  res.json({ message: "Deleted successfully" });
};

let searchTodos = (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Query required" });

  const todos = readTodos();
  const results = todos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
};
