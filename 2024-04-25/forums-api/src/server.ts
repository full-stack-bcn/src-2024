import express from "express";
import morgan from "morgan";
import cors from "cors";
import { db } from "./db";
import { setupForumEndpoints } from "./forums";

const app = express();

/* 
GOLDEN RULE of express SERVERS: 
Si tus handlers son async, tiene que poner un try-catch por fuerza!!
Si no, tu servidor se puede morir
*/

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

setupForumEndpoints(app);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Forums API listening on http://localhost:${PORT}`);
});
