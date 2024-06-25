import { dbGetRecipeById } from "@/db/recipes";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};
export default async function Page({ params: { id } }: PageProps) {
  const recipe = await dbGetRecipeById(id);
  if (recipe === null) {
    notFound();
  }
  return (
    <main className="p-6">
      <h1>{recipe.title}</h1>
      <p>{recipe.id}</p>
    </main>
  );
}
