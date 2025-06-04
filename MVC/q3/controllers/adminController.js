const { readData, writeData } = require("../models/bookModel");

exports.addBook = (req, res) => {
  const books = readData();
  const newBook = { ...req.body, id: Date.now(), status: "available" };
  books.push(newBook);
  writeData(books);
  res.status(201).json(newBook);
};

exports.getBooks = (req, res) => res.json(readData());

exports.updateBook = (req, res) => {
  const books = readData();
  const index = books.findIndex((b) => b.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books[index] = { ...books[index], ...req.body };
  writeData(books);
  res.json(books[index]);
};

exports.deleteBook = (req, res) => {
  const books = readData();
  const updated = books.filter((b) => b.id !== +req.params.id);
  if (books.length === updated.length)
    return res.status(404).json({ error: "Book not found" });

  writeData(updated);
  res.json({ message: "Book deleted" });
};
