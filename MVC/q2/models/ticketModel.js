const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const readData = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (tickets) => {
  fs.writeFileSync(dbPath, JSON.stringify(tickets, null, 2));
};

module.exports = { readData, writeData };
