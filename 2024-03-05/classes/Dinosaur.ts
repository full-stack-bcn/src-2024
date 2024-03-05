import { Animal } from "./Animal";

export class Dinosaur extends Animal {
  species: string;

  constructor(species: string, weight: number) {
    super(weight);
    this.species = species;
  }

  roar(): void {
      console.log("ROAAAARRRRR!");
  }

  walk() {
    console.log("A T.Rex is walking");
  }
}