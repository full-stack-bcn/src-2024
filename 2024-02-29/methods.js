const sayHi = function () {
  console.log(`Hi! I'm ${this?.name}`);
};

let anna = { name: "Anna", sayHi };
let xavier = { name: "Xavier", sayHi };

// Left Object (yes -> becomes 'this')
anna.sayHi();
xavier.sayHi();
sayHi();

