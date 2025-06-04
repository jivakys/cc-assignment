const express = require("express");
const dishRouter = express.Router();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db.json");

function readDB() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

dishRouter.post("/dishes", (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const dishes = readDB();
  const newDish = {
    id: dishes.length ? dishes[dishes.length - 1].id + 1 : 1,
    name,
    price,
    category,
  };

  dishes.push(newDish);
  writeDB(dishes);

  res.status(201).json(newDish);
});

dishRouter.get("/dishes", (req, res) => {
  const dishes = readDB();
  res.status(200).json(dishes);
});

dishRouter.get("/dishes/get", (req, res) => {
  const { name } = req.query;
  console.log("req=", req.query);

  if (!name) return res.status(400).json({ error: "Name query is required" });

  const dishes = readDB();
  const results = dishes.filter((d) =>
    d.name.toLowerCase().includes(name.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ message: "No dishes found" });
  }

  res.status(200).json(results);
});

dishRouter.get("/dishes/:id", (req, res) => {
  const dishes = readDB();
  const dish = dishes.find((d) => d.id === parseInt(req.params.id));

  if (!dish) return res.status(404).json({ error: "Dish not found" });

  res.status(200).json(dish);
});

dishRouter.put("/dishes/:id", (req, res) => {
  const dishes = readDB();
  const index = dishes.findIndex((d) => d.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "Dish not found" });

  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  dishes[index] = { id: dishes[index].id, name, price, category };
  writeDB(dishes);

  res.status(200).json(dishes[index]);
});

dishRouter.delete("/dishes/:id", (req, res) => {
  const dishes = readDB();
  const index = dishes.findIndex((d) => d.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "Dish not found" });

  const deleted = dishes.splice(index, 1);
  writeDB(dishes);

  res.status(200).json({ message: "Dish deleted", dish: deleted[0] });
});

module.exports = dishRouter;
