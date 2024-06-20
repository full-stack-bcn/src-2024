import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const RecipesScalarFieldEnumSchema = z.enum(['id','title','description','createdAt','difficulty','prepMinutes','tags','private']);

export const IngredientsScalarFieldEnumSchema = z.enum(['id','name','units']);

export const UsersScalarFieldEnumSchema = z.enum(['id','username','hashedPassword','fullname','createdAt']);

export const RecipeIngredientScalarFieldEnumSchema = z.enum(['amount','recipesId','ingredientsId']);

export const RecipeUserScalarFieldEnumSchema = z.enum(['role','usersId','recipesId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const DifficultySchema = z.enum(['easy','medium','expert']);

export type DifficultyType = `${z.infer<typeof DifficultySchema>}`

export const UnitsSchema = z.enum(['grams','kilograms','millilitres','litres','dimensionless']);

export type UnitsType = `${z.infer<typeof UnitsSchema>}`

export const RoleSchema = z.enum(['owner','editor','viewer']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// RECIPES SCHEMA
/////////////////////////////////////////

export const RecipesSchema = z.object({
  difficulty: DifficultySchema,
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  prepMinutes: z.number().int(),
  tags: z.string().array(),
  private: z.boolean(),
})

export type Recipes = z.infer<typeof RecipesSchema>

/////////////////////////////////////////
// INGREDIENTS SCHEMA
/////////////////////////////////////////

export const IngredientsSchema = z.object({
  units: UnitsSchema,
  id: z.number().int(),
  name: z.string(),
})

export type Ingredients = z.infer<typeof IngredientsSchema>

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const UsersSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  hashedPassword: z.string(),
  fullname: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type Users = z.infer<typeof UsersSchema>

/////////////////////////////////////////
// RECIPE INGREDIENT SCHEMA
/////////////////////////////////////////

export const RecipeIngredientSchema = z.object({
  amount: z.number(),
  recipesId: z.string(),
  ingredientsId: z.number().int(),
})

export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>

/////////////////////////////////////////
// RECIPE USER SCHEMA
/////////////////////////////////////////

export const RecipeUserSchema = z.object({
  role: RoleSchema,
  usersId: z.string(),
  recipesId: z.string(),
})

export type RecipeUser = z.infer<typeof RecipeUserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// RECIPES
//------------------------------------------------------

export const RecipesIncludeSchema: z.ZodType<Prisma.RecipesInclude> = z.object({
  ingredients: z.union([z.boolean(),z.lazy(() => RecipeIngredientFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => RecipeUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RecipesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RecipesArgsSchema: z.ZodType<Prisma.RecipesDefaultArgs> = z.object({
  select: z.lazy(() => RecipesSelectSchema).optional(),
  include: z.lazy(() => RecipesIncludeSchema).optional(),
}).strict();

export const RecipesCountOutputTypeArgsSchema: z.ZodType<Prisma.RecipesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RecipesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RecipesCountOutputTypeSelectSchema: z.ZodType<Prisma.RecipesCountOutputTypeSelect> = z.object({
  ingredients: z.boolean().optional(),
  users: z.boolean().optional(),
}).strict();

export const RecipesSelectSchema: z.ZodType<Prisma.RecipesSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  difficulty: z.boolean().optional(),
  prepMinutes: z.boolean().optional(),
  tags: z.boolean().optional(),
  private: z.boolean().optional(),
  ingredients: z.union([z.boolean(),z.lazy(() => RecipeIngredientFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => RecipeUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RecipesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INGREDIENTS
//------------------------------------------------------

export const IngredientsIncludeSchema: z.ZodType<Prisma.IngredientsInclude> = z.object({
  recipes: z.union([z.boolean(),z.lazy(() => RecipeIngredientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IngredientsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IngredientsArgsSchema: z.ZodType<Prisma.IngredientsDefaultArgs> = z.object({
  select: z.lazy(() => IngredientsSelectSchema).optional(),
  include: z.lazy(() => IngredientsIncludeSchema).optional(),
}).strict();

export const IngredientsCountOutputTypeArgsSchema: z.ZodType<Prisma.IngredientsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => IngredientsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IngredientsCountOutputTypeSelectSchema: z.ZodType<Prisma.IngredientsCountOutputTypeSelect> = z.object({
  recipes: z.boolean().optional(),
}).strict();

export const IngredientsSelectSchema: z.ZodType<Prisma.IngredientsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  units: z.boolean().optional(),
  recipes: z.union([z.boolean(),z.lazy(() => RecipeIngredientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IngredientsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USERS
//------------------------------------------------------

export const UsersIncludeSchema: z.ZodType<Prisma.UsersInclude> = z.object({
  recipes: z.union([z.boolean(),z.lazy(() => RecipeUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UsersArgsSchema: z.ZodType<Prisma.UsersDefaultArgs> = z.object({
  select: z.lazy(() => UsersSelectSchema).optional(),
  include: z.lazy(() => UsersIncludeSchema).optional(),
}).strict();

export const UsersCountOutputTypeArgsSchema: z.ZodType<Prisma.UsersCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UsersCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UsersCountOutputTypeSelectSchema: z.ZodType<Prisma.UsersCountOutputTypeSelect> = z.object({
  recipes: z.boolean().optional(),
}).strict();

export const UsersSelectSchema: z.ZodType<Prisma.UsersSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  hashedPassword: z.boolean().optional(),
  fullname: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  recipes: z.union([z.boolean(),z.lazy(() => RecipeUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RECIPE INGREDIENT
//------------------------------------------------------

export const RecipeIngredientIncludeSchema: z.ZodType<Prisma.RecipeIngredientInclude> = z.object({
  recipes: z.union([z.boolean(),z.lazy(() => RecipesArgsSchema)]).optional(),
  ingredients: z.union([z.boolean(),z.lazy(() => IngredientsArgsSchema)]).optional(),
}).strict()

export const RecipeIngredientArgsSchema: z.ZodType<Prisma.RecipeIngredientDefaultArgs> = z.object({
  select: z.lazy(() => RecipeIngredientSelectSchema).optional(),
  include: z.lazy(() => RecipeIngredientIncludeSchema).optional(),
}).strict();

export const RecipeIngredientSelectSchema: z.ZodType<Prisma.RecipeIngredientSelect> = z.object({
  amount: z.boolean().optional(),
  recipesId: z.boolean().optional(),
  ingredientsId: z.boolean().optional(),
  recipes: z.union([z.boolean(),z.lazy(() => RecipesArgsSchema)]).optional(),
  ingredients: z.union([z.boolean(),z.lazy(() => IngredientsArgsSchema)]).optional(),
}).strict()

// RECIPE USER
//------------------------------------------------------

export const RecipeUserIncludeSchema: z.ZodType<Prisma.RecipeUserInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  recipes: z.union([z.boolean(),z.lazy(() => RecipesArgsSchema)]).optional(),
}).strict()

export const RecipeUserArgsSchema: z.ZodType<Prisma.RecipeUserDefaultArgs> = z.object({
  select: z.lazy(() => RecipeUserSelectSchema).optional(),
  include: z.lazy(() => RecipeUserIncludeSchema).optional(),
}).strict();

export const RecipeUserSelectSchema: z.ZodType<Prisma.RecipeUserSelect> = z.object({
  role: z.boolean().optional(),
  usersId: z.boolean().optional(),
  recipesId: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersArgsSchema)]).optional(),
  recipes: z.union([z.boolean(),z.lazy(() => RecipesArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const RecipesWhereInputSchema: z.ZodType<Prisma.RecipesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecipesWhereInputSchema),z.lazy(() => RecipesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipesWhereInputSchema),z.lazy(() => RecipesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  prepMinutes: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  private: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ingredients: z.lazy(() => RecipeIngredientListRelationFilterSchema).optional(),
  users: z.lazy(() => RecipeUserListRelationFilterSchema).optional()
}).strict();

export const RecipesOrderByWithRelationInputSchema: z.ZodType<Prisma.RecipesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  prepMinutes: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  private: z.lazy(() => SortOrderSchema).optional(),
  ingredients: z.lazy(() => RecipeIngredientOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => RecipeUserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RecipesWhereUniqueInputSchema: z.ZodType<Prisma.RecipesWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RecipesWhereInputSchema),z.lazy(() => RecipesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipesWhereInputSchema),z.lazy(() => RecipesWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  prepMinutes: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  private: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ingredients: z.lazy(() => RecipeIngredientListRelationFilterSchema).optional(),
  users: z.lazy(() => RecipeUserListRelationFilterSchema).optional()
}).strict());

export const RecipesOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecipesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  prepMinutes: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  private: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecipesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecipesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecipesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecipesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecipesSumOrderByAggregateInputSchema).optional()
}).strict();

export const RecipesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecipesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecipesScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipesScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyWithAggregatesFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  prepMinutes: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  private: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const IngredientsWhereInputSchema: z.ZodType<Prisma.IngredientsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IngredientsWhereInputSchema),z.lazy(() => IngredientsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientsWhereInputSchema),z.lazy(() => IngredientsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  units: z.union([ z.lazy(() => EnumUnitsFilterSchema),z.lazy(() => UnitsSchema) ]).optional(),
  recipes: z.lazy(() => RecipeIngredientListRelationFilterSchema).optional()
}).strict();

export const IngredientsOrderByWithRelationInputSchema: z.ZodType<Prisma.IngredientsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  units: z.lazy(() => SortOrderSchema).optional(),
  recipes: z.lazy(() => RecipeIngredientOrderByRelationAggregateInputSchema).optional()
}).strict();

export const IngredientsWhereUniqueInputSchema: z.ZodType<Prisma.IngredientsWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => IngredientsWhereInputSchema),z.lazy(() => IngredientsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientsWhereInputSchema),z.lazy(() => IngredientsWhereInputSchema).array() ]).optional(),
  units: z.union([ z.lazy(() => EnumUnitsFilterSchema),z.lazy(() => UnitsSchema) ]).optional(),
  recipes: z.lazy(() => RecipeIngredientListRelationFilterSchema).optional()
}).strict());

export const IngredientsOrderByWithAggregationInputSchema: z.ZodType<Prisma.IngredientsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  units: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IngredientsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IngredientsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IngredientsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IngredientsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IngredientsSumOrderByAggregateInputSchema).optional()
}).strict();

export const IngredientsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IngredientsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IngredientsScalarWhereWithAggregatesInputSchema),z.lazy(() => IngredientsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientsScalarWhereWithAggregatesInputSchema),z.lazy(() => IngredientsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  units: z.union([ z.lazy(() => EnumUnitsWithAggregatesFilterSchema),z.lazy(() => UnitsSchema) ]).optional(),
}).strict();

export const UsersWhereInputSchema: z.ZodType<Prisma.UsersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  recipes: z.lazy(() => RecipeUserListRelationFilterSchema).optional()
}).strict();

export const UsersOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  recipes: z.lazy(() => RecipeUserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UsersWhereUniqueInputSchema: z.ZodType<Prisma.UsersWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    username: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersWhereInputSchema),z.lazy(() => UsersWhereInputSchema).array() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  recipes: z.lazy(() => RecipeUserListRelationFilterSchema).optional()
}).strict());

