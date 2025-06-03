# LMS API – Node.js

A simple Learning Management System using Express & JSON file storage.

---

## Setup

```bash
npm install
node index.js
```

## API Endpoints

- GET /courses - Retrieve all courses.

- POST /courses - Create a new course.
  Body Example:

```bash
{
  "title": "Introduction to Backend and Node.js",
  "description": "Learn foundational concepts of backend development and introduce Node.js"
}
```

- PUT /courses/:id - Update a course by ID.
  Body Example:

```bash
{
"title": "Updated Title"
}
```

- DELETE /courses/:id - Delete a course by ID.

- GET /courses/search?q=keyword - Search courses by title.

✅ Example Response

````bash
    {
    "message": "Course added.",
    "course": {
    "id": 1717345643920,
    "title": "Express Basics",
    "description": "Learn routing and middleware"
    }
```
````
