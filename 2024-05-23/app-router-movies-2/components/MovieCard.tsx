import { Movie, getPosterURL } from "@/lib/movies";
import Image from "next/image";

type MovieCardProps = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="font-bold rounded w-24 h-36 border bg-stone-900 relative overflow-clip">
      <Image
        src={getPosterURL(movie)}
        alt={`Poster for "${movie.title}"`}
        fill={true}
      />
    </div>
  );
}
