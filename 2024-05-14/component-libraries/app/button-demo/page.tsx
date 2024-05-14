"use client";

import {
  Button,
  ButtonSizeType,
  ButtonVariantType,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const variants: ButtonVariantType[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
];
const sizes: ButtonSizeType[] = [
  "lg",
  "default",
  "sm",
  "icon",
];

const firstUppercase = (s: string) => {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(
        () => setMessage(""),
        1000
      );
      // Devolver función de limpieza
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const onClick =
    (variant: ButtonVariantType, size: ButtonSizeType) =>
    () =>
      setMessage(`${variant}, ${size}`);

  return (
    <main className="p-4">
      <h1 className="font-bold text-2xl">
        Component Libraries
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Button Demo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex flex-row gap-2">
              {variants.map((variant) => (
                <Button
                  size={size}
                  key={variant}
                  variant={variant}
                  onClick={onClick(variant, size)}
                >
                  {size === "icon" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m48 64v24h-64V32h16a48.05 48.05 0 0 1 48 48m-48 144h-32a48.05 48.05 0 0 1-48-48v-56h128v56a48.05 48.05 0 0 1-48 48"
                      />
                    </svg>
                  ) : (
                    firstUppercase(variant as string)
                  )}
                </Button>
              ))}
            </div>
          ))}
        </CardContent>
        <CardFooter className="text-xs text-gray-500">
          {message}
        </CardFooter>
      </Card>
    </main>
  );
}
