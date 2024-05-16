import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer
      className={cn("bg-stone-200 h-16 text-xs text-center", "pt-1 opacity-40")}
    >
      &copy; full-stack UPC
    </footer>
  );
}
