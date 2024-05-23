"use client";

import { Movie, clientSearchMovies } from "@/lib/movies";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";

type MovieSearchProps = {
  search: string;
};
export default function MovieSearch({ search }: MovieSearchProps) {
  const [movieResults, setMovieResults] = useState<Movie[] | null>(null);

  useEffect(() => {
    clientSearchMovies(search).then(setMovieResults);
    setMovieResults(null);
  }, [search]);

  if (movieResults === null) {
    return <div>Loading...</div>;
  }

  if (movieResults.length === 0) {
    return <div className="p-4">No results.</div>;
  }

  // Pintar usuarios
  return (
    <main className="p-6 flex flex-wrap gap-2">
      {movieResults.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  );
}
