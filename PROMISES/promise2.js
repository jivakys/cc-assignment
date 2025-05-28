function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Fetched data successfully!");
      } else {
        reject("data not found");
      }
    });
  }, 1000);
}

async function fetchDatahandler() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

fetchDatahandler();
