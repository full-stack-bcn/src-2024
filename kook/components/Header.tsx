import UserMenu from "./UserMenu";

export default async function Header() {
  return (
    <header className="p-1.5 px-3 border-b flex flex-row items-center gap-2">
      <div className="font-bold text-lg">Kook</div>
      <div className="flex-1"></div>
      <UserMenu />
    </header>
  );
}
