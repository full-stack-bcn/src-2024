"use client";

import { ChangeEventHandler, useState } from "react";

type User = {
  name: string;
  age: number;
};

const initialUser = {
  name: "",
  age: 0,
};

export default function EditUser() {
  const [user, setUser] = useState<User>(initialUser);

  const changeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser((prev) => ({ ...prev, name: e.target.value }));
  };

  const changeAge: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser((prev) => ({ ...prev, age: Number(e.target.value) }));
  };

  return (
    <div>
      <p>
        <input type="text" name="name" onChange={changeName} />
      </p>
      <p>
        <input type="number" name="age" onChange={changeAge} />
      </p>
      <div>
        name: {user.name}, age: {user.age}
      </div>
    </div>
  );
}
