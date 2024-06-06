import { actionLogout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>This should be a restricted area...</p>
      <form className="mt-12" action={actionLogout}>
        <Button>Logout</Button>
      </form>
    </main>
  );
}
