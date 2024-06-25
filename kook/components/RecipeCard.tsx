import { Recipe, Role } from "@prisma/client";
import Link from "next/link";

type RecipeCardProps = {
  recipe: Recipe & { role: Role };
};
export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { title, role } = recipe;
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="w-32 h-48 shadow border rounded p-2 px-3">
        {title} ({role})
      </div>
    </Link>
  );
}
