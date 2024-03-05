
export class Person {
  firstName: string;
  lastName: string;
  age: number;
  married: boolean = false;
  #internalTitle: string = "";

  constructor(fullname: string, age: number, married?: boolean) {
    const parts = fullname.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
    this.age = age;
    if (married) {
      this.married = married;
    }
  }

  sayHi() {
    console.log(`Hi, I'm ${this.firstName}`);
  }

  toString() {
    return `Person{${this.fullName()}, ${this.age}}`;
  }

  fullName() {
    return `${this.#internalTitle ? `${this.#internalTitle} ` : ""}${this.firstName} ${this.lastName}`;
  }

  setTitle(title: string) {
    this.#internalTitle = title;
  }

  getTitle() {
    return this.#internalTitle;
  }

  get title() {
    return this.#internalTitle;
  }

  set title(newTitle: string) {
    this.#internalTitle = `${newTitle}.`;
  }
}