export const UsersOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UsersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsersMinOrderByAggregateInputSchema).optional()
}).strict();

export const UsersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hashedPassword: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fullname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RecipeIngredientWhereInputSchema: z.ZodType<Prisma.RecipeIngredientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeIngredientWhereInputSchema),z.lazy(() => RecipeIngredientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeIngredientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeIngredientWhereInputSchema),z.lazy(() => RecipeIngredientWhereInputSchema).array() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ingredientsId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  recipes: z.union([ z.lazy(() => RecipesRelationFilterSchema),z.lazy(() => RecipesWhereInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => IngredientsRelationFilterSchema),z.lazy(() => IngredientsWhereInputSchema) ]).optional(),
}).strict();

export const RecipeIngredientOrderByWithRelationInputSchema: z.ZodType<Prisma.RecipeIngredientOrderByWithRelationInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional(),
  ingredientsId: z.lazy(() => SortOrderSchema).optional(),
  recipes: z.lazy(() => RecipesOrderByWithRelationInputSchema).optional(),
  ingredients: z.lazy(() => IngredientsOrderByWithRelationInputSchema).optional()
}).strict();

export const RecipeIngredientWhereUniqueInputSchema: z.ZodType<Prisma.RecipeIngredientWhereUniqueInput> = z.object({
  recipesId_ingredientsId: z.lazy(() => RecipeIngredientRecipesIdIngredientsIdCompoundUniqueInputSchema)
})
.and(z.object({
  recipesId_ingredientsId: z.lazy(() => RecipeIngredientRecipesIdIngredientsIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RecipeIngredientWhereInputSchema),z.lazy(() => RecipeIngredientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeIngredientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeIngredientWhereInputSchema),z.lazy(() => RecipeIngredientWhereInputSchema).array() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ingredientsId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  recipes: z.union([ z.lazy(() => RecipesRelationFilterSchema),z.lazy(() => RecipesWhereInputSchema) ]).optional(),
  ingredients: z.union([ z.lazy(() => IngredientsRelationFilterSchema),z.lazy(() => IngredientsWhereInputSchema) ]).optional(),
}).strict());

export const RecipeIngredientOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecipeIngredientOrderByWithAggregationInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional(),
  ingredientsId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecipeIngredientCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecipeIngredientAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecipeIngredientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecipeIngredientMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecipeIngredientSumOrderByAggregateInputSchema).optional()
}).strict();

export const RecipeIngredientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecipeIngredientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeIngredientScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipeIngredientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeIngredientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeIngredientScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipeIngredientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ingredientsId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const RecipeUserWhereInputSchema: z.ZodType<Prisma.RecipeUserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeUserWhereInputSchema),z.lazy(() => RecipeUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeUserWhereInputSchema),z.lazy(() => RecipeUserWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  usersId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  recipes: z.union([ z.lazy(() => RecipesRelationFilterSchema),z.lazy(() => RecipesWhereInputSchema) ]).optional(),
}).strict();

export const RecipeUserOrderByWithRelationInputSchema: z.ZodType<Prisma.RecipeUserOrderByWithRelationInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  usersId: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UsersOrderByWithRelationInputSchema).optional(),
  recipes: z.lazy(() => RecipesOrderByWithRelationInputSchema).optional()
}).strict();

export const RecipeUserWhereUniqueInputSchema: z.ZodType<Prisma.RecipeUserWhereUniqueInput> = z.object({
  usersId_recipesId: z.lazy(() => RecipeUserUsersIdRecipesIdCompoundUniqueInputSchema)
})
.and(z.object({
  usersId_recipesId: z.lazy(() => RecipeUserUsersIdRecipesIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RecipeUserWhereInputSchema),z.lazy(() => RecipeUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeUserWhereInputSchema),z.lazy(() => RecipeUserWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  usersId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  users: z.union([ z.lazy(() => UsersRelationFilterSchema),z.lazy(() => UsersWhereInputSchema) ]).optional(),
  recipes: z.union([ z.lazy(() => RecipesRelationFilterSchema),z.lazy(() => RecipesWhereInputSchema) ]).optional(),
}).strict());

export const RecipeUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecipeUserOrderByWithAggregationInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  usersId: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecipeUserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecipeUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecipeUserMinOrderByAggregateInputSchema).optional()
}).strict();

export const RecipeUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecipeUserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeUserScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipeUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeUserScalarWhereWithAggregatesInputSchema),z.lazy(() => RecipeUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  usersId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RecipesCreateInputSchema: z.ZodType<Prisma.RecipesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  difficulty: z.lazy(() => DifficultySchema),
  prepMinutes: z.number().int(),
  tags: z.union([ z.lazy(() => RecipesCreatetagsInputSchema),z.string().array() ]).optional(),
  private: z.boolean().optional(),
  ingredients: z.lazy(() => RecipeIngredientCreateNestedManyWithoutRecipesInputSchema).optional(),
  users: z.lazy(() => RecipeUserCreateNestedManyWithoutRecipesInputSchema).optional()
}).strict();

export const RecipesUncheckedCreateInputSchema: z.ZodType<Prisma.RecipesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  difficulty: z.lazy(() => DifficultySchema),
  prepMinutes: z.number().int(),
  tags: z.union([ z.lazy(() => RecipesCreatetagsInputSchema),z.string().array() ]).optional(),
  private: z.boolean().optional(),
  ingredients: z.lazy(() => RecipeIngredientUncheckedCreateNestedManyWithoutRecipesInputSchema).optional(),
  users: z.lazy(() => RecipeUserUncheckedCreateNestedManyWithoutRecipesInputSchema).optional()
}).strict();

export const RecipesUpdateInputSchema: z.ZodType<Prisma.RecipesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.lazy(() => RecipeIngredientUpdateManyWithoutRecipesNestedInputSchema).optional(),
  users: z.lazy(() => RecipeUserUpdateManyWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipesUncheckedUpdateInputSchema: z.ZodType<Prisma.RecipesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.lazy(() => RecipeIngredientUncheckedUpdateManyWithoutRecipesNestedInputSchema).optional(),
  users: z.lazy(() => RecipeUserUncheckedUpdateManyWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipesCreateManyInputSchema: z.ZodType<Prisma.RecipesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  difficulty: z.lazy(() => DifficultySchema),
  prepMinutes: z.number().int(),
  tags: z.union([ z.lazy(() => RecipesCreatetagsInputSchema),z.string().array() ]).optional(),
  private: z.boolean().optional()
}).strict();

