"use server";

import { dbInsertRecipe } from "@/db/recipes";
import { Prisma } from "@prisma/client";

export async function actionInsertRecipe(recipe: Prisma.RecipeCreateInput) {
  await dbInsertRecipe(recipe);
}
