const suma2 = function (a, b) {
  // tiene 'this'
  return a + b;
};

const arrowSuma2 = (a, b) => a + b; // Math: f(a, b) = a + b

const giveMe42 = () => 42;
const inc = (x) => x + 1;

// console.log(inc(giveMe42()));
// console.log(arrowSuma2(suma2(1, 2), 3));

const max2 = (a, b, c) => {
  const max_ab = Math.max(a, b);
  return Math.max(max_ab, c);
};

person.sayHi();

const makePerson = (name, age) => ({ name, age });
console.log(makePerson("James Bond", 51));

const functionMaker = function (x) {
  return function () {
    return x;
  };
};

const arrowFunctionMaker = (x) => () => x;
