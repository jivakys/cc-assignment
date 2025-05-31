function createFunctionList() {
  let functions = [];

  for (let i = 0; i < 5; i++) {
    functions.push(function () {
      console.log("Index:", i);
    });
  }

  return functions;
}
