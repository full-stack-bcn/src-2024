"use client";

import UserComponent from "@/components/UserComponent";
import { User, loadUsers } from "@/lib/users";
import { useEffect, useState } from "react";

export default function Page() {
  const [userList, setUserList] = useState<User[] | null>(null);

  useEffect(() => {
    loadUsers().then(setUserList);
  }, []);

  if (userList === null) {
    return <div>Loading...</div>;
  }

  // Pintar usuarios
  return (
    <main className="p-4">
      <h1>Client User List</h1>
      <div className="flex flex-col gap-2">
        {userList.map((user) => (
          <UserComponent key={user.email} user={user} />
        ))}
      </div>
    </main>
  );
}
