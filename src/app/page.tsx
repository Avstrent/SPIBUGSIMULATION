import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

export default function Page() {
  const pageTitle = "Todo Demo";

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section
        className="mx-auto w-full max-w-3xl px-4 py-8"
        aria-labelledby="todos-heading"
      >
        <h1 id="todos-heading" className="text-3xl font-bold tracking-tight">
          {pageTitle}
        </h1>
        <p className="mt-2 text-gray-300">
          Identify and fix functional bugs, UI issues, and design inconsistencies.
        </p>
        <div className="mt-8">
          <TodoList />
        </div>
      </section>
    </main>
  );
}