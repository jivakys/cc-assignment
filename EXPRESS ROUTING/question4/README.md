# Dish API - Express.js CRUD Application

---

## Features

- Add a new dish
- Get all dishes
- Get a dish by ID
- Update a dish by ID
- Delete a dish by ID
- Search dishes by full or partial name
- Proper error handling and 404 support

---

## Tech Stack

- Node.js
- Express.js
- File system (`fs`) for JSON-based storage

---

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

- Add New Dish

```bash
POST /dishes
```

- Get All Dishes

```bash
GET /dishes
```

- Get Dish by ID

```bash
POST /dishes/:id
```

- Search Dish by Name (Partial Match Supported)

```bash
GET /dishes/get?name=idly
```

- Update Dish by ID

```bash
PUT /dishes/:id
```

- Delete Dish by ID

```bash
DELETE /dishes/:id
```

- Undefined Routes

```bash
{ "error": "404 Not Found" }

```
