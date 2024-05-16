import { cn } from "@/lib/utils";
import React from "react";

export default function NotFound() {
  return (
    <main
      className={cn(
        "flex-1 flex flex-col h-max",
        "justify-center items-center"
      )}
    >
      <h1 className="text-7xl text-stone-500">404</h1>
      <p>Page not found.</p>
    </main>
  );
}
