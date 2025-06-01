function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const original = { name: "Alice", hobbies: ["reading", "traveling"] };
const clone = deepClone(original);

clone.hobbies.push("sports");

console.log(original);
console.log(clone);
