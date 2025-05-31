const people = [
  {
    name: "Alice",
    address: {
      city: "New York",
      street: { name: "Broadway", number: 123 },
    },
  },
  {
    name: "Bob",
    address: {
      city: "Los Angeles",
      street: { name: "Sunset Boulevard", number: 456 },
    },
  },
];

const arrDestructuring = people.map((ele) => {
  return `${ele.name} lives in ${ele.address["city"]} on ${ele.address["street"]["name"]}`;
});

console.log(arrDestructuring);
