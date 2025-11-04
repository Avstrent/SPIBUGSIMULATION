"use client";

import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const seed: Todo[] = [
  { id: "1", title: "Wire up header links", done: false },
  { id: "2", title: "Style primary button", done: false }
];

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(seed);
  const [text, setText] = useState("");

  function addTodo() {
    // INTENTIONAL BUG (validation): allows empty/whitespace items to be added.
    // Fix: guard if (!text.trim()) return; and give user feedback.
    const newTodo: Todo = {
      id: String(Date.now()),
      title: text,
      done: false
    };
    setTodos(prev => [newTodo, ...prev]);
    setText("");
  }

  function toggle(id: string) {
    setTodos(prev => {
      // INTENTIONAL BUG (mutation): directly mutates objects, risking stale state issues.
      // const next = [...prev];
      // const item = next.find(t => t.id === id);
      // if (item) item.done = !item.done;
      // return next;

      // Better (immutable):
      return prev.map(t => (t.id === id ? { ...t, done: !t.done } : t));
    });
  }

  function remove(id: string) {
    // INTENTIONAL BUG (logic): incorrect filter condition keeps the item instead of removing.
    // return setTodos(prev => prev.filter(t => t.id === id));
    // Correct:
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      {/* INTENTIONAL BUG (semantics): button inside a form without type can submit unexpectedly */}
      {/* Fix: type="button" for non-submit buttons */}
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          className="rounded-md bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600"
          // INTENTIONAL BUG (form behavior): missing type="submit" or explicit button type. In some browsers this defaults to submit, which is okay here,
          // but elsewhere a missing type may cause accidental submits. Keep for QA to flag.
        >
          Add
        </button>
      </form>

      {/* INTENTIONAL BUG (layout): wrong class 'grid-col-2' should be 'grid-cols-2' */}
      {/* Fix: replace grid-col-2 with grid-cols-2 */}
      <ul className="mt-6 grid grid-col-2 gap-3 sm:grid-cols-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-3"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t.id)}
              />
              <span className={t.done ? "line-through text-white/50" : ""}>
                {t.title || "(empty)"} {/* shows empties if validation bug is triggered */}
              </span>
            </label>
            <button
              onClick={() => remove(t.id)}
              className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm hover:bg-white/20"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* INTENTIONAL BUG (metrics): count shows total +1, misleading progress */}
      {/* Fix: correct math */}
      <p className="mt-4 text-sm text-white/70">
        Total tasks: {todos.length + 1}
      </p>
    </div>
  );
}