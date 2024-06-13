import { dbGetUserByUserId, dbGetUserByUsername } from "@/db/users";
import { checkJwt } from "@/lib/jwt";
import { redirect } from "next/navigation";
import React from "react";
import UserMenu from "./UserMenu";

export default async function Header() {
  const userId = await checkJwt();
  if (!userId) {
    redirect("/login");
  }
  const user = await dbGetUserByUserId(userId);
  if (user === null) {
    // NOTE: solo llego aquí si se ha borrado un usuario y su jwt aún existe
    redirect("/login");
  }
  return (
    <header className="p-1.5 px-3 border-b flex flex-row items-center gap-2">
      <div className="font-bold text-lg">Kook</div>
      <div className="flex-1"></div>
      <UserMenu user={user} />
    </header>
  );
}
