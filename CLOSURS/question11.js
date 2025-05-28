function outerFunction() {
  let message = "Good Morning";
  return function () {
    console.log(message);
  };
}

const greet = outerFunction();
greet();
