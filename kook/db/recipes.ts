import {
  RecipeIngredientCreateInputSchema,
  RecipeCreateInputSchema,
} from "@/prisma/generated/zod";

import { Prisma } from "@prisma/client";

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

export const dbGetUserRecipes = async (userId: string) => {
  const result = await db.user.findUnique({
    where: { id: userId },
    include: {
      recipes: {
        include: {
          recipe: true,
        },
      },
    },
  });
  if (result === null) {
    throw new Error(`User not found`);
  }

  const { recipes: userRecipes } = result;
  return userRecipes.map((userRecipe) => ({
    role: userRecipe.role,
    ...userRecipe.recipe,
  }));
};

export const dbInsertRecipe = async (recipe: Prisma.RecipeCreateInput) => {
  await db.recipe.create({ data: recipe });
}