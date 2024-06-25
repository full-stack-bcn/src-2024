"use client";

import type { User } from "@prisma/client";
import { createContext, useContext } from "react";

const UserContext = createContext<User | null>(null);

type UserProviderProps = {
  user: User;
  children: React.ReactNode;
};
export default function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>
    {children}
  </UserContext.Provider>
}

export function useLoggedInUser() {
  const user = useContext(UserContext);
  return user;
}