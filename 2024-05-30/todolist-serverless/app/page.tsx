import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { dbGetTodos } from "@/lib/todos";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const todos = await dbGetTodos();

  return (
    <main className="p-8">
      <h1>Todo List</h1>
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
