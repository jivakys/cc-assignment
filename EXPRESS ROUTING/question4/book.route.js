const express = require("express");
const bookRouter = express.Router();
const fs = require("fs");

const readDB = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeDB = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
};

bookRouter.post("/books", (req, res) => {
  const books = readDB();
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ error: "Title, author, and year are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    year,
  };

  books.push(newBook);
  writeDB(books);

  res.status(201).json(newBook);
});

bookRouter.get("/books", (req, res) => {
  const books = readDB();
  res.status(200).json(books);
});

bookRouter.get("/books/search", (req, res) => {
  const books = readDB();
  const { author, title } = req.query;

  let results = books;

  if (author) {
    results = results.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    results = results.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.status(200).json(results);
});

bookRouter.get("/books/:id", (req, res) => {
  const books = readDB();
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ error: "Book not found" });

  res.status(200).json(book);
});

bookRouter.put("/books/:id", (req, res) => {
  let books = readDB();
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ error: "Title, author, and year are required" });
  }

  books[index] = { id: books[index].id, title, author, year };
  writeDB(books);

  res.status(200).json(books[index]);
});

bookRouter.delete("/books/:id", (req, res) => {
  let books = readDB();
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const deletedBook = books.splice(index, 1);
  writeDB(books);

  res.status(200).json({ message: "Book deleted", book: deletedBook[0] });
});

module.exports = bookRouter;
