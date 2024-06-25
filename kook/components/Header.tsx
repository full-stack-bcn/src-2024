import Link from "next/link";
import UserMenu from "./UserMenu";

export default async function Header() {
  return (
    <header className="p-1.5 px-3 border-b flex flex-row items-center gap-2">
      <Link href="/" className="font-bold text-lg">
        Kook
      </Link>
      <div className="flex-1"></div>
      <UserMenu />
    </header>
  );
}
