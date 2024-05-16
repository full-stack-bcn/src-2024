import { Genre } from "@/lib/movies";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SideBarProps = {
  className?: string;
  genres: Genre[];
};
export default function SideBar({ className, genres }: SideBarProps) {
  return (
    <div className={cn("w-32 bg-stone-200 p-2", className)}>
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/genres/${genre.id}`}
          className={cn(
            "line-clamp-1",
            "p-1 px-3",
            "text-sm text-foreground",
            "hover:outline outline-1 outline-stone-700",
            "rounded-full"
          )}
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}
