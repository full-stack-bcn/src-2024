import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="bg-blue-600 text-white">Kook</header>
      {children}
    </>
  );
}
