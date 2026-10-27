# Environment Setup

> **Status:** configuration templates exist. No real credentials are committed.
> Manual steps below are required before features work.

## Prerequisites

| Tool | Minimum | Notes |
| --- | --- | --- |
| Node.js | 22.13 | `.nvmrc` pins 22.13.0; Node 26.x verified working locally. |
| npm | 10+ | Uses npm workspaces. |
| Git | any recent | |
| Java (JDK) | 17 | Only needed for local Android builds. |
| Android SDK / adb | — | Not required for Expo Go; needed for local native builds. |

## Installation

```bash
# from the repository root
npm install          # installs both workspaces (apps/mobile, apps/backend)
```

## Environment files

Two templates exist. Copy each and fill in real values:

| Template | Copy to | Purpose |
| --- | --- | --- |
| `apps/mobile/.env.example` | `apps/mobile/.env` | Public Firebase client config + backend URL |
| `apps/backend/.env.example` | `apps/backend/.env` | Private server-side secrets |

`.env` files are git-ignored and must never be committed.

### Mobile (`apps/mobile/.env`)

```bash
cp apps/mobile/.env.example apps/mobile/.env
```

Fill in the `EXPO_PUBLIC_FIREBASE_*` values from the Firebase console and
`EXPO_PUBLIC_API_BASE_URL` (use the host LAN IP for a physical device).

> **Security:** every `EXPO_PUBLIC_*` value is bundled into the app and is
> **public**. Never put the Gemini API key or Firebase Admin credentials here.

### Backend (`apps/backend/.env`)

```bash
cp apps/backend/.env.example apps/backend/.env
```

Fill in `GEMINI_API_KEY`, `FIREBASE_PROJECT_ID`, and a
`FIREBASE_SERVICE_ACCOUNT_PATH` (or `GOOGLE_APPLICATION_CREDENTIALS`). See
[firebase-setup.md](./firebase-setup.md).

## Complete variable reference (both members)

Every environment variable the app reads, who owns it, and where it lives.

### `apps/mobile/.env` — public (bundled into the app)

| Variable | Owner | Purpose |
| --- | --- | --- |
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Ananda | Firebase web API key (public by design) |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Ananda | Firebase Auth domain |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Ananda | Firebase project ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Ananda | Storage bucket for uploaded files |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Ananda | Firebase sender ID |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Ananda | Firebase app ID |
| `EXPO_PUBLIC_API_BASE_URL` | Shared | Secure AI backend base URL (used by the API client) |

### `apps/backend/.env` — private (server-side only)

| Variable | Owner | Purpose |
| --- | --- | --- |
| `PORT` | Ananda | Express server port (default 4000) |
| `NODE_ENV` | Ananda | `development` / `production` |
| `GEMINI_API_KEY` | Ananda | Google Gemini key — **never** exposed to the client |
| `GEMINI_MODEL` | Ananda | Gemini model name |
| `FIREBASE_PROJECT_ID` | Ananda | Firebase Admin project ID |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Ananda | Path to service-account JSON outside the repo (preferred) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Ananda | Alternative application-default credentials path |
| `ALLOWED_ORIGINS` | Ananda | Comma-separated CORS origins (empty = allow all, dev only) |
| `RATE_LIMIT_WINDOW_MS` | Ananda | Rate-limit window in ms |
| `RATE_LIMIT_MAX` | Ananda | Max requests per window |
| `LOG_LEVEL` | Ananda | Logger level (`debug`, `info`, `warn`, `error`) |

> **Rule of thumb:** anything `EXPO_PUBLIC_*` is public; everything in
> `apps/backend/.env` is private. If a value is a secret, it belongs only in the
> backend and never crosses into the mobile bundle.

## Verify the setup

```bash
npm run dev:backend       # starts the Express server
curl http://localhost:4000/api/health   # {"status":"ok",...}
```

Missing credentials produce clear setup errors, not crashes (see the config
modules under `apps/backend/src/config/`).

## Related docs

- [Firebase setup](./firebase-setup.md)
- [Development workflow](./development-workflow.md)
