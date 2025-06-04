const express = require("express");
const readerRouter = express.Router();
const {
  getAvailableBooks,
  borrowBook,
  returnBook,
} = require("../controllers/readerController");
const returnCheck = require("../middlewares/returnCheckMiddleware");
const transactionLogger = require("../middlewares/transactionLogger");

readerRouter.get("/books", getAvailableBooks);
readerRouter.post("/borrow/:id", transactionLogger("borrowed"), borrowBook);
readerRouter.post(
  "/return/:id",
  returnCheck,
  transactionLogger("returned"),
  returnBook
);

module.exports = readerRouter;
