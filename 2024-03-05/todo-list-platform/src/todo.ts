
export class Todo {
  what: string;
  done: boolean;

  constructor(what: string, done: boolean = false) {
    this.what = what;
    this.done = done;
  }

  toggleDone() {
    this.done = !this.done;
  }
}