export const RecipesUpdateManyMutationInputSchema: z.ZodType<Prisma.RecipesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RecipesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientsCreateInputSchema: z.ZodType<Prisma.IngredientsCreateInput> = z.object({
  name: z.string(),
  units: z.lazy(() => UnitsSchema),
  recipes: z.lazy(() => RecipeIngredientCreateNestedManyWithoutIngredientsInputSchema).optional()
}).strict();

export const IngredientsUncheckedCreateInputSchema: z.ZodType<Prisma.IngredientsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  units: z.lazy(() => UnitsSchema),
  recipes: z.lazy(() => RecipeIngredientUncheckedCreateNestedManyWithoutIngredientsInputSchema).optional()
}).strict();

export const IngredientsUpdateInputSchema: z.ZodType<Prisma.IngredientsUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  units: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => EnumUnitsFieldUpdateOperationsInputSchema) ]).optional(),
  recipes: z.lazy(() => RecipeIngredientUpdateManyWithoutIngredientsNestedInputSchema).optional()
}).strict();

export const IngredientsUncheckedUpdateInputSchema: z.ZodType<Prisma.IngredientsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  units: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => EnumUnitsFieldUpdateOperationsInputSchema) ]).optional(),
  recipes: z.lazy(() => RecipeIngredientUncheckedUpdateManyWithoutIngredientsNestedInputSchema).optional()
}).strict();

export const IngredientsCreateManyInputSchema: z.ZodType<Prisma.IngredientsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  units: z.lazy(() => UnitsSchema)
}).strict();

export const IngredientsUpdateManyMutationInputSchema: z.ZodType<Prisma.IngredientsUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  units: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => EnumUnitsFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IngredientsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  units: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => EnumUnitsFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersCreateInputSchema: z.ZodType<Prisma.UsersCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  fullname: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  recipes: z.lazy(() => RecipeUserCreateNestedManyWithoutUsersInputSchema).optional()
}).strict();

