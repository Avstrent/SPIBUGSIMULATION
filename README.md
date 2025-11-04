# IT Simulation: Next.js + TypeScript + Tailwind CSS (with Intentional Bugs)

This repository is a prebuilt system designed for a 30-minute IT simulation. It includes intentional bugs across UI, UX, logic, accessibility, and API contract areas. Your team will execute a realistic Scrum-style cycle: identify issues, create ClickUp tickets, classify, assign, fix, verify, and close.

---

## Scenario Overview

- Tech stack: Next.js (App Router), TypeScript, Tailwind CSS
- Deployment target: Firebase Hosting (via Firebase Console/“Studio”) for the simulation
- Roles: Project Manager (PM), Developer, QA, UI/UX Designer
- Timebox: 30 minutes

---

## Objectives and Key Results (OKRs) — example set

Objective: Deliver a minimally polished demo app that meets usability and quality standards.

- KR1: Resolve all P0/P1 functional bugs (blocking runtime and core flows).
- KR2: Address at least 3 UI/UX inconsistencies (copy, contrast, layout).
- KR3: Ensure a11y basics: alt text for images, form button semantics, and readable color contrast.
- KR4: Prepare a ClickUp project report and deploy the fixed build to Firebase.

The instructor can replace these with your actual assigned OKRs.

---

## Repository structure

```
src/
  app/
    api/todos/route.ts       # API route with an intentional contract bug
    globals.css
    layout.tsx
    page.tsx
  components/
    Header.tsx               # UI/a11y issues (alt text, contrast, bad link)
    TodoList.tsx             # Functional/UI issues (validation, layout, counts)
tailwind.config.ts
postcss.config.js
tsconfig.json
next.config.ts
.env.example
```

---

## Running locally

1) Install
- npm install

2) Dev server
- npm run dev
- Open http://localhost:3000

3) Build (optional)
- npm run build && npm start

---

## Intentional Bugs (what QA and Dev should find)

Functional/Logic
- TodoList.tsx
  - Allows empty todos to be added. (Validation bug)
  - Remove function had wrong filter logic (now fixed in comments). Verify. 
  - Uses +1 in “Total tasks” count (incorrect metric).
  - Grid class uses `grid-col-2` instead of `grid-cols-2` (layout bug).
  - Button in form missing explicit type discipline (risk of accidental submit in other contexts).

UI/Design
- Header uses `text-primary` (not defined in Tailwind config). Replace with `text-brand-500` or add a primary color alias.
- Header “Dashboard” link points to non-existent route.
- Page title says “Sprint Board” instead of “Todo Demo” (spec mismatch).
- Low-contrast helper text in header.

Accessibility (a11y)
- Logo `<img>` missing `alt`.
- Consider adding proper landmarks/labels around sections (e.g., `aria-labelledby`).
- Ensure button types are explicit for clarity.

API Contract
- `POST /api/todos` expects body `{ text: string }` but UI uses `title`. Normalize to accept `{ title }` or update UI.

Tailwind config
- Pages directory is not in `content`. If you add pages/ later, Tailwind may purge classes unexpectedly unless you add it.

---

## ClickUp: Workflow, templates, and classification

Create your Space/List ahead of time:
- Space: “IT Simulation”
- List: “Bug Intake” and “Sprint YYYY.WW”

Severity classification (for PM):
- Urgent (P0): crashes, blockers, security, broken primary path
- Medium (P1/P2): functional defects, layout breaking issues
- Low (P3): copy, minor visual polish

Bug ticket template (QA submits)
- Title: [Component] Short problem statement
- Description:
  - Expected:
  - Actual:
  - Steps to Reproduce:
  - Environment: (URL, Browser/OS)
  - Screenshots/Video:
  - Suggested Severity:
  - Notes/Design references:
- Fields:
  - Type=Bug, Severity, Component, Affects Version, Sprint

Example tickets your QA might file
- [Header] Missing alt text on logo (a11y)
- [Header] “Dashboard” link 404
- [TodoList] Empty todos can be created
- [TodoList] Grid layout broken on small screens
- [Metrics] Total count off by one
- [API] POST expects “text” not “title”

PM steps in ClickUp
- Classify each ticket using severity
- Assign to Developer with due date (within simulation window)
- Set Sprint Goal: “Deliver a no-crash demo app with correct counts and accessible header”
- Use Dashboard widgets: Open Bugs by severity, Blockers, Resolved Today

---

## Scrum-style 30-minute simulation script (what the PM tells the team and what happens)

Minute 0–3: Kickoff
- PM: Shares OKRs and Sprint Goal. Confirms team roles and comms channel.
- Outcome: Alignment on what “Done” means (no runtime errors, key UI fixes, a11y basics).

Minute 3–10: Bug Identification
- QA + UI/UX: Explore app; capture issues with repro steps and screenshots.
- Developer: Skims code (components and API) to anticipate fixes.
- Outcome: 5–8 tickets created in ClickUp (see examples above).

Minute 10–12: Prioritization & Assignment
- PM: Sets severities (P0: runtime/logical blockers; P1: layout issues; P2: copy/contrast).
- PM: Assigns top 3–5 tickets to Developer.
- Outcome: Clear developer queue, timeboxed to ~15 minutes of fixes.

Minute 12–27: Fixing and Verification
- Developer: Implements fixes and pushes to repo; prepares deploy to Firebase.
- QA: Verifies fixes on localhost or Firebase preview; updates tickets (Passed/Failed).
- PM: Monitors progress against Sprint Goal; unblocks as needed; communicates status.

Minute 27–30: Review, Retrospective, Closing
- Sprint Review: Demonstrate fixed app. Confirm OKRs met.
- Retro: “What went well / needs improvement / actions.”
- PM: Marks project “Completed” in ClickUp; exports project report.

---

## Firebase “Studio” deployment (simple path)

For simulation, you can deploy a static build via export. Note: App Router SSR features won’t export dynamically—this demo is static-friendly.

1) Install Firebase CLI locally (one-time)
- npm i -g firebase-tools
- firebase login

2) Initialize Hosting (once)
- firebase init hosting
- Select your project (or create), set `dist` folder to `out`
- Choose single-page app: No

3) Build and export
- Add to package.json (optional): `"export": "next build && next export"`
- Run:
  - npm run build
  - npx next export
  - This creates `out/`

4) Deploy
- firebase deploy --only hosting

If your course uses a preconnected Firebase “Studio” workspace:
- Developer pushes to the assigned remote branch/repo
- The instructor’s Firebase Hosting is configured to auto-deploy
- QA verifies the deployed URL

---

## Definition of Done (DoD) for this exercise

- No crashes on load or during basic interactions
- “Dashboard” link fixed or removed; title matches spec
- Empty todos cannot be created; remove works; counts are correct
- Alt text added; acceptable color contrast for header text
- Grid layout renders two columns on sm+ screens
- API contract clarified or UI aligned (document decision in ClickUp)
- Deployed build accessible for verification
- ClickUp report exported/submitted

---

## Status report template (PM)

- Sprint Goal:
- Summary (green/yellow/red):
- Completed:
- In Progress:
- Blockers/Risks:
- Next steps:
- Ask (if any):

---

## Troubleshooting tips

- Hydration/UI glitches: ensure Client Components use `"use client"` when using hooks.
- Tailwind classes not applying: verify paths in `tailwind.config.ts`.
- 404 links: ensure routes exist or update header.
- Accessibility: run quick checks (alt text, button types, contrast).
- API contract: confirm request/response fields; standardize names.

---

## License
For educational use in simulation exercises.