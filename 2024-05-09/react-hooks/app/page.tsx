import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 p-6">
      <Link href="/server-user-list" className="text-blue-600">
        Lista de usuarios renderizada en <strong>servidor</strong>
      </Link>
      <Link href="/client-user-list" className="text-blue-600">
        Lista de usuarios renderizada en <strong>cliente</strong>
      </Link>
      <Link href="/search-products" className="text-blue-600">
        Búsqueda de productos renderizada en <strong>cliente</strong>
      </Link>
    </main>
  );
}
