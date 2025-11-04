// Simple in-memory demo API (not used by the UI yet) to simulate backend bugs.
import { NextResponse } from "next/server";

type Todo = { id: string; title: string; done: boolean };
const store: Todo[] = [
  { id: "1", title: "Backend: align POST body shape", done: false }
];

export async function GET() {
  return NextResponse.json(store);
}

export async function POST(req: Request) {
  const body = await req.json();
  // INTENTIONAL BUG (API contract): expects 'text' while frontend uses 'title' everywhere.
  // Fix: accept 'title' or normalize input shape.
  if (typeof body.text !== "string" || !body.text.trim()) {
    return NextResponse.json(
      { error: "Missing 'text' field" },
      { status: 400 }
    );
  }

  const todo: Todo = {
    id: String(Date.now()),
    title: body.text,
    done: false
  };
  store.unshift(todo);
  return NextResponse.json(todo, { status: 201 });
}