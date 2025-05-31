const library = {
  books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],

  addBook(book) {
    const { title, author, year } = book;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof author !== "string" ||
      !author.trim() ||
      typeof year !== "number" ||
      !Number.isInteger(year)
    ) {
      console.log("Book information is incomplete.");
      return;
    }

    this.books.push({ title: title.trim(), author: author.trim(), year });
    console.log(`Book "${title}" added to the library.`);
  },

  findBookByTitle(title) {
    return this.books.find((book) => book.title === title);
  },

  removeBook(title) {
    const index = this.books.findIndex((book) => book.title === title);

    if (index !== -1) {
      const removed = this.books.splice(index, 1)[0];
      console.log(`Book "${removed.title}" removed.`);
    } else {
      console.log("Book not found.");
    }
  },
};

library.addBook({ author: "George Orwell", year: 1949 });

library.addBook({ title: "1984", author: "George Orwell", year: 1949 });

console.log("Total books:", library.books.length);

library.removeBook("The Hobbit");

console.log("after removal books:", library.books);
