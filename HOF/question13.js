function reduceArray(arr) {
  const newArrCount = arr.reduce((acc, val) => {
    if (acc[val] == undefined) {
      acc[val] = 1;
    } else {
      acc[val]++;
    }
    return acc;
  }, {});
  //   console.log(newArrCount);

  const sortedCategory = Object.entries(newArrCount)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  return {
    newArrCount,
    sortedCategory,
  };
}

const Input = [
  "electronics",
  "clothing",
  "electronics",
  "toys",
  "clothing",
  "toys",
  "toys",
];

console.log(reduceArray(Input));
