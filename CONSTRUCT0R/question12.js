function createCar(make, model, year) {
  return {
    make,
    model,
    year,
    describeCar() {
      console.log(`This car is a ${this.year} ${this.make} ${this.model}.`);
    },
  };
}

const car = createCar("Toyota", "Camry", 2022);
car.describeCar();
// Output: This car is a 2022 Toyota Camry.
