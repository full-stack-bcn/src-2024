"use client";

import { Genre } from "@/lib/movies";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarProps = {
  className?: string;
  genres: Genre[];
};
export default function SideBar({ className, genres }: SideBarProps) {
  const currpath = usePathname();

  const Option = ({ id, name }: { id: string; name: string }) => {
    const path = `/genres/${id}`;
    return (
      <Link
        key={id}
        href={path}
        className={cn(
          "line-clamp-1",
          "p-1 px-3",
          "text-sm text-foreground",
          "hover:outline outline-1 outline-stone-700",
          "rounded-full",
          path === currpath ? "bg-black text-white" : ""
        )}
      >
        {name}
      </Link>
    );
  };

  return (
    <div className={cn("w-32 bg-stone-200 p-2", className)}>
      <Option id={"all"} name="All" />
      {genres.map((genre) => (
        <Option key={genre.id} id={String(genre.id)} name={genre.name} />
      ))}
    </div>
  );
}
