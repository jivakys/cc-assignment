const { readData, writeData } = require("../models/bookModel");

exports.getAvailableBooks = (req, res) => {
  const books = readData().filter((b) => b.status === "available");
  res.json(books);
};

exports.borrowBook = (req, res) => {
  const books = readData();
  const id = +req.params.id;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1 || books[index].status !== "available") {
    return res.status(400).json({ error: "Book not available" });
  }

  books[index].status = "borrowed";
  books[index].borrowedBy = req.body.readerName;
  books[index].borrowedDate = new Date().toISOString();
  writeData(books);
  res.json({ message: "Book borrowed", book: books[index] });
};

exports.returnBook = (req, res) => {
  const books = readData();
  const id = +req.params.id;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books[index].status = "available";
  delete books[index].borrowedBy;
  delete books[index].borrowedDate;
  writeData(books);
  res.json({ message: "Book returned", book: books[index] });
};
