import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

export default function Page() {
  // INTENTIONAL BUG (requirements/UI copy):
  // The page title says "Sprint Board" even though this page is a simple Todo demo.
  // This mismatch is meant to be reported by QA/UI as a copy inconsistency with the design spec.
  const pageTitle = "Sprint Board"; // Should be "Todo Demo" per spec (hypothetical)

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="mx-auto w-full max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
        <p className="mt-2 text-gray-300">
          Identify and fix functional bugs, UI issues, and design inconsistencies.
        </p>

        {/* INTENTIONAL BUG (a11y): landmark missing. Could wrap content in <section aria-labelledby="todos-heading"> */}
        <div className="mt-8">
          <TodoList />
        </div>
      </section>
    </main>
  );
}