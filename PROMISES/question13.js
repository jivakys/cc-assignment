const loadTimer = setInterval(() => {
  console.log("Loading...");
}, 1000);

setTimeout(() => {
  clearInterval(loadTimer);
  console.log("Loaded successfully!");
}, 5000);
