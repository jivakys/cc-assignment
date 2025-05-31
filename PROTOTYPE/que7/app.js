const { books } = require("./books");

const summaries = books.map((book) => book.getSummary());

console.log("Book Summaries");
summaries.forEach((summary) => console.log(summary));
