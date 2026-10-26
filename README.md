# StudyGenius AI — Personal Learning Assistant

Course: **CSE 464 – Mobile App Development**, Fall 2026, East Delta University.

StudyGenius AI is a proposed cross-platform learning assistant that helps
university students turn study materials into revision resources: upload
supported notes, generate AI summaries, create practice quizzes, organize
study plans, and review learning progress in one mobile app. AI-generated
content is presented as a study aid, not a replacement for course materials
or instructor guidance.

> **Status: environment foundation only.** This repository contains the
> project scaffolding, dependencies, configuration templates, and minimal
> smoke-test code. **No application features are implemented yet.** See
> "Not implemented yet" below.

## Team

| Name | ID | Role |
| --- | --- | --- |
| Ananda Dev Nath | 222002112 | Team Lead, Backend Developer |
| Rafshia Mahbuba Ayshe | 241012512 | UI/UX Designer, Frontend Developer, QA |

> **Open item:** the course specifies groups of three to four; this is a
> two-member team pending written instructor approval (proposal §16).

## Architecture overview

```
            Mobile UI  (React Native + Expo Router)
                      │
        Feature logic & state  (Zustand, validation, API client)
                      │
   ┌─────────────┬────┴──────────┬─────────────────┐
 Local Cache   Firebase        Firestore      Secure AI Backend
  (SQLite)     Auth            + Storage       (Node/Express)
                                                    │
                                              AI Provider API (Gemini)
```

- The mobile app uses the Firebase JS SDK **directly** for Authentication,
  Firestore, and Storage.
- The Express backend is used **only** for Google Gemini AI calls and Firebase
  ID-token verification, so provider secrets stay server-side.
- Detailed docs: `docs/architecture/README.md` and
  `docs/architecture/data-model.md` (planned schema, documented only).

## Folder structure

```
StudyGenius-AI/
├── apps/
│   ├── mobile/                 # Expo app (JavaScript, Expo Router)
│   │   ├── app/                # Router screens/layouts (placeholders)
│   │   │   ├── _layout.js  index.js
│   │   │   ├── (auth)/         # login, register, forgot-password
│   │   │   ├── (tabs)/         # 5 tabs: Home, Library, Planner, Progress, Profile
│   │   │   ├── summary/  quiz/ # AI screens (placeholders)
│   │   │   └── ...
│   │   ├── src/
│   │   │   ├── components/     # reusable UI
│   │   │   ├── features/       # auth, library, summaries, quizzes, planner, progress
│   │   │   ├── services/       # firebase, api, database, notifications
│   │   │   ├── stores/  hooks/  constants/  database/
│   │   │   └── theme/  utils/
│   │   ├── assets/             # images, icons, fonts (placeholder PNGs)
│   │   ├── __tests__/          # Jest smoke test
│   │   ├── app.json  eas.json  babel.config.js  eslint.config.js
│   │   ├── jest.config.js  jsconfig.json  package.json  .env.example
│   └── backend/                # Node/Express secure AI backend
│       ├── src/
│       │   ├── config/         # env, firebaseAdmin, gemini (placeholders)
│       │   ├── middleware/     # auth, rateLimit, errorHandler
│       │   ├── routes/         # health (+ placeholder API surface)
│       │   ├── controllers/  services/ (geminiService)  validators/  utils/
│       │   └── app.js  server.js
│       ├── tests/              # health + config tests
│       ├── eslint.config.js  jest.config.js  package.json  .env.example
├── docs/                       # architecture, api, setup, security, screenshots
├── scripts/
├── .github/workflows/ci.yml    # optional CI (lint + tests)
├── eslint.config.js  .prettierrc.json  .prettierignore
├── .gitignore  .editorconfig  .gitattributes  .nvmrc
├── package.json                # npm workspaces root
├── README.md  SECURITY.md
```

## Required software and versions

Verified on the setup machine:

| Tool | Version used | Notes |
| --- | --- | --- |
| Node.js | v26.7.0 | `.nvmrc` pins `22.13.0` (Expo SDK 58 minimum). Node 22.13+ works. |
| npm | 11.19.0 | |
| Git | 2.53.0 | |
| Java (JDK) | OpenJDK 17.0.20.1 | Required for Android builds. |
| Android SDK / adb | **not installed** | See "Limitations". |

