function timer(dur, onComplete) {
  setTimeout(() => {
    onComplete(`Timer of ${dur} ms finished`);
  }, dur);
}

timer(2000, (message) => {
  console.log(message);
});
