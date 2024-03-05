import { TodoItem } from "./TodoItem";
import "./style.css";

// Modelo
const todos: TodoItem[] = [
  new TodoItem("Lavar los platos"),
  new TodoItem("Tirar las cajas de pizza"),
  new TodoItem(
    "Preguntas de test para Typescript Básico",
    true
  ),
];

const renderTodoItem = (todo: TodoItem) => {
  const div = document.createElement("div");
  div.classList.add("todo-item");
  if (todo.done) {
    div.classList.add("done");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;

  const text = document.createTextNode(todo.what);

  div.append(checkbox, text);

  div.addEventListener("click", () => {
    todo.toggleDone();
    checkbox.checked = todo.done;
    div.classList.toggle("done");

    console.log(todos);
  });

  return div;
};

const render = () => {
  const todoDiv = document.getElementById("todo-list");
  if (todoDiv === null) {
    throw new Error(`No está el #todo-list en el DOM!`);
  }
  todoDiv.append(...todos.map(renderTodoItem));
};

const input = document.querySelector<HTMLInputElement>(
  'input[type="text"]'
);
const form = document.querySelector("form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const what = input?.value;
  if (input) {
    input.value = "";
  }
  // Alteramos el modelo
  const todo = new TodoItem(what || "error");
  todos.push(todo);
  
  // Alteramos el DOM de la misma manera
  const todoDOM = renderTodoItem(todo);
  document.getElementById("todo-list")?.append(todoDOM);
});

render();
