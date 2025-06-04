const { readData } = require("../models/bookModel");

module.exports = (req, res, next) => {
  const id = +req.params.id;
  const book = readData().find((b) => b.id === id);

  if (!book || book.status !== "borrowed") {
    return res.status(400).json({ error: "Book not borrowed or not found." });
  }

  const borrowedDate = new Date(book.borrowedDate);
  const now = new Date();
  const diffDays = Math.floor((now - borrowedDate) / (1000 * 60 * 60 * 24));

  if (diffDays < 3) {
    return res
      .status(400)
      .json({ error: "Book cannot be returned within 3 days of borrowing." });
  }

  next();
};
