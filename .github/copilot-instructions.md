# Copilot / AI Agent Instructions

Purpose: Quickly onboard an AI coding agent to make safe, focused changes in this repository.

- **Big picture**: This is a Next.js 14 (App Router) single-page app that runs the UI client-side and exposes server API routes for AI operations. Key folders:
  - [src/app](src/app) — App routes and pages (builder, chat, dashboard)
  - [src/app/api](src/app/api) — Server API endpoints (AI + streaming chat)
  - [src/components](src/components) — UI components and templates
  - [src/lib](src/lib) — Core utilities (AI wrappers, store, parser, exporter, validation)

- **Where AI lives**:
  - Server-side API: [src/app/api/ai/route.ts](src/app/api/ai/route.ts) — canonical place to change system prompts, model, or request shape. Edits here control production AI behaviour.
  - Client helpers: [src/lib/ai.ts](src/lib/ai.ts) — convenience wrappers used by UI code; prefers Anthropic (if NEXT_PUBLIC_ keys present) and falls back to OpenAI. Use it for small local helper changes but keep production prompts in the API route.

- **State & validation**:
  - State: [src/lib/store.ts](src/lib/store.ts) — Zustand store used across the builder and preview. Mutations are centralized as methods (addExperience, saveVersion, etc.).
  - Validation: [src/lib/validation.ts](src/lib/validation.ts) — Zod schemas define the resume shape and defaults. When adding fields, update both `types.ts` and `validation.ts`.

- **Templates & preview**:
  - Templates live under [src/components/templates](src/components/templates). Add new templates by exporting a React component accepting the resume shape. Update `TemplateSelector.tsx` and `Preview.tsx` to surface it.
  - PDF export logic: [src/lib/export.ts](src/lib/export.ts) — uses `html2canvas` + `jsPDF`. Export captures the rendered preview element; ensure preview DOM is deterministic before capture.

- **Parsing & import/export**:
  - Resume parsing: [src/lib/parser.ts](src/lib/parser.ts) — plain-text / JSON parsing heuristics. PDF parsing is intentionally not implemented (server-side required).
  - JSON/text export functions are also in `parser.ts`.

- **Dev workflows / useful commands** (from package.json):
  - Install: `npm install`
  - Start dev server: `npm run dev` (Next dev on localhost:3000)
  - Build: `npm run build` and `npm run start` for production
  - Lint: `npm run lint`

- **Environment / secrets**:
  - Primary server-side key: `OPENAI_API_KEY` (used in [src/app/api/ai/route.ts](src/app/api/ai/route.ts)).
  - Optional client-side fallbacks: `NEXT_PUBLIC_OPENAI_API_KEY`, `NEXT_PUBLIC_ANTHROPIC_API_KEY`, `NEXT_PUBLIC_ANTHROPIC_MODEL` — used by `src/lib/ai.ts` for experiments but prefer server route for safe key handling.
  - Default model env: `OPENAI_MODEL` or `NEXT_PUBLIC_OPENAI_MODEL` (defaults in code: `gpt-4o-mini`).

- **Patterns & conventions specific to this repo**:
  - API prompt editing: Edit system/user prompt text directly in [src/app/api/ai/route.ts](src/app/api/ai/route.ts) to change behavior. The route maps `action` strings (e.g. `rewrite-bullets`, `generate-summary`) to prompt templates — keep those action names stable when changing UI callers.
  - State migrations: `useResumeStore.loadFromLocal` merges persisted data with `DEFAULT_RESUME` to handle schema evolution — prefer additive changes to `types.ts`/`validation.ts` to avoid breaking existing local storage.
  - Client vs server responsibilities: Rendering, validation, and local storage live on the client; all AI network calls for production code are routed through `src/app/api/ai/route.ts` to keep secrets server-side.
  - Export reliability: `exportToPdf` uses `scale: 3` and explicit `windowWidth/windowHeight`; if PDFs look wrong, adjust sizing there rather than the UI.

- **Where to make small changes vs large changes**:
  - Small UX tweak (labels, layout) → modify components in `src/components` or pages under `src/app`.
  - Change AI behavior or add actions → update `src/app/api/ai/route.ts` and the UI callers that pass `action` + `data`.
  - Add new template → add component in `src/components/templates`, register in `TemplateSelector.tsx`, then verify rendering in `Preview.tsx` and PDF export.

- **Examples** (copy/paste-ready edits):
  - To change the 'rewrite bullets' system prompt, edit the `rewrite-bullets` case in [src/app/api/ai/route.ts](src/app/api/ai/route.ts).
  - To add a new AI action `suggest-skills`, add a new `case 'suggest-skills'` block in that same file and update any UI that calls `/api/ai` with `action: 'suggest-skills'`.

- **Quick checks before creating PRs**:
  - Run `npm run dev` and exercise `/builder` flows that hit AI endpoints.
  - Confirm `OPENAI_API_KEY` is set for server tests; client-only NEXT_PUBLIC keys are not sufficient for `src/app/api/ai/route.ts`.
  - Verify localStorage migration by saving a resume, changing a small field in `types.ts`, and reloading.

If anything here is unclear or you want more detail about a specific file or flow, tell me which area to expand and I will iterate.
