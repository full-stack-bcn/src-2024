#!/usr/bin/env bun

import { db } from "@/db/db";
import { dbGetRecipeById, dbInsertRecipeFromJson } from "@/db/recipes";

const [jsonFilename, username] = process.argv.slice(2);
if (!jsonFilename || !username) {
  console.error(`Usage: create-user.ts <jsonFilename> <username>`);
  process.exit(1);
}
const user = await db.user.findUnique({ where: { username } });
if (user === null) {
  console.error(`Username "${username}" not found.`);
  process.exit(1);
}

const json = await Bun.file(jsonFilename).json();
const newRecipe = await dbInsertRecipeFromJson(json, user.id);
const recipe = await dbGetRecipeById(newRecipe.id);

console.log(recipe);
