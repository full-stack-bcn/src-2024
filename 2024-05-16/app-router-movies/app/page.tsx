import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1>App Router</h1>
      <Link href="/movies">Go to movies page</Link>
    </main>
  );
}
