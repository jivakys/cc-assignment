const checkout = {
  items: [],
  total: 0,

  addItem(item) {
    const price = parseFloat(item.price);

    if (isNaN(price) || typeof price !== "number" || price < 0) {
      console.log(`Invalid price for item "${item.name}".`);
      return;
    }

    this.items.push({ ...item, price });
    this.total += price;

    console.log(`Added "${item.name}" - $${price.toFixed(2)}`);
  },

  getTotal() {
    return `Total: $${this.total.toFixed(2)}`;
  },
};

checkout.addItem({ name: "Coffee Maker", price: "99.95" });
checkout.addItem({ name: "Milk", price: 3.5 });
checkout.addItem({ name: "Broken Item", price: "free" });

console.log(checkout.getTotal());
