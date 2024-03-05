
import { readFileSync } from "fs";

try {
  const content = readFileSync("blisblas-patapúm.txt");
  console.log(content.length);
} catch (e) {
  console.log("Sintiéndolo mucho, no hemos podido leer su ficherillo");
}
