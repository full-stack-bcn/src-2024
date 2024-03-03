
let groucho = {
    name: "Groucho",
    sayHi: function () {
        console.log(`Hola, soy ${this?.name}`);
    },
};

groucho.sayHi();

let chicco = { name: "Chicco" };

const f = groucho.sayHi;
f(); // <---- Aquí hay un objeto a la izquierda???? NO...

// Preservar el "binding" explícitamente
const grouchoSayHi = groucho.sayHi.bind(groucho); // Forzar el vínculo devolviendo otra función
grouchoSayHi();

const chiccoSayHi = groucho.sayHi.bind(chicco);
chiccoSayHi();


