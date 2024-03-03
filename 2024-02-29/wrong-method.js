
name = "Belzebú";

const person = {
    name: "Harpo",
    sayHi: () => console.log(`Hi, my name is ${this.name}`),
};

console.log(this);
person.sayHi();