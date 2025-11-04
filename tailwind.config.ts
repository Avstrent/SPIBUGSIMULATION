import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{css}"
    // INTENTIONAL BUG (minor): pages directory is omitted on purpose.
    // If you add pages later, include "./src/pages/**/*.{ts,tsx}" to ensure classes are picked up.
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#4f46e5",
          600: "#4338ca"
        }
      }
    }
  },
  plugins: []
};
export default config;