import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* INTENTIONAL BUG (a11y): missing alt text on logo image */}
          {/* Fix: add alt="App logo" */}
          <img src="/logo.svg" width={32} height={32} />
          <span className="text-lg font-semibold">IT Simulation</span>
        </div>
        <nav className="flex items-center gap-4">
          {/* INTENTIONAL BUG (UI): uses text-primary which is undefined; use text-brand-500 or define primary */}
          <Link className="text-primary hover:underline" href="/">
            Home
          </Link>
          {/* INTENTIONAL BUG (routing): This link points to a non-existent route '/dashboard' */}
          {/* Fix options: create the route or change href to an existing one */}
          <Link className="text-primary hover:underline" href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </div>

      {/* INTENTIONAL BUG (contrast): Gray text on semi-transparent gray background can be low-contrast */}
      {/* Fix: increase contrast with text-white or darker bg */}
      <p className="px-4 pb-3 text-sm text-gray-400">
        This header intentionally contains minor issues to be discovered by QA.
      </p>
    </header>
  );
}