type CallbackFn = (n: number) => void;

const asum = (
  a: number,
  b: number,
  callback: CallbackFn
) => {
  setTimeout(() => callback(a + b), 1000);
};
const amod = (
  a: number,
  b: number,
  callback: CallbackFn
) => {
  setTimeout(() => callback(a % b), 1000);
};
const amul = (
  a: number,
  b: number,
  callback: CallbackFn
) => {
  setTimeout(() => callback(a * b), 1000);
};

// 3 * (4 + 5 % 3)
console.log(3 * (4 + 5 % 3));

amod(5, 3, (res) => {
  asum(res, 4, (res2) => {
    amul(res2, 3, (res3) => {
      console.log(res3);
    });
  });
});

console.log("The End");