# IT Simulation (Fixed): Next.js + TypeScript + Tailwind

This is the fully fixed version of the app (no intentional bugs). It includes:
- Correct UI copy and accessible header (alt text, aria labels)
- Valid Tailwind classes and brand color usage
- Proper form semantics and validation
- Accurate counts and immutable state updates
- API normalized to accept `{ title }` or `{ text }`

## Prerequisites
- Node.js 18.17+ or 20+
- npm (bundled with Node) or yarn/pnpm

## Quick Start
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the dev server
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

3. Production build
   ```bash
   npm run build
   npm start
   ```

## Static export (optional, good for Firebase Hosting)
1. Export to `out/`
   ```bash
   npm run export
   ```
2. Deploy with Firebase (optional)
   - Install CLI: `npm i -g firebase-tools`
   - Login: `firebase login`
   - Ensure `firebase.json` exists (provided)
   - Deploy: `firebase deploy --only hosting`

## Environment variables
- Copy `.env.example` to `.env.local` if needed.
- Defaults work locally without changes.

## Project Structure
```
src/
  app/
    api/todos/route.ts  # Demo API (accepts { title } or { text })
    globals.css
    layout.tsx
    page.tsx
  components/
    Header.tsx
    TodoList.tsx
tailwind.config.ts
postcss.config.js
tsconfig.json
next.config.ts
firebase.json
package.json
```

## Notes
- Uses Next.js App Router
- Tailwind scans `src/app`, `src/components`, `src/styles`, and `src/pages`
- Paths use alias `@/*` with `baseUrl: "src"`

## License
Educational use.