export const UsersUncheckedCreateInputSchema: z.ZodType<Prisma.UsersUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  fullname: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  recipes: z.lazy(() => RecipeUserUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict();

export const UsersUpdateInputSchema: z.ZodType<Prisma.UsersUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recipes: z.lazy(() => RecipeUserUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict();

export const UsersUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recipes: z.lazy(() => RecipeUserUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict();

export const UsersCreateManyInputSchema: z.ZodType<Prisma.UsersCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  fullname: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UsersUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeIngredientCreateInputSchema: z.ZodType<Prisma.RecipeIngredientCreateInput> = z.object({
  amount: z.number(),
  recipes: z.lazy(() => RecipesCreateNestedOneWithoutIngredientsInputSchema),
  ingredients: z.lazy(() => IngredientsCreateNestedOneWithoutRecipesInputSchema)
}).strict();

export const RecipeIngredientUncheckedCreateInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedCreateInput> = z.object({
  amount: z.number(),
  recipesId: z.string(),
  ingredientsId: z.number().int()
}).strict();

export const RecipeIngredientUpdateInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recipes: z.lazy(() => RecipesUpdateOneRequiredWithoutIngredientsNestedInputSchema).optional(),
  ingredients: z.lazy(() => IngredientsUpdateOneRequiredWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipeIngredientUncheckedUpdateInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredientsId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeIngredientCreateManyInputSchema: z.ZodType<Prisma.RecipeIngredientCreateManyInput> = z.object({
  amount: z.number(),
  recipesId: z.string(),
  ingredientsId: z.number().int()
}).strict();

export const RecipeIngredientUpdateManyMutationInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyMutationInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeIngredientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateManyInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ingredientsId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeUserCreateInputSchema: z.ZodType<Prisma.RecipeUserCreateInput> = z.object({
  role: z.lazy(() => RoleSchema),
  users: z.lazy(() => UsersCreateNestedOneWithoutRecipesInputSchema),
  recipes: z.lazy(() => RecipesCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const RecipeUserUncheckedCreateInputSchema: z.ZodType<Prisma.RecipeUserUncheckedCreateInput> = z.object({
  role: z.lazy(() => RoleSchema),
  usersId: z.string(),
  recipesId: z.string()
}).strict();

export const RecipeUserUpdateInputSchema: z.ZodType<Prisma.RecipeUserUpdateInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutRecipesNestedInputSchema).optional(),
  recipes: z.lazy(() => RecipesUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const RecipeUserUncheckedUpdateInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  usersId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeUserCreateManyInputSchema: z.ZodType<Prisma.RecipeUserCreateManyInput> = z.object({
  role: z.lazy(() => RoleSchema),
  usersId: z.string(),
  recipesId: z.string()
}).strict();

export const RecipeUserUpdateManyMutationInputSchema: z.ZodType<Prisma.RecipeUserUpdateManyMutationInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateManyInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  usersId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnumDifficultyFilterSchema: z.ZodType<Prisma.EnumDifficultyFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const RecipeIngredientListRelationFilterSchema: z.ZodType<Prisma.RecipeIngredientListRelationFilter> = z.object({
  every: z.lazy(() => RecipeIngredientWhereInputSchema).optional(),
  some: z.lazy(() => RecipeIngredientWhereInputSchema).optional(),
  none: z.lazy(() => RecipeIngredientWhereInputSchema).optional()
}).strict();

export const RecipeUserListRelationFilterSchema: z.ZodType<Prisma.RecipeUserListRelationFilter> = z.object({
  every: z.lazy(() => RecipeUserWhereInputSchema).optional(),
  some: z.lazy(() => RecipeUserWhereInputSchema).optional(),
  none: z.lazy(() => RecipeUserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const RecipeIngredientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RecipeIngredientOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipeUserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RecipeUserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipesCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecipesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  prepMinutes: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  private: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecipesAvgOrderByAggregateInput> = z.object({
  prepMinutes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RecipesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  prepMinutes: z.lazy(() => SortOrderSchema).optional(),
  private: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipesMinOrderByAggregateInputSchema: z.ZodType<Prisma.RecipesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  prepMinutes: z.lazy(() => SortOrderSchema).optional(),
  private: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipesSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecipesSumOrderByAggregateInput> = z.object({
  prepMinutes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumDifficultyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDifficultyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumUnitsFilterSchema: z.ZodType<Prisma.EnumUnitsFilter> = z.object({
  equals: z.lazy(() => UnitsSchema).optional(),
  in: z.lazy(() => UnitsSchema).array().optional(),
  notIn: z.lazy(() => UnitsSchema).array().optional(),
  not: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => NestedEnumUnitsFilterSchema) ]).optional(),
}).strict();

export const IngredientsCountOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  units: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  units: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientsMinOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  units: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IngredientsSumOrderByAggregateInputSchema: z.ZodType<Prisma.IngredientsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUnitsWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUnitsWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UnitsSchema).optional(),
  in: z.lazy(() => UnitsSchema).array().optional(),
  notIn: z.lazy(() => UnitsSchema).array().optional(),
  not: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => NestedEnumUnitsWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUnitsFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUnitsFilterSchema).optional()
}).strict();

export const UsersCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  hashedPassword: z.lazy(() => SortOrderSchema).optional(),
  fullname: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const RecipesRelationFilterSchema: z.ZodType<Prisma.RecipesRelationFilter> = z.object({
  is: z.lazy(() => RecipesWhereInputSchema).optional(),
  isNot: z.lazy(() => RecipesWhereInputSchema).optional()
}).strict();

export const IngredientsRelationFilterSchema: z.ZodType<Prisma.IngredientsRelationFilter> = z.object({
  is: z.lazy(() => IngredientsWhereInputSchema).optional(),
  isNot: z.lazy(() => IngredientsWhereInputSchema).optional()
}).strict();

export const RecipeIngredientRecipesIdIngredientsIdCompoundUniqueInputSchema: z.ZodType<Prisma.RecipeIngredientRecipesIdIngredientsIdCompoundUniqueInput> = z.object({
  recipesId: z.string(),
  ingredientsId: z.number()
}).strict();

export const RecipeIngredientCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeIngredientCountOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional(),
  ingredientsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipeIngredientAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeIngredientAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  ingredientsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipeIngredientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeIngredientMaxOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional(),
  ingredientsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipeIngredientMinOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeIngredientMinOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional(),
  ingredientsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipeIngredientSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeIngredientSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  ingredientsId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const UsersRelationFilterSchema: z.ZodType<Prisma.UsersRelationFilter> = z.object({
  is: z.lazy(() => UsersWhereInputSchema).optional(),
  isNot: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const RecipeUserUsersIdRecipesIdCompoundUniqueInputSchema: z.ZodType<Prisma.RecipeUserUsersIdRecipesIdCompoundUniqueInput> = z.object({
  usersId: z.string(),
  recipesId: z.string()
}).strict();

export const RecipeUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeUserCountOrderByAggregateInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  usersId: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipeUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeUserMaxOrderByAggregateInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  usersId: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecipeUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.RecipeUserMinOrderByAggregateInput> = z.object({
  role: z.lazy(() => SortOrderSchema).optional(),
  usersId: z.lazy(() => SortOrderSchema).optional(),
  recipesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const RecipesCreatetagsInputSchema: z.ZodType<Prisma.RecipesCreatetagsInput> = z.object({
  set: z.string().array()
}).strict();

export const RecipeIngredientCreateNestedManyWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientCreateNestedManyWithoutRecipesInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyRecipesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserCreateNestedManyWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserCreateNestedManyWithoutRecipesInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyRecipesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecipeIngredientUncheckedCreateNestedManyWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedCreateNestedManyWithoutRecipesInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyRecipesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserUncheckedCreateNestedManyWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUncheckedCreateNestedManyWithoutRecipesInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyRecipesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumDifficultyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDifficultyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DifficultySchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RecipesUpdatetagsInputSchema: z.ZodType<Prisma.RecipesUpdatetagsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const RecipeIngredientUpdateManyWithoutRecipesNestedInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyWithoutRecipesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyRecipesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutRecipesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeIngredientScalarWhereInputSchema),z.lazy(() => RecipeIngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserUpdateManyWithoutRecipesNestedInputSchema: z.ZodType<Prisma.RecipeUserUpdateManyWithoutRecipesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyRecipesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeUserUpdateManyWithWhereWithoutRecipesInputSchema),z.lazy(() => RecipeUserUpdateManyWithWhereWithoutRecipesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeUserScalarWhereInputSchema),z.lazy(() => RecipeUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipeIngredientUncheckedUpdateManyWithoutRecipesNestedInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateManyWithoutRecipesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyRecipesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutRecipesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeIngredientScalarWhereInputSchema),z.lazy(() => RecipeIngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserUncheckedUpdateManyWithoutRecipesNestedInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateManyWithoutRecipesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutRecipesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyRecipesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutRecipesInputSchema),z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutRecipesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeUserUpdateManyWithWhereWithoutRecipesInputSchema),z.lazy(() => RecipeUserUpdateManyWithWhereWithoutRecipesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeUserScalarWhereInputSchema),z.lazy(() => RecipeUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipeIngredientCreateNestedManyWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientCreateNestedManyWithoutIngredientsInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyIngredientsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecipeIngredientUncheckedCreateNestedManyWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedCreateNestedManyWithoutIngredientsInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyIngredientsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumUnitsFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUnitsFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UnitsSchema).optional()
}).strict();

export const RecipeIngredientUpdateManyWithoutIngredientsNestedInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyWithoutIngredientsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutIngredientsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyIngredientsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutIngredientsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutIngredientsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeIngredientScalarWhereInputSchema),z.lazy(() => RecipeIngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipeIngredientUncheckedUpdateManyWithoutIngredientsNestedInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateManyWithoutIngredientsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema).array(),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUpsertWithWhereUniqueWithoutIngredientsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeIngredientCreateManyIngredientsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeIngredientWhereUniqueInputSchema),z.lazy(() => RecipeIngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUpdateWithWhereUniqueWithoutIngredientsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUpdateManyWithWhereWithoutIngredientsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeIngredientScalarWhereInputSchema),z.lazy(() => RecipeIngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateWithoutUsersInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateWithoutUsersInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyUsersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RecipeUserUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateWithoutUsersInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeUserUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RecipeUserUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeUserScalarWhereInputSchema),z.lazy(() => RecipeUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipeUserUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateWithoutUsersInputSchema).array(),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RecipeUserCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RecipeUserUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeUserCreateManyUsersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeUserWhereUniqueInputSchema),z.lazy(() => RecipeUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RecipeUserUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeUserUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RecipeUserUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeUserScalarWhereInputSchema),z.lazy(() => RecipeUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecipesCreateNestedOneWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesCreateNestedOneWithoutIngredientsInput> = z.object({
  create: z.union([ z.lazy(() => RecipesCreateWithoutIngredientsInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutIngredientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipesCreateOrConnectWithoutIngredientsInputSchema).optional(),
  connect: z.lazy(() => RecipesWhereUniqueInputSchema).optional()
}).strict();

export const IngredientsCreateNestedOneWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsCreateNestedOneWithoutRecipesInput> = z.object({
  create: z.union([ z.lazy(() => IngredientsCreateWithoutRecipesInputSchema),z.lazy(() => IngredientsUncheckedCreateWithoutRecipesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IngredientsCreateOrConnectWithoutRecipesInputSchema).optional(),
  connect: z.lazy(() => IngredientsWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RecipesUpdateOneRequiredWithoutIngredientsNestedInputSchema: z.ZodType<Prisma.RecipesUpdateOneRequiredWithoutIngredientsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipesCreateWithoutIngredientsInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutIngredientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipesCreateOrConnectWithoutIngredientsInputSchema).optional(),
  upsert: z.lazy(() => RecipesUpsertWithoutIngredientsInputSchema).optional(),
  connect: z.lazy(() => RecipesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RecipesUpdateToOneWithWhereWithoutIngredientsInputSchema),z.lazy(() => RecipesUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipesUncheckedUpdateWithoutIngredientsInputSchema) ]).optional(),
}).strict();

export const IngredientsUpdateOneRequiredWithoutRecipesNestedInputSchema: z.ZodType<Prisma.IngredientsUpdateOneRequiredWithoutRecipesNestedInput> = z.object({
  create: z.union([ z.lazy(() => IngredientsCreateWithoutRecipesInputSchema),z.lazy(() => IngredientsUncheckedCreateWithoutRecipesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IngredientsCreateOrConnectWithoutRecipesInputSchema).optional(),
  upsert: z.lazy(() => IngredientsUpsertWithoutRecipesInputSchema).optional(),
  connect: z.lazy(() => IngredientsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IngredientsUpdateToOneWithWhereWithoutRecipesInputSchema),z.lazy(() => IngredientsUpdateWithoutRecipesInputSchema),z.lazy(() => IngredientsUncheckedUpdateWithoutRecipesInputSchema) ]).optional(),
}).strict();

export const UsersCreateNestedOneWithoutRecipesInputSchema: z.ZodType<Prisma.UsersCreateNestedOneWithoutRecipesInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRecipesInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRecipesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRecipesInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional()
}).strict();

export const RecipesCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.RecipesCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RecipesCreateWithoutUsersInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipesCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RecipesWhereUniqueInputSchema).optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const UsersUpdateOneRequiredWithoutRecipesNestedInputSchema: z.ZodType<Prisma.UsersUpdateOneRequiredWithoutRecipesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersCreateWithoutRecipesInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRecipesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UsersCreateOrConnectWithoutRecipesInputSchema).optional(),
  upsert: z.lazy(() => UsersUpsertWithoutRecipesInputSchema).optional(),
  connect: z.lazy(() => UsersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UsersUpdateToOneWithWhereWithoutRecipesInputSchema),z.lazy(() => UsersUpdateWithoutRecipesInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRecipesInputSchema) ]).optional(),
}).strict();

