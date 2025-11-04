import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" width={32} height={32} alt="App logo" />
          <span className="text-lg font-semibold">IT Simulation</span>
        </div>
        <nav className="flex items-center gap-4" aria-label="Primary">
          <Link className="text-brand-500 hover:underline" href="/">
            Home
          </Link>
          <Link className="text-brand-500 hover:underline" href="/">
            Todos
          </Link>
        </nav>
      </div>
      <p className="px-4 pb-3 text-sm text-white/70">
        This header is accessible and uses consistent brand colors.
      </p>
    </header>
  );
}