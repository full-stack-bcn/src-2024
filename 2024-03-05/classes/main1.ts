import { Person } from "./Person";

const person1 = new Person("Groucho Marx", 124, true);
const person2 = new Person("Chicco Marx", 121);

person1.setTitle("Mr.");
person2.setTitle("Mrs.");

console.log(person1.title);
person1.title = "Don"; // person1.setTitle("Don");

console.log(person1.toString());
