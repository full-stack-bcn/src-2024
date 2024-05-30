import { Button } from "@/components/ui/button";
import { writeFile } from "fs/promises";

export default function Page() {
  const actionWriteFile = async () => {
    "use server";

    await writeFile(
      `I-was-hereeeeee.json`,
      JSON.stringify({ hola: true, date: new Date().toString() })
    );
  };

  return (
    <main className="p-6">
      <form action={actionWriteFile}>
        <Button>Write a file on the server</Button>
      </form>
    </main>
  );
}
