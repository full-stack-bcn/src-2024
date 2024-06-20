#!/usr/bin/env bun

import {
  RecipesCreateInputSchema,
  RecipeIngredientCreateInputSchema,
} from "@/prisma/generated/zod";

import { db } from "@/db/db";
import { z } from "zod";

const [jsonFilename] = process.argv.slice(2);
if (!jsonFilename) {
  console.error(`Usage: create-user.ts <jsonFilename>`);
  process.exit(1);
}

const json = await Bun.file("tortilla.json").json();
const checkedRecipe = RecipesCreateInputSchema.parse(json.recipe);

const newRecipe = await db.recipes.create({ data: checkedRecipe });
console.log(newRecipe);

const ingredientsInputs = z.array(RecipeIngredientCreateInputSchema).parse(
  json.ingredients.map(({ amount, name, units }: any) => ({
    amount,
    ingredients: {
      connectOrCreate: {
        where: { name },
        create: { name, units },
      },
    },
    recipes: {
      connect: { id: newRecipe.id },
    },
  }))
);

for (const ingrInput of ingredientsInputs) {
  const newIngr = await db.recipeIngredient.create({ data: ingrInput });
  console.log(newIngr);
}

// Query it already

const recipe = await db.recipes.findUnique({
  where: { id: newRecipe.id },
  include: {
    ingredients: {
      // RecipeIngredient
      include: {
        ingredients: true,
      },
    },
  },
});

console.log(recipe);
