import { NextResponse } from "next/server";

type Todo = { id: string; title: string; done: boolean };
const store: Todo[] = [
  { id: "1", title: "Backend: align POST body shape", done: false }
];

export async function GET() {
  return NextResponse.json(store);
}

export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    // ignore, handled below
  }

  // Accept either { title } or { text } and normalize
  const candidate = typeof body?.title === "string" ? body.title : body?.text;
  const title = typeof candidate === "string" ? candidate.trim() : "";

  if (!title) {
    return NextResponse.json(
      { error: "Missing 'title' in request body." },
      { status: 400 }
    );
  }

  const todo: Todo = {
    id: String(Date.now()),
    title,
    done: false
  };
  store.unshift(todo);
  return NextResponse.json(todo, { status: 201 });
}