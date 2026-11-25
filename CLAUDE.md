# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

StudyGenius AI is a CSE 464 course project: an Expo mobile app for turning study notes into AI summaries, quizzes and study plans. `INSTRUCTIONS.md` holds the team's agent rules (workflow, definition of done, git safety). Read it before any task.

## Commands

Run from the repo root. npm workspaces: `apps/mobile`, `apps/backend`. Node >= 22.13 (`.nvmrc`).

```bash
npm install              # installs both workspaces
npm run dev              # mobile (Expo) + backend together via concurrently
npm run dev:mobile       # expo start
npm run dev:backend      # node --watch src/server.js (port 4000)
npm run lint             # ESLint, both workspaces (lint:mobile / lint:backend)
npm test                 # Jest, both workspaces (test:mobile / test:backend)
npm run format:check     # Prettier
```

Single test file or test name:

```bash
npm test --workspace apps/mobile -- __tests__/notesStore.test.js
npm test --workspace apps/backend -- tests/auth.test.js -t "header is absent"
```

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`, `npm test` on pushes/PRs to `main` and `dev`. Tests need no secrets.

## Language note

The code is **plain JavaScript**, not TypeScript. Mobile uses ES modules (`.js` files with JSX). Backend is CommonJS (`'use strict'`, `require`). `INSTRUCTIONS.md` says "TypeScript everywhere"; follow the existing JS code unless told to migrate. Mobile imports are relative; the `@/*` alias in `jsconfig.json` is unused.

## Architecture

```
Mobile (Expo Router, Zustand) ──► Firebase JS SDK directly (Auth, Firestore, Storage)
        │                     ──► SQLite cache (expo-sqlite)
        └──► Express backend ──► Gemini (@google/genai)
```

- The mobile app talks to Firebase **directly**. The backend exists only to hold the Gemini key and verify Firebase ID tokens. Do not route CRUD through the backend.
- Secrets: `EXPO_PUBLIC_*` vars in `apps/mobile/.env` are bundled and public. The Gemini key and Firebase Admin credentials belong only in `apps/backend/.env`. Templates: `.env.example` in each app.

### Mobile (`apps/mobile`)

- **Routing**: Expo Router in `app/`. Groups: `(auth)` (login/register/forgot-password), `(tabs)` (Home, Library, Planner, Progress, Profile), plus `summary/` and `quiz/` stack screens. `app/_layout.js` loads fonts, wraps `SafeAreaProvider > ThemeProvider > ToastProvider`, calls `useAuthStore.bootstrap()`, and runs the auth redirect guard (welcome `index` and `(auth)` are public; everything else requires `status === 'signedIn'`).
- **Layering**: screens → `src/stores/` (Zustand: `authStore`, `notesStore`) → `src/services/` (`firebase/` auth, notes, storage, users, fileValidation; `database/cache.js`). Screens should not call Firebase directly.
- **Firebase client** (`services/firebase/client.js`) initializes lazily and throws a clear error when env config is missing; `authStore.bootstrap` catches this and falls back to `signedOut` so the UI still renders without `.env`.
- **Auth errors**: `services/firebase/auth.js` maps Firebase error codes to user-facing messages (`toAuthError`). Stores keep `error` and `actionPending` state and rethrow.
- **Notes**: `notesStore` is cache-first (SQLite), paginated (`NOTES_PAGE_SIZE`), and saves a pending-upload draft when an upload fails. Storage paths are scoped under the owner UID.
- **Mock data**: most screens (Home, Library, Planner, Progress, Summary, Quiz) still render from `src/data/mockData.js`. Wiring them to real stores and the AI backend is ongoing work.
- **UI**: use the shared components in `src/components/` and theme tokens from `useTheme()` (`src/theme/`, "Cognitive Luminary" design: indigo/cyan, Plus Jakarta Sans + Inter, 8-pt grid, >= 48 dp touch targets). Use `useToast()` for feedback and `ConfirmDialog` for destructive actions. Feature-specific pieces live in `src/features/<feature>/`.
- **Tests** (`__tests__/`, `jest-expo` preset): Firebase modules and `services/firebase/client` are mocked with `jest.mock`; the SQLite handle is swapped via `_setCacheDb` / `_resetCacheDb` in `cache.js`.

### Backend (`apps/backend`)

- `src/app.js` is an app factory (`createApp`); `src/server.js` loads dotenv and binds the port. Tests use `supertest` against `createApp()`.
- Middleware order: helmet → CORS allowlist (`ALLOWED_ORIGINS`, empty = allow all) → JSON (1 MB) → pino-http → rate limiter → `/api` router → 404 → central `errorHandler` (hides 5xx messages and stacks in production).
- Routes: `GET /api/health`, `GET /api/auth/me` (behind `requireAuth`). `requireAuth` (`middleware/auth.js`) verifies `Authorization: Bearer <Firebase ID token>` via Firebase Admin and sets `req.user`. AI routes are meant to mount as `router.use('/ai', requireAuth, aiRouter)`.
- Config goes through `config/env.js` (`readEnv` throws a clear message for missing required vars). `config/gemini.js` and `config/firebaseAdmin.js` fail clearly when unconfigured. `tests/setupEnv.js` deliberately leaves Gemini/Firebase creds unset.
- Error shape: `{ error: { status, message } }`. Validation library: `zod`.

### Firebase rules

`firestore.rules` and `storage.rules` at the root (deployed with `firebase deploy --only firestore:rules` / `storage`). Every user-owned document carries `ownerUid`; rules require `ownerUid == request.auth.uid` on read/write and forbid changing ownership. `users/{uid}` is keyed by uid. New collections need a matching rule block (default is deny-all). Planned schema: `docs/architecture/data-model.md`.

## Docs

`docs/` covers architecture, API structure, environment and Firebase setup, and security. `README.md` "Implemented so far" / "Not implemented yet" tracks feature status; update it when a feature lands.