export const RecipesUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.RecipesUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipesCreateWithoutUsersInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipesCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => RecipesUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RecipesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RecipesUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => RecipesUpdateWithoutUsersInputSchema),z.lazy(() => RecipesUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDifficultyFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumDifficultyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumUnitsFilterSchema: z.ZodType<Prisma.NestedEnumUnitsFilter> = z.object({
  equals: z.lazy(() => UnitsSchema).optional(),
  in: z.lazy(() => UnitsSchema).array().optional(),
  notIn: z.lazy(() => UnitsSchema).array().optional(),
  not: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => NestedEnumUnitsFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUnitsWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUnitsWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UnitsSchema).optional(),
  in: z.lazy(() => UnitsSchema).array().optional(),
  notIn: z.lazy(() => UnitsSchema).array().optional(),
  not: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => NestedEnumUnitsWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUnitsFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUnitsFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const RecipeIngredientCreateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientCreateWithoutRecipesInput> = z.object({
  amount: z.number(),
  ingredients: z.lazy(() => IngredientsCreateNestedOneWithoutRecipesInputSchema)
}).strict();

export const RecipeIngredientUncheckedCreateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedCreateWithoutRecipesInput> = z.object({
  amount: z.number(),
  ingredientsId: z.number().int()
}).strict();

export const RecipeIngredientCreateOrConnectWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientCreateOrConnectWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeIngredientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeIngredientCreateManyRecipesInputEnvelopeSchema: z.ZodType<Prisma.RecipeIngredientCreateManyRecipesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecipeIngredientCreateManyRecipesInputSchema),z.lazy(() => RecipeIngredientCreateManyRecipesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RecipeUserCreateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserCreateWithoutRecipesInput> = z.object({
  role: z.lazy(() => RoleSchema),
  users: z.lazy(() => UsersCreateNestedOneWithoutRecipesInputSchema)
}).strict();

export const RecipeUserUncheckedCreateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUncheckedCreateWithoutRecipesInput> = z.object({
  role: z.lazy(() => RoleSchema),
  usersId: z.string()
}).strict();

export const RecipeUserCreateOrConnectWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserCreateOrConnectWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeUserCreateManyRecipesInputEnvelopeSchema: z.ZodType<Prisma.RecipeUserCreateManyRecipesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecipeUserCreateManyRecipesInputSchema),z.lazy(() => RecipeUserCreateManyRecipesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RecipeIngredientUpsertWithWhereUniqueWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUpsertWithWhereUniqueWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeIngredientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecipeIngredientUpdateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedUpdateWithoutRecipesInputSchema) ]),
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeIngredientUpdateWithWhereUniqueWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateWithWhereUniqueWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeIngredientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecipeIngredientUpdateWithoutRecipesInputSchema),z.lazy(() => RecipeIngredientUncheckedUpdateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeIngredientUpdateManyWithWhereWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyWithWhereWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeIngredientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecipeIngredientUpdateManyMutationInputSchema),z.lazy(() => RecipeIngredientUncheckedUpdateManyWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeIngredientScalarWhereInputSchema: z.ZodType<Prisma.RecipeIngredientScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeIngredientScalarWhereInputSchema),z.lazy(() => RecipeIngredientScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeIngredientScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeIngredientScalarWhereInputSchema),z.lazy(() => RecipeIngredientScalarWhereInputSchema).array() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ingredientsId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const RecipeUserUpsertWithWhereUniqueWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUpsertWithWhereUniqueWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecipeUserUpdateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedUpdateWithoutRecipesInputSchema) ]),
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeUserUpdateWithWhereUniqueWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUpdateWithWhereUniqueWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecipeUserUpdateWithoutRecipesInputSchema),z.lazy(() => RecipeUserUncheckedUpdateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeUserUpdateManyWithWhereWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUpdateManyWithWhereWithoutRecipesInput> = z.object({
  where: z.lazy(() => RecipeUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecipeUserUpdateManyMutationInputSchema),z.lazy(() => RecipeUserUncheckedUpdateManyWithoutRecipesInputSchema) ]),
}).strict();

export const RecipeUserScalarWhereInputSchema: z.ZodType<Prisma.RecipeUserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecipeUserScalarWhereInputSchema),z.lazy(() => RecipeUserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeUserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeUserScalarWhereInputSchema),z.lazy(() => RecipeUserScalarWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  usersId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RecipeIngredientCreateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientCreateWithoutIngredientsInput> = z.object({
  amount: z.number(),
  recipes: z.lazy(() => RecipesCreateNestedOneWithoutIngredientsInputSchema)
}).strict();

export const RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedCreateWithoutIngredientsInput> = z.object({
  amount: z.number(),
  recipesId: z.string()
}).strict();

export const RecipeIngredientCreateOrConnectWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientCreateOrConnectWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipeIngredientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema) ]),
}).strict();

export const RecipeIngredientCreateManyIngredientsInputEnvelopeSchema: z.ZodType<Prisma.RecipeIngredientCreateManyIngredientsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecipeIngredientCreateManyIngredientsInputSchema),z.lazy(() => RecipeIngredientCreateManyIngredientsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RecipeIngredientUpsertWithWhereUniqueWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUpsertWithWhereUniqueWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipeIngredientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecipeIngredientUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedUpdateWithoutIngredientsInputSchema) ]),
  create: z.union([ z.lazy(() => RecipeIngredientCreateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedCreateWithoutIngredientsInputSchema) ]),
}).strict();

export const RecipeIngredientUpdateWithWhereUniqueWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateWithWhereUniqueWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipeIngredientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecipeIngredientUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipeIngredientUncheckedUpdateWithoutIngredientsInputSchema) ]),
}).strict();

export const RecipeIngredientUpdateManyWithWhereWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyWithWhereWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipeIngredientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecipeIngredientUpdateManyMutationInputSchema),z.lazy(() => RecipeIngredientUncheckedUpdateManyWithoutIngredientsInputSchema) ]),
}).strict();

export const RecipeUserCreateWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserCreateWithoutUsersInput> = z.object({
  role: z.lazy(() => RoleSchema),
  recipes: z.lazy(() => RecipesCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const RecipeUserUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUncheckedCreateWithoutUsersInput> = z.object({
  role: z.lazy(() => RoleSchema),
  recipesId: z.string()
}).strict();

export const RecipeUserCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RecipeUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const RecipeUserCreateManyUsersInputEnvelopeSchema: z.ZodType<Prisma.RecipeUserCreateManyUsersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecipeUserCreateManyUsersInputSchema),z.lazy(() => RecipeUserCreateManyUsersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RecipeUserUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RecipeUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecipeUserUpdateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RecipeUserCreateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const RecipeUserUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RecipeUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecipeUserUpdateWithoutUsersInputSchema),z.lazy(() => RecipeUserUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const RecipeUserUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RecipeUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecipeUserUpdateManyMutationInputSchema),z.lazy(() => RecipeUserUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const RecipesCreateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesCreateWithoutIngredientsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  difficulty: z.lazy(() => DifficultySchema),
  prepMinutes: z.number().int(),
  tags: z.union([ z.lazy(() => RecipesCreatetagsInputSchema),z.string().array() ]).optional(),
  private: z.boolean().optional(),
  users: z.lazy(() => RecipeUserCreateNestedManyWithoutRecipesInputSchema).optional()
}).strict();

export const RecipesUncheckedCreateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesUncheckedCreateWithoutIngredientsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  difficulty: z.lazy(() => DifficultySchema),
  prepMinutes: z.number().int(),
  tags: z.union([ z.lazy(() => RecipesCreatetagsInputSchema),z.string().array() ]).optional(),
  private: z.boolean().optional(),
  users: z.lazy(() => RecipeUserUncheckedCreateNestedManyWithoutRecipesInputSchema).optional()
}).strict();

export const RecipesCreateOrConnectWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesCreateOrConnectWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipesCreateWithoutIngredientsInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutIngredientsInputSchema) ]),
}).strict();

export const IngredientsCreateWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsCreateWithoutRecipesInput> = z.object({
  name: z.string(),
  units: z.lazy(() => UnitsSchema)
}).strict();

export const IngredientsUncheckedCreateWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsUncheckedCreateWithoutRecipesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  units: z.lazy(() => UnitsSchema)
}).strict();

export const IngredientsCreateOrConnectWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsCreateOrConnectWithoutRecipesInput> = z.object({
  where: z.lazy(() => IngredientsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IngredientsCreateWithoutRecipesInputSchema),z.lazy(() => IngredientsUncheckedCreateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipesUpsertWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesUpsertWithoutIngredientsInput> = z.object({
  update: z.union([ z.lazy(() => RecipesUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipesUncheckedUpdateWithoutIngredientsInputSchema) ]),
  create: z.union([ z.lazy(() => RecipesCreateWithoutIngredientsInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutIngredientsInputSchema) ]),
  where: z.lazy(() => RecipesWhereInputSchema).optional()
}).strict();

export const RecipesUpdateToOneWithWhereWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesUpdateToOneWithWhereWithoutIngredientsInput> = z.object({
  where: z.lazy(() => RecipesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RecipesUpdateWithoutIngredientsInputSchema),z.lazy(() => RecipesUncheckedUpdateWithoutIngredientsInputSchema) ]),
}).strict();

export const RecipesUpdateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesUpdateWithoutIngredientsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => RecipeUserUpdateManyWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipesUncheckedUpdateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipesUncheckedUpdateWithoutIngredientsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => RecipeUserUncheckedUpdateManyWithoutRecipesNestedInputSchema).optional()
}).strict();

