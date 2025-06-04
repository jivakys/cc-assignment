const fs = require("fs");
const logFile = "transactions.log";

module.exports = (action) => (req, res, next) => {
  const { readerName } = req.body;
  const id = +req.params.id;
  const books = require("../models/bookModel").readData();
  const book = books.find((b) => b.id === id);

  if (book) {
    const time = new Date().toISOString();
    const log = `[${time}] ${readerName} ${action} "${book.title}"\n`;
    fs.appendFileSync(logFile, log);
  }

  next();
};
