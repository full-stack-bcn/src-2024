import { db } from "@/lib/db";

const { rows } = await db.execute("select * from todos")
console.log(rows);