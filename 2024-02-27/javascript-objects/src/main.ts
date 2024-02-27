import "./style.css";

function createParagraph(texto: string = "<vacío>") {
  const p = document.createElement("p");
  p.textContent = texto;
  return p;
}

function suma2(a: number, b: number): number {
  return a + b;
}

function createElement(type: string, text: string) {
  const elem = document.createElement(type);
  elem.textContent = text;
  return elem;
}

function muestraMensaje(text: string) {
  console.log("Hay un mensaje:", text);
}

document.body.appendChild(
  createParagraph(
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
   Temporibus iusto eveniet dolorem aut ipsum? Expedita odit, 
   ea modi nulla temporibus sequi ut necessitatibus 
   officia earum molestias porro pariatur maiores et.`
  )
);

document.body.appendChild(createParagraph());

const div = createElement("div", "Oh my God!");
const span = createElement("span", "un trocito");
div.appendChild(span);

document.body.appendChild(div);

// const resultado = muestraMensaje("Hola");
// console.log(resultado);

let agent: Record<string, any> = {
  name: "James",
  lastName: "Bond",
  age: 27,
  married: false,
  "full name": "James Bond",
};

agent.age = 51;
agent.currentMission = "Iran";
delete agent.married;

agent["full name"] = "Jamie Bond";

const field = "name";
agent[field] = "Jamie";

let x = 0.5;
let y = 2.0;

type Coord2D = { x: number; y: number };

let punto2d: Coord2D = { x, y };

console.log(punto2d);

let rectangulo2d: {
  width: number;
  height: number;
  origin?: Coord2D | undefined;
} = {
  width: 100,
  height: 200,
  origin: undefined,
};

console.log(rectangulo2d);
