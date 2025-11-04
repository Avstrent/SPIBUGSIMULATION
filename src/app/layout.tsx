import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Simulation — Next.js + TS + Tailwind (Fixed)",
  description: "Fully fixed and working version."
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