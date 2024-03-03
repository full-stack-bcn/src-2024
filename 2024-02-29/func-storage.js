let f = function () {
  return 42;
};

let operators = [
  function (x) {
    return x + 1;
  },
  function (x) {
    return x * 2;
  },
  function (x) {
    return x / 4;
  },
];

let person = {
  name: "Anna",
  sayHi: function () {
    console.log("Hi!");
  },
};

const functionMaker = function (x) {
  return function () {
    return x;
  };
};

const message = function (fn) {
    console.log("Message:", fn());
}

console.log(f());
for (const op of operators) {
  console.log(op(5));
}
person.sayHi();

console.log(functionMaker(50)());
console.log(functionMaker(123)());
message(function () { return "kataclín"; });