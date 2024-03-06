import "./style.css";
import { Todo } from "./todo.ts";

const todos: Todo[] = [
  new Todo("Learn a lot"),
  new Todo("Make more test questions!"),
  new Todo("Learn Javascript", true),
];

declare global {
  var todos: Array<Todo>;
}
globalThis.todos = todos;

const queryElement = <T extends Element>(q: string): T => {
  const elem = document.querySelector<T>(q);
  if (elem === null) {
    throw new Error(`Element with queyr "${q}" not found!`);
  }
  return elem;
};

const form = queryElement<HTMLFormElement>("form");
const inputWhat = queryElement<HTMLInputElement>(
  'form input[type="text"]'
);
const buttonClearChecked = queryElement<HTMLButtonElement>(
  "#clear-checked"
);

const getTodosDiv = (): HTMLElement => queryElement<HTMLDivElement>("#todos");

const renderTodo = (todo: Todo) => {
  const div = document.createElement("div");
  div.classList.add("todo");
  if (todo.done) {
    div.classList.add("done");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;

  const what = document.createElement("div");
  what.classList.add("what");
  what.textContent = todo.what;

  const fill = document.createElement("div");
  fill.classList.add("spacer");

  const removeButton = document.createElement("div");
  removeButton.textContent = "\u00D7";
  removeButton.classList.add("remove");

  div.append(checkbox, what, fill, removeButton);

  div.addEventListener("click", () => {
    todo.toggleDone();
    checkbox.checked = todo.done;
    div.classList.toggle("done");
  });

  removeButton.addEventListener(
    "click",
    (e: MouseEvent) => {
      e.stopPropagation();
      const pos = todos.indexOf(todo);
      todos.splice(pos, 1);
      div.remove();
    }
  );

  return div;
};

const addTodo = (todo: Todo) => {
  const todosDiv = getTodosDiv();
  todos.push(todo);
  todosDiv.append(renderTodo(todo));
};

const render = () => {
  const todosDiv = getTodosDiv();
  todosDiv.textContent = "";
  todosDiv.append(...todos.map(renderTodo));
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    addTodo(new Todo(inputWhat.value));
    inputWhat.value = "";
  });
  buttonClearChecked.addEventListener("click", () => {
    const notChecked = todos.filter((t) => !t.done);
    todos.splice(0, todos.length, ...notChecked);
    render();
  });
  render();
});
