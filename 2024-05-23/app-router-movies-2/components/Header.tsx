"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header
      className={cn(
        "h-12 bg-stone-700 text-white",
        "flex flex-row items-center px-4"
      )}
    >
      <Link href="/">
        <div id="logo" className="font-extrabold text-xl text-white mr-4">
          Movies!
        </div>
      </Link>
      <Button
        variant="link"
        className="text-white"
        onClick={() => router.push("/genres")}
      >
        Genres
      </Button>
    </header>
  );
}
