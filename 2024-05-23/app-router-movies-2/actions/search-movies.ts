"use server";

import { serverSearchMovies } from "@/lib/movies";

export async function actionSearchMovies(query: string) {
  const movies = await serverSearchMovies(query);
  return movies;
}
