import { Animal } from "./Animal";
import { Dinosaur } from "./Dinosaur";
import { Person } from "./Person";

const dino = new Dinosaur("T. Rex", 1800);
dino.roar();

console.log("dino is Dinosaur", dino instanceof Dinosaur);
console.log("dino is Animal", dino instanceof Animal);
console.log("dino is Person", dino instanceof Person);
console.log("typeof dino es", typeof dino);

function dealWithThing(s: string | number) {
  if (typeof s === "string") {
    console.log("Es un string", s);
  } else if (typeof s === "number") {
    console.log(s + 1);
  }
}
