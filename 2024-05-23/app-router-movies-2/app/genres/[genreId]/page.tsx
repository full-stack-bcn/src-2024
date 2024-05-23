import MovieCard from "@/components/MovieCard";
import {
  Movie,
  getAllMovies,
  getMovieGenres,
  getMoviesWithGenre,
} from "@/lib/movies";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    genreId: string;
  };
};
export default async function Page({ params }: PageProps) {
  const { genreId } = params;

  let movies: Movie[] = [];

  if (genreId === "all") {
    // throw new Error(`Because I can`);
    movies = await getAllMovies();
  } else {
    const genreNum = Number(genreId);
    if (Number.isNaN(genreNum)) {
      notFound();
    }
    movies = await getMoviesWithGenre([genreNum]);
  }
  return (
    <main className="p-6 flex flex-wrap gap-2">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  );
}

export async function generateStaticParams() {
  const genres = await getMovieGenres();
  return genres.map((genre) => ({ genreId: String(genre.id) }));
}
