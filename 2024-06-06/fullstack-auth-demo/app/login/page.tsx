"use client";

import { actionLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const params = useSearchParams();
  const [message, setMessage] = useState("");
  const [passwdVisible, setPasswdVisible] = useState(false);

  const path = params.get("path");

  const login = async (formData: FormData) => {
    const message = await actionLogin(formData);
    setMessage(message);
  };
  const clearMessage = () => setMessage("");

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form action={login} className="flex flex-col items-start gap-2">
        <h1>Login {path && `to ${path}`}</h1>
        <Input
          type="text"
          name="username"
          placeholder="username"
          onChange={clearMessage}
        />
        <Input
          type={passwdVisible ? "text" : "password"}
          name="password"
          placeholder="password"
          onChange={clearMessage}
        />
        <input type="hidden" name="path" value={path || ""} />
        <Button>Login</Button>
        <p className="text-red-500 h-8">{message}</p>
      </form>
      <Button variant="ghost" onClick={() => setPasswdVisible((x) => !x)}>
        Ojito
      </Button>
    </main>
  );
}
