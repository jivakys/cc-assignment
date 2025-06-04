# Book API - Express.js CRUD Application

---

## Features

- Add a new book
- Get all books
- Get a book by ID
- Update a book by ID
- Delete a book by ID
- Search books by full or partial **author** or **title**
- Proper error handling and 404 support

---

## Tech Stack

- Node.js
- Express.js
- File system (`fs`) for JSON-based storage

---

## Setup

### 1.Install dependencies:

```bash
npm install
```

### 2. Create an empty db.json file:

```bash
[]
```

### 3. Start the server:

```bash
node server.js
```

### 4. Server running at:

```bash
http://localhost:3000

```

## API Endpoints

- Add New Book

```bash
POST /books
```

- Get All Books

```bash
GET /books
```

- Get book by ID

```bash
POST /books/:id
```

- Search Books by Author (Partial Match Supported)

```bash
GET /books/search?author=arvind

```

- Search Books by Title (Partial Match Supported)

```bash
GET /books/search?title=White

```

- Update Book by ID

```bash
PUT /books/:id
```

- Delete Book by ID

```bash
DELETE /books/:id
```

- Undefined Routes

```bash
{ "error": "404 Not Found" }

```
