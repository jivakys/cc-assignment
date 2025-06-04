const express = require("express");
const adminRouter = express.Router();
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/adminController");

adminRouter.post("/books", addBook);
adminRouter.get("/books", getBooks);
adminRouter.patch("/books/:id", updateBook);
adminRouter.delete("/books/:id", deleteBook);

module.exports = adminRouter;
