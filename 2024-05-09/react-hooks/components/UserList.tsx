import { loadUsers } from "@/lib/users";
import UserComponent from "./UserComponent";

export default async function UserList() {
  const users = await loadUsers();
  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <UserComponent key={user.email} user={user} />
      ))}
    </div>
  );
}
