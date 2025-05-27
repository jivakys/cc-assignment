function processProducts(arr) {
  const productnames = arr.map((product) => product.name);
  console.log(productnames);

  arr.forEach((p) => {
    p.price > 50
      ? console.log(`${p.name} is above $50`)
      : console.log(`${p.name} is below $50`);
  });
}

let input = [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 20 },
];

processProducts(input);
