import { readFile } from "fs/promises";

try {
  const data = await readFile("bubu.txt");
  const filename = data.toString();
  const data2 = await readFile(filename);
  console.log("Libro = ", data2.toString());
} catch (err) {
  console.error("No he podido leer el fichero", err);
}
