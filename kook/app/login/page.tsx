"use client";

import { actionLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const IconNotVisible = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="currentColor"
      d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038c-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19m0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293L2.293 3.707l18 18l1.414-1.414l-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5m4.972 10.558l-2.28-2.28c.19-.39.308-.819.308-1.278c0-1.641-1.359-3-3-3c-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5c-.302.692-1.166 2.342-2.954 3.558"
    />
  </svg>
);

const IconVisible = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="currentColor"
      d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3c1.641 0 3-1.358 3-3c0-1.641-1.359-3-3-3"
    />
    <path
      fill="currentColor"
      d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5m0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5"
    />
  </svg>
);

function LoginPage() {
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
        <div className="relative">
          <Input
            type={passwdVisible ? "text" : "password"}
            name="password"
            placeholder="password"
            className="pr-8"
            onChange={clearMessage}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-5 flex flex-col justify-center mr-2 opacity-70 cursor-pointer"
            onClick={() => setPasswdVisible((x) => !x)}
          >
            {passwdVisible ? (
              <IconNotVisible className="w-5 h-5" />
            ) : (
              <IconVisible className="w-5 h-5" />
            )}
          </div>
        </div>

        <input type="hidden" name="path" value={path || ""} />
        <Button>Login</Button>
        <p className="text-red-500 h-8">{message}</p>
      </form>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
