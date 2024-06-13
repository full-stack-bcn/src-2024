import { db } from "./db";

export const dbGetUserByUsername = async (username: string) => {
  return await db.users.findUnique({ where: { username } });
};

export const dbGetUserByUserId = async (userId: string) => {
  return await db.users.findUnique({ where: { id: userId } });
};