## Installed dependency versions

Recorded from `npm ls` after installation (this list must be updated when
dependencies change).

### mobile

| Package | Version |
| --- | --- |
| expo | 58.0.19 |
| react-native | 0.88.0 |
| react | 19.3.0 |
| expo-router | 58.0.26 |
| expo-constants | 58.0.13 |
| expo-linking | 58.0.14 |
| expo-status-bar | 58.0.4 |
| react-native-safe-area-context | 5.10.1 |
| react-native-screens | 4.30.0 |
| firebase | 13.1.0 |
| zustand | 5.0.16 |
| expo-sqlite | 58.0.14 |
| expo-document-picker | 58.0.4 |
| expo-image-picker | 58.0.10 |
| expo-notifications | 58.1.6 |
| jest | 30.5.2 |
| jest-expo | 58.0.12 |
| @testing-library/react-native | 13.3.3 |
| react-test-renderer | 19.3.0 |
| eslint | 9.39.5 |
| eslint-config-expo | 58.0.4 |

### backend

| Package | Version |
| --- | --- |
| express | 5.3.0 |
| @google/genai | 2.31.0 |
| firebase-admin | 14.5.0 |
| cors | 2.8.6 |
| helmet | 8.3.0 |
| express-rate-limit | 8.7.1 |
| zod | 4.6.7 |
| dotenv | 18.0.9 |
| pino | 10.4.0 |
| pino-http | 11.0.0 |
| jest | 30.5.2 |
| supertest | 7.3.1 |
| eslint | 9.39.5 |
| @eslint/js | 9.39.5 |
| globals | 17.13.0 |

> `@google/genai` is the current Google Gen AI SDK. The final Gemini **model**
> is chosen at backend implementation time (proposal §12.4); `GEMINI_MODEL`
> defaults to `gemini-2.5-flash` in `.env.example` and is provisional.

## Linux setup

```bash
# 1. Use a compatible Node version (Node 22.13+; the setup machine used 26.7.0)
nvm install   # reads .nvmrc (22.13.0) if you use nvm
# or: nvm use 26.7.0

# 2. From the repository root, install all workspaces at once
npm install
```

`npm install` at the root installs both `apps/mobile/` and `apps/backend/` via
npm workspaces.

## How to start the mobile app

```bash
# from the repository root
npm run dev:mobile      # -> expo start

# or directly in apps/mobile/
cd apps/mobile
npx expo start          # press 'a' for Android, 'w' for web, scan QR for Expo Go
```

## How to start the backend

```bash
# from the repository root
npm run dev:backend     # -> node --watch src/server.js

# or directly in apps/backend/
cd apps/backend
npm start               # node src/server.js
```

To run **both** at once (single terminal, labeled output):

```bash
npm run dev             # mobile + backend via concurrently
```

Health check:

```bash
curl http://localhost:4000/api/health
# {"status":"ok","service":"studygenius-ai-backend","timestamp":"..."}
```

## Environment variables

Two templates exist; **both contain only placeholders** and are committed.

- `apps/mobile/.env.example` → copy to `apps/mobile/.env`
- `apps/backend/.env.example` → copy to `apps/backend/.env`

`.env` files are git-ignored.

**Security rule:** `EXPO_PUBLIC_*` variables are bundled into the mobile app
and are **public**. Never put the Gemini API key, a Firebase Admin private
key, or any service-account credential in `apps/mobile/.env`. Those belong only
in `apps/backend/.env`.

See [docs/environment-setup.md](docs/environment-setup.md) for the full guide.

### Values you must fill in manually later

