import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Simulation — Next.js + TS + Tailwind",
  description: "Prebuilt system with intentional bugs for debugging exercise"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}