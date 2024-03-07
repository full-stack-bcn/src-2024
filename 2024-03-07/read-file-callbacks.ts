
import { readFile } from "fs";

readFile("bubu.txt", (err, data) => {
  if (err) {
    console.error("No he podido leer el fichero", err);
    return;
  }
  const filename = data.toString();
  readFile(filename, (err, data) => {
    if (err) {
      console.error("No he podido leer el fichero", err);
      return;  
    }
    console.log("Libro = ", data.toString());
  })
});

console.log("The End");