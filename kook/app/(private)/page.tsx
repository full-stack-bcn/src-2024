import RecipeCard from "@/components/RecipeCard";
import { dbGetUserRecipes } from "@/db/recipes";
import { serverGetUser } from "@/db/users";
import Link from "next/link";
import { PlusCircle } from 'lucide-react';

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
        <Link href="/recipe/new">
          <div className="w-32 h-48 bg-gray-100 rounded p-2 px-3 flex flex-col justify-center items-center">
            <PlusCircle className="opacity-60" />
            <div className="opacity-60 text-sm">New Recipe</div>
          </div>
        </Link>
      </div>
    </main>
  );
}
