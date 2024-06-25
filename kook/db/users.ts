import { checkJwt } from "@/lib/jwt";
import { db } from "./db";
import { redirect } from "next/navigation";

export const dbGetUserByUsername = async (username: string) => {
  return await db.user.findUnique({ where: { username } });
};

export const dbGetUserByUserId = async (userId: string) => {
  return await db.user.findUnique({ where: { id: userId } });
};

export const serverGetUser = async () => {
  const userId = await checkJwt();
  if (!userId) {
    redirect("/login");
  }
  const user = await dbGetUserByUserId(userId);
  if (user === null) {
    // NOTE: solo llego aquí si se ha borrado un usuario y su jwt aún existe
    redirect("/login");
  }
  return user;
}