**Mobile (`apps/mobile/.env`)** — Firebase client config (Project settings →
General → Your apps):
`EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`,
`EXPO_PUBLIC_FIREBASE_PROJECT_ID`, `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`,
`EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `EXPO_PUBLIC_FIREBASE_APP_ID`,
`EXPO_PUBLIC_API_BASE_URL`.

**Backend (`apps/backend/.env`)** — `GEMINI_API_KEY`, `GEMINI_MODEL`,
`FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT_PATH` (or
`GOOGLE_APPLICATION_CREDENTIALS`), `ALLOWED_ORIGINS`, rate-limit values.

## Firebase and Gemini configuration (later steps)

These are **not** performed in this setup and no cloud resources exist yet.
Full guide: [docs/firebase-setup.md](docs/firebase-setup.md).

1. **Firebase** (manual, in the Firebase console):
   - Create a Firebase project (free Spark tier to start).
   - Enable Authentication (Email/Password), Cloud Firestore, and Storage.
   - Register a web app and copy the client config into `apps/mobile/.env`.
   - Write Firestore/Storage security rules requiring auth and user
     ownership (`resource.data.ownerUid == request.auth.uid`).
   - Download a service-account JSON **only if** backend token verification is
     needed; keep it outside the repo and point
     `FIREBASE_SERVICE_ACCOUNT_PATH` at it. Do not commit it.
   - Note: some Firebase Storage configurations and Cloud Functions may
     require the paid **Blaze** plan (proposal §7). The default backend host
     is a free-tier Node.js host.

2. **Gemini** (manual):
   - Obtain an API key from Google AI Studio.
   - Put it in `apps/backend/.env` as `GEMINI_API_KEY`. Never expose it to the
     client.

## Lint, format, and test commands

```bash
# from the repository root
npm run dev             # start mobile + backend together
npm run dev:mobile      # Expo dev server only
npm run dev:backend     # Express only
npm run lint            # ESLint: mobile + backend
npm run test            # Jest: mobile + backend
npm run lint:mobile     # ESLint mobile only
npm run test:backend    # Jest backend only
npm run format          # Prettier: write formatting fixes
npm run format:check    # Prettier: verify formatting (no writes)
```

Formatting uses Prettier (config in `.prettierrc.json`; ignores in
`.prettierignore`). ESLint handles code-quality rules; Prettier handles
formatting. `npm run format:check` is a good pre-commit/CI check.

Backend smoke test: `GET /api/health` returns `200 {status:"ok"}`.
Mobile smoke test: confirms the Jest environment works and that the
placeholder Firebase config raises a clear error when unconfigured.

## Android emulator or physical-device setup

- **Emulator:** requires the Android SDK and platform-tools (`adb`), and an
  AVD. These are **not installed** on the setup machine (see Limitations).
- **Physical device (recommended here):** install **Expo Go** from the Play
  Store and scan the QR code from `npx expo start`. The phone must be on the
  same network as the development machine. For the backend, set
  `EXPO_PUBLIC_API_BASE_URL` to the machine's **LAN IP** (e.g.
  `http://192.168.1.50:4000`), not `localhost`.
- Cross-platform note: the course requires Android and iOS evidence
  (proposal §18). iOS testing needs the iOS Simulator on a Mac; alternatives
  must be discussed with the instructor.

## EAS build preparation

`apps/mobile/eas.json` defines `development`, `preview`, and `production` Android
profiles. **No EAS build has been run** (they are cloud/paid; not permitted
during setup). Later:

```bash
npm install -g eas-cli     # or use npx eas-cli
eas login
cd apps/mobile
eas build:configure
eas build --profile development --platform android   # dev client
eas build --profile production  --platform android   # signed release (AAB)
```

A signed Android release APK (proposal §20) is produced in a later phase
using a release keystore stored securely outside the repository.

## Security precautions

See `SECURITY.md`. Key points: never commit secrets (`.env`, service-account
JSON, keystores are git-ignored); `EXPO_PUBLIC_*` is public; keep the Gemini
key and Firebase Admin credentials server-side only; enforce Firestore/Storage
rules; verify ID tokens and rate-limit the backend; validate inputs and AI
response schemas.

## Implemented so far

Foundation plus the authentication/service layer:

- **Firebase client + Auth service** (`apps/mobile/src/services/firebase/`):
  lazy Firebase app init and an authentication boundary (`register`, `login`,
  `logout`, `sendPasswordReset`, `subscribeToAuthChanges`, `getIdToken`) that
  maps Firebase error codes to safe, user-facing messages.
