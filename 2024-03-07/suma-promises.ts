function sum(a: any, b: any): Promise<number> {
  return new Promise((resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number") {
      reject("Operands must be numbers");
    }
    setTimeout(() => resolve(a + b), 1000); // simulate 1s delay (again)
  });
}

sum(4, 5)
  .then((result) => console.log(result))
  .catch((e) => console.log("Ha fallado la primera"));

// const promise2 = sum("ha", "ho");
// promise2.then((result) => console.log(result));
// promise2.catch((reason) =>
//   console.log("Ha fallao la suma:", reason)
// );
