"use client";

import { FormEventHandler, useRef } from "react";

type SearchBoxProps = {
  onChange: (s: string) => void;
};
export default function SearchBox({ onChange }: SearchBoxProps) {
  const textRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onChange(textRef.current!.value);
    textRef.current!.value = "";
  };

  return (
    <form className="p-2 flex flex-row gap-2" onSubmit={onSubmit}>
      <input
        type="text"
        ref={textRef}
        className="py-1 px-2 border-2 border-gray-800 rounded"
      />
      <button className="bg-gray-300 px-4 rounded-md hover:bg-gray-400">
        Search
      </button>
    </form>
  );
}
