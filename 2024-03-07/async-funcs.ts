function suma(a, b) {
  return a + b;
}

function asyncSuma(a, b, callbackFunc) {
  const result = a + b;
  setTimeout(() => callbackFunc(result), 3000);
}

console.log("--- Demo begin ---");

console.log("Suma síncrona", suma(1, 2));

asyncSuma(3, 4, (intermedio) => {
  console.log("El resultado es", intermedio);
  asyncSuma(intermedio, 4, (final) => {
    console.log("El resultado final es", final);
  });
});

console.log("--- Demo end ---");