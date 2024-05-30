import { Row } from "@libsql/client";
import { db } from "./db";
import "server-only";

const row2Todo = (row: Row) => ({
  id: row.id as number,
  what: row.what as string,
  done: row.done != 0,
});

export type Todo = ReturnType<typeof row2Todo>;

export const dbGetTodos = async () => {
  const { rows } = await db.execute("select * from todos");
  return rows.map(row2Todo);
};

export const dbAddTodo = async (what: string) => {
  await db.execute({
    sql: "insert into todos (what) values (?)",
    args: [what],
  });
};

export const dbToggleTodoDone = async (id: number) => {
  await db.execute({
    sql: "update todos set done = not done where id = ?",
    args: [id],
  });
};

export const dbDeleteTodo = async (id: number) => {
  await db.execute({
    sql: "delete from todos where id = ?",
    args: [id],
  });
};
