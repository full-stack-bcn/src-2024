
export class Animal {
  #weight: number;

  constructor(weight: number) {
    this.#weight = weight;
  }

  roar() {
    throw new Error(`Animal.roar: don't know how to roar`);
  }

  walk() {
    console.log("An Animal is walking");
  }
}