"use client";

import { actionUploadImage } from "@/actions/upload-image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

// https://pub-4ec32bd5aff94e2d932ecbe7482870c5.r2.dev

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const upload = async (formData: FormData) => {
    try {
      const filename = await actionUploadImage(formData);
      const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
      setImageUrl(`${publicUrl}/${filename}`);
    } catch (e: any) {
      setMessage(`Error: ${e.toString()}`);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <form action={upload}>
        <h2>Upload image</h2>
        <label>
          <span className="mr-3">Image</span>
          <input type="file" name="file" />
        </label>
        <div>
          <Button>Upload</Button>
        </div>
        <div className="mt-2">{message}</div>
        {imageUrl && (
          <Image src={imageUrl} alt="recipe image" width={500} height={300} />
        )}
      </form>
    </main>
  );
}
