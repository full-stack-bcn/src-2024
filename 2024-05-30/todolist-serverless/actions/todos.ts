"use server";

import { dbAddTodo, dbDeleteTodo, dbToggleTodoDone } from "@/lib/todos";
import { revalidatePath } from "next/cache";

export async function actionAddTodo(formData: FormData) {
  const whatField = formData.get("what");
  if (whatField === null) {
    throw new Error(`Missing "what" field`);
  }
  const what = whatField.toString();
  await dbAddTodo(what);
  revalidatePath("/");
}

export async function actionToggleTodoDone(id: number) {
  await dbToggleTodoDone(id);
  revalidatePath("/");
}

export async function actionDeleteTodo(id: number) {
  await dbDeleteTodo(id);
  revalidatePath("/");
}
