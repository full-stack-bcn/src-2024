import Header from "@/components/Header";
import UserProvider from "@/components/UserProvider";
import { serverGetUser } from "@/db/users";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};
export default async function Layout({ children }: LayoutProps) {
  const user = await serverGetUser();
  return (
    <UserProvider user={user}>
      <Header />
      {children}
    </UserProvider>
  );
}
