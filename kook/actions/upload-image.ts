"use server";

import { r2client } from "@/lib/R2";
import { extname } from "path";


function buf2hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

export async function actionUploadImage(formData: FormData) {
  const fileField = formData.get("file");
  if (fileField === null) {
    throw new Error(`Missing 'file' field in form`);
  }
  const object = fileField.valueOf();
  if (typeof object === "string") {
    throw new Error(`'file' is not an object (it is a string)`);
  }

  // Obtener buffer del fichero
  const file = object as File;
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes);

  // Calcula hash del fichero para el nombre
  const hashBytes = await crypto.subtle.digest("SHA-256", buffer);
  const hash = buf2hex(hashBytes);

  const extension = extname(file.name);
  const uploadFilename = `${hash}${extension}`;
  await r2client.uploadFile(uploadFilename, buffer);
  
  return uploadFilename;
}