export const IngredientsUpsertWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsUpsertWithoutRecipesInput> = z.object({
  update: z.union([ z.lazy(() => IngredientsUpdateWithoutRecipesInputSchema),z.lazy(() => IngredientsUncheckedUpdateWithoutRecipesInputSchema) ]),
  create: z.union([ z.lazy(() => IngredientsCreateWithoutRecipesInputSchema),z.lazy(() => IngredientsUncheckedCreateWithoutRecipesInputSchema) ]),
  where: z.lazy(() => IngredientsWhereInputSchema).optional()
}).strict();

export const IngredientsUpdateToOneWithWhereWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsUpdateToOneWithWhereWithoutRecipesInput> = z.object({
  where: z.lazy(() => IngredientsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IngredientsUpdateWithoutRecipesInputSchema),z.lazy(() => IngredientsUncheckedUpdateWithoutRecipesInputSchema) ]),
}).strict();

export const IngredientsUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsUpdateWithoutRecipesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  units: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => EnumUnitsFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IngredientsUncheckedUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.IngredientsUncheckedUpdateWithoutRecipesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  units: z.union([ z.lazy(() => UnitsSchema),z.lazy(() => EnumUnitsFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersCreateWithoutRecipesInputSchema: z.ZodType<Prisma.UsersCreateWithoutRecipesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  fullname: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UsersUncheckedCreateWithoutRecipesInputSchema: z.ZodType<Prisma.UsersUncheckedCreateWithoutRecipesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  hashedPassword: z.string(),
  fullname: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UsersCreateOrConnectWithoutRecipesInputSchema: z.ZodType<Prisma.UsersCreateOrConnectWithoutRecipesInput> = z.object({
  where: z.lazy(() => UsersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersCreateWithoutRecipesInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRecipesInputSchema) ]),
}).strict();

export const RecipesCreateWithoutUsersInputSchema: z.ZodType<Prisma.RecipesCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  difficulty: z.lazy(() => DifficultySchema),
  prepMinutes: z.number().int(),
  tags: z.union([ z.lazy(() => RecipesCreatetagsInputSchema),z.string().array() ]).optional(),
  private: z.boolean().optional(),
  ingredients: z.lazy(() => RecipeIngredientCreateNestedManyWithoutRecipesInputSchema).optional()
}).strict();

export const RecipesUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RecipesUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  difficulty: z.lazy(() => DifficultySchema),
  prepMinutes: z.number().int(),
  tags: z.union([ z.lazy(() => RecipesCreatetagsInputSchema),z.string().array() ]).optional(),
  private: z.boolean().optional(),
  ingredients: z.lazy(() => RecipeIngredientUncheckedCreateNestedManyWithoutRecipesInputSchema).optional()
}).strict();

export const RecipesCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RecipesCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RecipesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipesCreateWithoutUsersInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UsersUpsertWithoutRecipesInputSchema: z.ZodType<Prisma.UsersUpsertWithoutRecipesInput> = z.object({
  update: z.union([ z.lazy(() => UsersUpdateWithoutRecipesInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRecipesInputSchema) ]),
  create: z.union([ z.lazy(() => UsersCreateWithoutRecipesInputSchema),z.lazy(() => UsersUncheckedCreateWithoutRecipesInputSchema) ]),
  where: z.lazy(() => UsersWhereInputSchema).optional()
}).strict();

export const UsersUpdateToOneWithWhereWithoutRecipesInputSchema: z.ZodType<Prisma.UsersUpdateToOneWithWhereWithoutRecipesInput> = z.object({
  where: z.lazy(() => UsersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UsersUpdateWithoutRecipesInputSchema),z.lazy(() => UsersUncheckedUpdateWithoutRecipesInputSchema) ]),
}).strict();

export const UsersUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.UsersUpdateWithoutRecipesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersUncheckedUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.UsersUncheckedUpdateWithoutRecipesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashedPassword: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fullname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipesUpsertWithoutUsersInputSchema: z.ZodType<Prisma.RecipesUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => RecipesUpdateWithoutUsersInputSchema),z.lazy(() => RecipesUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RecipesCreateWithoutUsersInputSchema),z.lazy(() => RecipesUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => RecipesWhereInputSchema).optional()
}).strict();

export const RecipesUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RecipesUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RecipesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RecipesUpdateWithoutUsersInputSchema),z.lazy(() => RecipesUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const RecipesUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RecipesUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.lazy(() => RecipeIngredientUpdateManyWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipesUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RecipesUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  prepMinutes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => RecipesUpdatetagsInputSchema),z.string().array() ]).optional(),
  private: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.lazy(() => RecipeIngredientUncheckedUpdateManyWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipeIngredientCreateManyRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientCreateManyRecipesInput> = z.object({
  amount: z.number(),
  ingredientsId: z.number().int()
}).strict();

export const RecipeUserCreateManyRecipesInputSchema: z.ZodType<Prisma.RecipeUserCreateManyRecipesInput> = z.object({
  role: z.lazy(() => RoleSchema),
  usersId: z.string()
}).strict();

export const RecipeIngredientUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateWithoutRecipesInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ingredients: z.lazy(() => IngredientsUpdateOneRequiredWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipeIngredientUncheckedUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateWithoutRecipesInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ingredientsId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeIngredientUncheckedUpdateManyWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateManyWithoutRecipesInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ingredientsId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeUserUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUpdateWithoutRecipesInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UsersUpdateOneRequiredWithoutRecipesNestedInputSchema).optional()
}).strict();

export const RecipeUserUncheckedUpdateWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateWithoutRecipesInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  usersId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeUserUncheckedUpdateManyWithoutRecipesInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateManyWithoutRecipesInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  usersId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeIngredientCreateManyIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientCreateManyIngredientsInput> = z.object({
  amount: z.number(),
  recipesId: z.string()
}).strict();

export const RecipeIngredientUpdateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUpdateWithoutIngredientsInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recipes: z.lazy(() => RecipesUpdateOneRequiredWithoutIngredientsNestedInputSchema).optional()
}).strict();

export const RecipeIngredientUncheckedUpdateWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateWithoutIngredientsInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeIngredientUncheckedUpdateManyWithoutIngredientsInputSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateManyWithoutIngredientsInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeUserCreateManyUsersInputSchema: z.ZodType<Prisma.RecipeUserCreateManyUsersInput> = z.object({
  role: z.lazy(() => RoleSchema),
  recipesId: z.string()
}).strict();

