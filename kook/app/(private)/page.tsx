import RecipeCard from "@/components/RecipeCard";
import { dbGetUserRecipes } from "@/db/recipes";
import { serverGetUser } from "@/db/users";

export default async function Home() {
  const user = await serverGetUser();
  const userRecipes = await dbGetUserRecipes(user.id);
  return (
    <main className="p-4">
      <h1>Recipes</h1>
      <div className="flex flex-wrap gap-2">
        {userRecipes.map((ur) => (
          <RecipeCard key={ur.id} recipe={ur} />
        ))}
      </div>
    </main>
  );
}
