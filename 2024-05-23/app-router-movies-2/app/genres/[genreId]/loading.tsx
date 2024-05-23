import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";

export default function Loading() {
  return (
    <main className="p-6 flex flex-wrap gap-2">
      {range(20).map((n) => (
        <Skeleton key={n} className="rounded w-24 h-36" />
      ))}
    </main>
  );
}
