function createCounter() {
  let count = 0;

  return {
    increment: () => (count = count + 1),
    getCount: () => count,
  };
}

const counter = createCounter();

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.getCount());
