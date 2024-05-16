import { Movie, getAllMovies, getMoviesWithGenre } from "@/lib/movies";
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
    movies = await getAllMovies();
  } else {
    const genreNum = Number(genreId);
    if (Number.isNaN(genreNum)) {
      notFound();
    }
    movies = await getMoviesWithGenre([genreNum]);
  }
  return (
    <main className="p-6">
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </main>
  );
}
