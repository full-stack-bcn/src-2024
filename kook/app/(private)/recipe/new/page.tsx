"use client";

import { actionUploadImage } from "@/actions/upload-image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

// https://pub-4ec32bd5aff94e2d932ecbe7482870c5.r2.dev

import { RecipeCreateInputSchema } from "@/prisma/generated/zod";
import { z } from "zod";
import { actionInsertRecipe } from "@/actions/recipe";

// const formSchemaFull = RecipeCreateInputSchema;

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Minimum title length is 2",
  }),
  prepMinutes: z.number().min(1),
  difficulty: z.enum(["easy", "medium", "expert"]),
});

type FormType = z.infer<typeof formSchema>;

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      prepMinutes: 1,
      difficulty: "",
    },
  });

  const submitRecipe = async (recipe: FormType) => {
    await actionInsertRecipe(recipe);
  };

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
    <main className="w-screen h-screen flex flex-col p-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitRecipe)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Recipe title..." {...field} />
                </FormControl>
                <FormDescription>This is the recipe title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prepMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparation Time</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Preparation time in minutes</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty..." />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Recipe</Button>
        </form>
      </Form>
      {/* <form action={upload}>
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
      </form> */}
    </main>
  );
}
