import {
  RecipeIngredientCreateInputSchema,
  RecipeCreateInputSchema,
} from "@/prisma/generated/zod";

import { db } from "@/db/db";
import { z } from "zod";

export const dbInsertRecipeFromJson = async (json: any, userId: string) => {
  const checkedRecipe = RecipeCreateInputSchema.parse({
    ...json.recipe,
    users: {
      create: [
        {
          role: "owner",
          user: { connect: { id: userId } },
        },
      ],
    },
  });

  const newRecipe = await db.recipe.create({ data: checkedRecipe });

  const ingredientsInputs = z.array(RecipeIngredientCreateInputSchema).parse(
    json.ingredients.map(({ amount, name, unit }: any) => ({
      amount,
      ingredient: {
        connectOrCreate: {
          where: { name },
          create: { name, unit },
        },
      },
      recipe: {
        connect: { id: newRecipe.id },
      },
    }))
  );

  for (const ingrInput of ingredientsInputs) {
    await db.recipeIngredient.create({ data: ingrInput });
  }

  return newRecipe;
};

export const dbGetRecipeById = async (recipeId: string) => {
  return await db.recipe.findUnique({
    where: { id: recipeId },
    include: {
      ingredients: {
        include: { ingredient: true },
      },
      users: {
        include: { user: true },
      },
    },
  });
};
