import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="p-4">
      <h1>Main Page</h1>
      <div className="flex flex-col">
        <Link href="/button-demo">Go to Button Demo</Link>
        <Link href="/login-form">Go to Login Form</Link>
      </div>
    </main>
  );
}
