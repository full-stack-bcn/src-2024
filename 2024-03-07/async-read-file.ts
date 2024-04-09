import { readFile } from "fs/promises";

readFile("bubu.txt")
  .then((buffer) => {
    const filename = buffer.toString();
    return readFile(filename);
  })
  .then((buffer2) => {
    const bookText = buffer2.toString();
    console.log(bookText);
  })
  .catch((e) => {
    console.error("Some operation failed", e);
  });

  