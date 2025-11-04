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
    const title = text.trim();
    if (!title) return;
    const newTodo: Todo = {
      id: String(Date.now()),
      title,
      done: false
    };
    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  }

  function toggle(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function remove(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
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
          aria-label="Todo title"
        />
        <button
          type="submit"
          className="rounded-md bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600"
        >
          Add
        </button>
      </form>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
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
                aria-label={`Mark "${t.title}" as ${t.done ? "not done" : "done"}`}
              />
              <span className={t.done ? "line-through text-white/50" : ""}>
                {t.title}
              </span>
            </label>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm hover:bg-white/20"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-white/70" aria-live="polite">
        Total tasks: {todos.length}
      </p>
    </div>
  );
}