- **`authStore`** (`apps/mobile/src/stores/authStore.js`): session state
  (`user`, `status`, `error`, `actionPending`) with session bootstrap.
- **Backend ID-token verification** (`apps/backend/src/middleware/auth.js` and
  `config/firebaseAdmin.js`): `requireAuth` verifies `Authorization: Bearer
  <idToken>` via Firebase Admin, with an authenticated probe at
  `GET /api/auth/me`.
- Tests: auth middleware (backend) and auth service/store (mobile) are covered
  by `npm test`.

Not yet wired to UI: the login/register/reset screens remain placeholders and
will call `authStore` in the next step.

## Not implemented yet

No other StudyGenius AI features exist yet. Specifically, none of the
following are implemented:

- Firestore CRUD, real data schemas, security rules (§10).
- File upload/parsing, camera capture, Firebase Storage (§5.3, §11).
- AI summary generation (§5.4).
- Quiz generation, scoring, attempts (§5.5).
- Study planner and AI schedule suggestions (§5.6).
- Progress tracking and statistics (§5.7).
- Reminder scheduling / notifications (§5.8).
- Offline caching and synchronization (§11.1).
- Real UI screens, styling, components (§6, §12).
- The Figma prototype, data model diagram, app icon, feature graphic,
  screenshots, APK, and final report (deliverables for later phases).

The mobile routes are still **placeholder screens**; the backend exposes
`/api/health` and the authenticated `/api/auth/me` probe. Placeholder Firebase
and Gemini config modules intentionally raise clear setup errors when
unconfigured.

## Future development stages (checklist)

Not started — recorded for later. Milestones follow the proposal's 12-week
plan (§17).

- [ ] Week 1–2: GitHub repository, branches, README structure; Figma
      wireframes; team-size approval.
- [ ] Week 3: Stack declaration; 5+ Figma wireframes.
- [ ] Weeks 4–5: Expo config, navigation, theme, reusable UI, Zustand;
      Firebase auth + Firestore with security rules.
- [ ] Week 6 (mid-term): data model diagram, state management plan; notes
      upload and library.
- [ ] Weeks 7–8: secure AI backend; summary and quiz workflows.
- [ ] Week 9: study planner, progress history, reminders.
- [ ] Week 10: SQLite caching, responsive/accessibility polish, unit and
      component tests.
- [ ] Week 11: release APK signing, icon, feature graphic, screenshots, iOS
      simulator check.
- [ ] Week 12: final report, README, testing report, live demo.

## Design system

The UI uses the "Cognitive Luminary" system (proposal §12.6): indigo/cyan
palette (primary `#4F46E5` light / `#818CF8` dark, AI accent `#06B6D4` /
`#22D3EE`), Plus Jakarta Sans headings/body and Inter labels, an 8-pt grid,
and ≥48 dp touch targets. Tokens live in `apps/mobile/src/theme/` as documented
constants only.

## Figma prototype

Design tool for final submission is Figma (proposal §12).
Prototype link (placeholder — to be replaced):
`https://www.figma.com/design/KX2EFsCv3iVJqYHxW1BpI7/Untitled`

## Credits and licenses

- Built with React Native, Expo, Expo Router, Firebase, Zustand, Express,
  Google Gemini (@google/genai), Jest, and React Native Testing Library. See
  each package's license.
- **AI-assistant disclosure (proposal §23):** AI coding assistants were used
  to prepare this project foundation. Every member will be able to explain all
  submitted code. Open-source libraries are credited here and, where reused,
  their licenses noted.

## Limitations

- **No Android SDK / adb / watchman** on the setup machine: the Android
  emulator and local native builds cannot run here. No Android tooling was
  installed automatically (per instruction). Use Expo Go on a physical device.
- **No real credentials** exist; Firebase and Gemini configuration is manual
  and deferred. No remote Firebase/GCP resources were created.
- **No EAS build** was run (cloud/paid).
- **Node 26** is newer than Expo SDK 58's documented minimum (22.13); no
  issues appeared during setup, but Node 22 LTS is the documented fallback.
- `npm audit` reports high-severity advisories in the transitive dependency
  tree (development tooling). Not addressed automatically; review before
  adding production deployment.