export const RecipeUserUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUpdateWithoutUsersInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  recipes: z.lazy(() => RecipesUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const RecipeUserUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateWithoutUsersInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecipeUserUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.RecipeUserUncheckedUpdateManyWithoutUsersInput> = z.object({
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  recipesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const RecipesFindFirstArgsSchema: z.ZodType<Prisma.RecipesFindFirstArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  where: RecipesWhereInputSchema.optional(),
  orderBy: z.union([ RecipesOrderByWithRelationInputSchema.array(),RecipesOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipesScalarFieldEnumSchema,RecipesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecipesFindFirstOrThrowArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  where: RecipesWhereInputSchema.optional(),
  orderBy: z.union([ RecipesOrderByWithRelationInputSchema.array(),RecipesOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipesScalarFieldEnumSchema,RecipesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipesFindManyArgsSchema: z.ZodType<Prisma.RecipesFindManyArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  where: RecipesWhereInputSchema.optional(),
  orderBy: z.union([ RecipesOrderByWithRelationInputSchema.array(),RecipesOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipesScalarFieldEnumSchema,RecipesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipesAggregateArgsSchema: z.ZodType<Prisma.RecipesAggregateArgs> = z.object({
  where: RecipesWhereInputSchema.optional(),
  orderBy: z.union([ RecipesOrderByWithRelationInputSchema.array(),RecipesOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecipesGroupByArgsSchema: z.ZodType<Prisma.RecipesGroupByArgs> = z.object({
  where: RecipesWhereInputSchema.optional(),
  orderBy: z.union([ RecipesOrderByWithAggregationInputSchema.array(),RecipesOrderByWithAggregationInputSchema ]).optional(),
  by: RecipesScalarFieldEnumSchema.array(),
  having: RecipesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecipesFindUniqueArgsSchema: z.ZodType<Prisma.RecipesFindUniqueArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  where: RecipesWhereUniqueInputSchema,
}).strict() ;

export const RecipesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RecipesFindUniqueOrThrowArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  where: RecipesWhereUniqueInputSchema,
}).strict() ;

export const IngredientsFindFirstArgsSchema: z.ZodType<Prisma.IngredientsFindFirstArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  where: IngredientsWhereInputSchema.optional(),
  orderBy: z.union([ IngredientsOrderByWithRelationInputSchema.array(),IngredientsOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IngredientsScalarFieldEnumSchema,IngredientsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IngredientsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IngredientsFindFirstOrThrowArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  where: IngredientsWhereInputSchema.optional(),
  orderBy: z.union([ IngredientsOrderByWithRelationInputSchema.array(),IngredientsOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IngredientsScalarFieldEnumSchema,IngredientsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IngredientsFindManyArgsSchema: z.ZodType<Prisma.IngredientsFindManyArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  where: IngredientsWhereInputSchema.optional(),
  orderBy: z.union([ IngredientsOrderByWithRelationInputSchema.array(),IngredientsOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IngredientsScalarFieldEnumSchema,IngredientsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IngredientsAggregateArgsSchema: z.ZodType<Prisma.IngredientsAggregateArgs> = z.object({
  where: IngredientsWhereInputSchema.optional(),
  orderBy: z.union([ IngredientsOrderByWithRelationInputSchema.array(),IngredientsOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IngredientsGroupByArgsSchema: z.ZodType<Prisma.IngredientsGroupByArgs> = z.object({
  where: IngredientsWhereInputSchema.optional(),
  orderBy: z.union([ IngredientsOrderByWithAggregationInputSchema.array(),IngredientsOrderByWithAggregationInputSchema ]).optional(),
  by: IngredientsScalarFieldEnumSchema.array(),
  having: IngredientsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IngredientsFindUniqueArgsSchema: z.ZodType<Prisma.IngredientsFindUniqueArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  where: IngredientsWhereUniqueInputSchema,
}).strict() ;

export const IngredientsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IngredientsFindUniqueOrThrowArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  where: IngredientsWhereUniqueInputSchema,
}).strict() ;

export const UsersFindFirstArgsSchema: z.ZodType<Prisma.UsersFindFirstArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersFindFirstOrThrowArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsersFindManyArgsSchema: z.ZodType<Prisma.UsersFindManyArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersScalarFieldEnumSchema,UsersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsersAggregateArgsSchema: z.ZodType<Prisma.UsersAggregateArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithRelationInputSchema.array(),UsersOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsersGroupByArgsSchema: z.ZodType<Prisma.UsersGroupByArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
  orderBy: z.union([ UsersOrderByWithAggregationInputSchema.array(),UsersOrderByWithAggregationInputSchema ]).optional(),
  by: UsersScalarFieldEnumSchema.array(),
  having: UsersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsersFindUniqueArgsSchema: z.ZodType<Prisma.UsersFindUniqueArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict() ;

export const UsersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersFindUniqueOrThrowArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict() ;

export const RecipeIngredientFindFirstArgsSchema: z.ZodType<Prisma.RecipeIngredientFindFirstArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  where: RecipeIngredientWhereInputSchema.optional(),
  orderBy: z.union([ RecipeIngredientOrderByWithRelationInputSchema.array(),RecipeIngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeIngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeIngredientScalarFieldEnumSchema,RecipeIngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipeIngredientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecipeIngredientFindFirstOrThrowArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  where: RecipeIngredientWhereInputSchema.optional(),
  orderBy: z.union([ RecipeIngredientOrderByWithRelationInputSchema.array(),RecipeIngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeIngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeIngredientScalarFieldEnumSchema,RecipeIngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipeIngredientFindManyArgsSchema: z.ZodType<Prisma.RecipeIngredientFindManyArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  where: RecipeIngredientWhereInputSchema.optional(),
  orderBy: z.union([ RecipeIngredientOrderByWithRelationInputSchema.array(),RecipeIngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeIngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeIngredientScalarFieldEnumSchema,RecipeIngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipeIngredientAggregateArgsSchema: z.ZodType<Prisma.RecipeIngredientAggregateArgs> = z.object({
  where: RecipeIngredientWhereInputSchema.optional(),
  orderBy: z.union([ RecipeIngredientOrderByWithRelationInputSchema.array(),RecipeIngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeIngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecipeIngredientGroupByArgsSchema: z.ZodType<Prisma.RecipeIngredientGroupByArgs> = z.object({
  where: RecipeIngredientWhereInputSchema.optional(),
  orderBy: z.union([ RecipeIngredientOrderByWithAggregationInputSchema.array(),RecipeIngredientOrderByWithAggregationInputSchema ]).optional(),
  by: RecipeIngredientScalarFieldEnumSchema.array(),
  having: RecipeIngredientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecipeIngredientFindUniqueArgsSchema: z.ZodType<Prisma.RecipeIngredientFindUniqueArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  where: RecipeIngredientWhereUniqueInputSchema,
}).strict() ;

export const RecipeIngredientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RecipeIngredientFindUniqueOrThrowArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  where: RecipeIngredientWhereUniqueInputSchema,
}).strict() ;

export const RecipeUserFindFirstArgsSchema: z.ZodType<Prisma.RecipeUserFindFirstArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  where: RecipeUserWhereInputSchema.optional(),
  orderBy: z.union([ RecipeUserOrderByWithRelationInputSchema.array(),RecipeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeUserScalarFieldEnumSchema,RecipeUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipeUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecipeUserFindFirstOrThrowArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  where: RecipeUserWhereInputSchema.optional(),
  orderBy: z.union([ RecipeUserOrderByWithRelationInputSchema.array(),RecipeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeUserScalarFieldEnumSchema,RecipeUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipeUserFindManyArgsSchema: z.ZodType<Prisma.RecipeUserFindManyArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  where: RecipeUserWhereInputSchema.optional(),
  orderBy: z.union([ RecipeUserOrderByWithRelationInputSchema.array(),RecipeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeUserScalarFieldEnumSchema,RecipeUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecipeUserAggregateArgsSchema: z.ZodType<Prisma.RecipeUserAggregateArgs> = z.object({
  where: RecipeUserWhereInputSchema.optional(),
  orderBy: z.union([ RecipeUserOrderByWithRelationInputSchema.array(),RecipeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecipeUserGroupByArgsSchema: z.ZodType<Prisma.RecipeUserGroupByArgs> = z.object({
  where: RecipeUserWhereInputSchema.optional(),
  orderBy: z.union([ RecipeUserOrderByWithAggregationInputSchema.array(),RecipeUserOrderByWithAggregationInputSchema ]).optional(),
  by: RecipeUserScalarFieldEnumSchema.array(),
  having: RecipeUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecipeUserFindUniqueArgsSchema: z.ZodType<Prisma.RecipeUserFindUniqueArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  where: RecipeUserWhereUniqueInputSchema,
}).strict() ;

export const RecipeUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RecipeUserFindUniqueOrThrowArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  where: RecipeUserWhereUniqueInputSchema,
}).strict() ;

export const RecipesCreateArgsSchema: z.ZodType<Prisma.RecipesCreateArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  data: z.union([ RecipesCreateInputSchema,RecipesUncheckedCreateInputSchema ]),
}).strict() ;

export const RecipesUpsertArgsSchema: z.ZodType<Prisma.RecipesUpsertArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  where: RecipesWhereUniqueInputSchema,
  create: z.union([ RecipesCreateInputSchema,RecipesUncheckedCreateInputSchema ]),
  update: z.union([ RecipesUpdateInputSchema,RecipesUncheckedUpdateInputSchema ]),
}).strict() ;

export const RecipesCreateManyArgsSchema: z.ZodType<Prisma.RecipesCreateManyArgs> = z.object({
  data: z.union([ RecipesCreateManyInputSchema,RecipesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecipesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RecipesCreateManyAndReturnArgs> = z.object({
  data: z.union([ RecipesCreateManyInputSchema,RecipesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecipesDeleteArgsSchema: z.ZodType<Prisma.RecipesDeleteArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  where: RecipesWhereUniqueInputSchema,
}).strict() ;

export const RecipesUpdateArgsSchema: z.ZodType<Prisma.RecipesUpdateArgs> = z.object({
  select: RecipesSelectSchema.optional(),
  include: RecipesIncludeSchema.optional(),
  data: z.union([ RecipesUpdateInputSchema,RecipesUncheckedUpdateInputSchema ]),
  where: RecipesWhereUniqueInputSchema,
}).strict() ;

export const RecipesUpdateManyArgsSchema: z.ZodType<Prisma.RecipesUpdateManyArgs> = z.object({
  data: z.union([ RecipesUpdateManyMutationInputSchema,RecipesUncheckedUpdateManyInputSchema ]),
  where: RecipesWhereInputSchema.optional(),
}).strict() ;

export const RecipesDeleteManyArgsSchema: z.ZodType<Prisma.RecipesDeleteManyArgs> = z.object({
  where: RecipesWhereInputSchema.optional(),
}).strict() ;

export const IngredientsCreateArgsSchema: z.ZodType<Prisma.IngredientsCreateArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  data: z.union([ IngredientsCreateInputSchema,IngredientsUncheckedCreateInputSchema ]),
}).strict() ;

export const IngredientsUpsertArgsSchema: z.ZodType<Prisma.IngredientsUpsertArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  where: IngredientsWhereUniqueInputSchema,
  create: z.union([ IngredientsCreateInputSchema,IngredientsUncheckedCreateInputSchema ]),
  update: z.union([ IngredientsUpdateInputSchema,IngredientsUncheckedUpdateInputSchema ]),
}).strict() ;

export const IngredientsCreateManyArgsSchema: z.ZodType<Prisma.IngredientsCreateManyArgs> = z.object({
  data: z.union([ IngredientsCreateManyInputSchema,IngredientsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const IngredientsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IngredientsCreateManyAndReturnArgs> = z.object({
  data: z.union([ IngredientsCreateManyInputSchema,IngredientsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const IngredientsDeleteArgsSchema: z.ZodType<Prisma.IngredientsDeleteArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  where: IngredientsWhereUniqueInputSchema,
}).strict() ;

export const IngredientsUpdateArgsSchema: z.ZodType<Prisma.IngredientsUpdateArgs> = z.object({
  select: IngredientsSelectSchema.optional(),
  include: IngredientsIncludeSchema.optional(),
  data: z.union([ IngredientsUpdateInputSchema,IngredientsUncheckedUpdateInputSchema ]),
  where: IngredientsWhereUniqueInputSchema,
}).strict() ;

export const IngredientsUpdateManyArgsSchema: z.ZodType<Prisma.IngredientsUpdateManyArgs> = z.object({
  data: z.union([ IngredientsUpdateManyMutationInputSchema,IngredientsUncheckedUpdateManyInputSchema ]),
  where: IngredientsWhereInputSchema.optional(),
}).strict() ;

export const IngredientsDeleteManyArgsSchema: z.ZodType<Prisma.IngredientsDeleteManyArgs> = z.object({
  where: IngredientsWhereInputSchema.optional(),
}).strict() ;

export const UsersCreateArgsSchema: z.ZodType<Prisma.UsersCreateArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  data: z.union([ UsersCreateInputSchema,UsersUncheckedCreateInputSchema ]),
}).strict() ;

export const UsersUpsertArgsSchema: z.ZodType<Prisma.UsersUpsertArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
  create: z.union([ UsersCreateInputSchema,UsersUncheckedCreateInputSchema ]),
  update: z.union([ UsersUpdateInputSchema,UsersUncheckedUpdateInputSchema ]),
}).strict() ;

export const UsersCreateManyArgsSchema: z.ZodType<Prisma.UsersCreateManyArgs> = z.object({
  data: z.union([ UsersCreateManyInputSchema,UsersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UsersCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UsersCreateManyAndReturnArgs> = z.object({
  data: z.union([ UsersCreateManyInputSchema,UsersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UsersDeleteArgsSchema: z.ZodType<Prisma.UsersDeleteArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  where: UsersWhereUniqueInputSchema,
}).strict() ;

export const UsersUpdateArgsSchema: z.ZodType<Prisma.UsersUpdateArgs> = z.object({
  select: UsersSelectSchema.optional(),
  include: UsersIncludeSchema.optional(),
  data: z.union([ UsersUpdateInputSchema,UsersUncheckedUpdateInputSchema ]),
  where: UsersWhereUniqueInputSchema,
}).strict() ;

export const UsersUpdateManyArgsSchema: z.ZodType<Prisma.UsersUpdateManyArgs> = z.object({
  data: z.union([ UsersUpdateManyMutationInputSchema,UsersUncheckedUpdateManyInputSchema ]),
  where: UsersWhereInputSchema.optional(),
}).strict() ;

export const UsersDeleteManyArgsSchema: z.ZodType<Prisma.UsersDeleteManyArgs> = z.object({
  where: UsersWhereInputSchema.optional(),
}).strict() ;

export const RecipeIngredientCreateArgsSchema: z.ZodType<Prisma.RecipeIngredientCreateArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  data: z.union([ RecipeIngredientCreateInputSchema,RecipeIngredientUncheckedCreateInputSchema ]),
}).strict() ;

export const RecipeIngredientUpsertArgsSchema: z.ZodType<Prisma.RecipeIngredientUpsertArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  where: RecipeIngredientWhereUniqueInputSchema,
  create: z.union([ RecipeIngredientCreateInputSchema,RecipeIngredientUncheckedCreateInputSchema ]),
  update: z.union([ RecipeIngredientUpdateInputSchema,RecipeIngredientUncheckedUpdateInputSchema ]),
}).strict() ;

export const RecipeIngredientCreateManyArgsSchema: z.ZodType<Prisma.RecipeIngredientCreateManyArgs> = z.object({
  data: z.union([ RecipeIngredientCreateManyInputSchema,RecipeIngredientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecipeIngredientCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RecipeIngredientCreateManyAndReturnArgs> = z.object({
  data: z.union([ RecipeIngredientCreateManyInputSchema,RecipeIngredientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecipeIngredientDeleteArgsSchema: z.ZodType<Prisma.RecipeIngredientDeleteArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  where: RecipeIngredientWhereUniqueInputSchema,
}).strict() ;

export const RecipeIngredientUpdateArgsSchema: z.ZodType<Prisma.RecipeIngredientUpdateArgs> = z.object({
  select: RecipeIngredientSelectSchema.optional(),
  include: RecipeIngredientIncludeSchema.optional(),
  data: z.union([ RecipeIngredientUpdateInputSchema,RecipeIngredientUncheckedUpdateInputSchema ]),
  where: RecipeIngredientWhereUniqueInputSchema,
}).strict() ;

export const RecipeIngredientUpdateManyArgsSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyArgs> = z.object({
  data: z.union([ RecipeIngredientUpdateManyMutationInputSchema,RecipeIngredientUncheckedUpdateManyInputSchema ]),
  where: RecipeIngredientWhereInputSchema.optional(),
}).strict() ;

export const RecipeIngredientDeleteManyArgsSchema: z.ZodType<Prisma.RecipeIngredientDeleteManyArgs> = z.object({
  where: RecipeIngredientWhereInputSchema.optional(),
}).strict() ;

export const RecipeUserCreateArgsSchema: z.ZodType<Prisma.RecipeUserCreateArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  data: z.union([ RecipeUserCreateInputSchema,RecipeUserUncheckedCreateInputSchema ]),
}).strict() ;

export const RecipeUserUpsertArgsSchema: z.ZodType<Prisma.RecipeUserUpsertArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  where: RecipeUserWhereUniqueInputSchema,
  create: z.union([ RecipeUserCreateInputSchema,RecipeUserUncheckedCreateInputSchema ]),
  update: z.union([ RecipeUserUpdateInputSchema,RecipeUserUncheckedUpdateInputSchema ]),
}).strict() ;

export const RecipeUserCreateManyArgsSchema: z.ZodType<Prisma.RecipeUserCreateManyArgs> = z.object({
  data: z.union([ RecipeUserCreateManyInputSchema,RecipeUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecipeUserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RecipeUserCreateManyAndReturnArgs> = z.object({
  data: z.union([ RecipeUserCreateManyInputSchema,RecipeUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecipeUserDeleteArgsSchema: z.ZodType<Prisma.RecipeUserDeleteArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  where: RecipeUserWhereUniqueInputSchema,
}).strict() ;

export const RecipeUserUpdateArgsSchema: z.ZodType<Prisma.RecipeUserUpdateArgs> = z.object({
  select: RecipeUserSelectSchema.optional(),
  include: RecipeUserIncludeSchema.optional(),
  data: z.union([ RecipeUserUpdateInputSchema,RecipeUserUncheckedUpdateInputSchema ]),
  where: RecipeUserWhereUniqueInputSchema,
}).strict() ;

export const RecipeUserUpdateManyArgsSchema: z.ZodType<Prisma.RecipeUserUpdateManyArgs> = z.object({
  data: z.union([ RecipeUserUpdateManyMutationInputSchema,RecipeUserUncheckedUpdateManyInputSchema ]),
  where: RecipeUserWhereInputSchema.optional(),
}).strict() ;

export const RecipeUserDeleteManyArgsSchema: z.ZodType<Prisma.RecipeUserDeleteManyArgs> = z.object({
  where: RecipeUserWhereInputSchema.optional(),
}).strict() ;