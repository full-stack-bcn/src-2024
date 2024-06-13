"use server";

import { dbGetUserByUsername } from "@/db/users";
import { createJwtForUser } from "@/lib/jwt";
import * as bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function actionLogin(formData: FormData) {
  const usernameField = formData.get("username");
  const passwordField = formData.get("password");
  if (!passwordField || !usernameField) {
    return `Missing form fields`;
  }
  const password = passwordField.valueOf();
  const username = usernameField.valueOf();
  if (typeof password !== "string" || typeof username !== "string") {
    return `Wrong field type`;
  }

  // Get User by username
  const user = await dbGetUserByUsername(username);
  if (!user) {
    return `Wrong credentials`;
  }

  // Check password
  const passwordMatches = await bcrypt.compare(password, user.hashedPassword);
  if (!passwordMatches) {
    return `Wrong credentials`;
  }

  // Create JWT and set it as the "auth" cookie
  const jwt = await createJwtForUser(user.id);
  cookies().set("auth", jwt);

  const pathField = formData.get("path");
  const pathObj = pathField?.valueOf();
  const path = typeof pathObj === "string" ? pathObj : "";
  redirect(path ? path : "/");
}

export async function actionLogout() {
  cookies().delete("auth");
  redirect("/login");
}
