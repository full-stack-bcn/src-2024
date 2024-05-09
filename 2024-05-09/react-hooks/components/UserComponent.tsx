import type { User } from "@/lib/users";
import Image from "next/image";

type UserComponentProps = {
  user: User;
};

export default function UserComponent({ user: user }: UserComponentProps) {
  const { email, name } = user;
  return (
    <div className="p-1.5 border rounded shadow flex flex-row gap-2 items-center">
      <Image
        src={user.picture.thumbnail}
        alt="user avatar"
        width={42}
        height={42}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="font-bold">
          {name.first} {name.last}
        </div>
        <div className="font-mono text-xs text-zinc-500">{email}</div>
      </div>
    </div>
  );
}
