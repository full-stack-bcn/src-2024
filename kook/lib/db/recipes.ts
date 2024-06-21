import {
  RecipeIngredientCreateInputSchema,
  RecipesCreateInputSchema,
} from "@/prisma/generated/zod";

import { db } from "@/db/db";
import { z } from "zod";

export const dbInsertRecipeFromJson = async (json: any, userId: string) => {
  const checkedRecipe = RecipesCreateInputSchema.parse({
    ...json.recipe,
    users: {
      create: [
        {
          role: "owner",
          users: { connect: { id: userId } },
        },
      ],
    },
  });

  const newRecipe = await db.recipes.create({ data: checkedRecipe });

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
    await db.recipeIngredient.create({ data: ingrInput });
  }

  return newRecipe;
};

export const dbGetRecipeById = async (recipeId: string) => {
  return await db.recipes.findUnique({
    where: { id: recipeId },
    include: {
      ingredients: {
        include: { ingredients: true },
      },
      users: {
        include: { users: true },
      },
    },
  });
};
