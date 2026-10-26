# API Structure

> **Status:** only `GET /api/health` exists. AI endpoints are planned and
> **not implemented**.

## Base URL

- Local: `http://localhost:4000` (configurable via `PORT`).
- The mobile client reads it from `EXPO_PUBLIC_API_BASE_URL`.

## Implemented today

| Method | Path | Auth | Response |
| --- | --- | --- | --- |
| GET | `/api/health` | none | `200 { status: "ok", service, timestamp }` |
| GET | `/` | none | `200 { service, docs }` |
| * | `/api/*` (unknown) | none | `404 { error: { status, message } }` |

All responses are JSON. Errors follow `{ error: { status, message } }`.

## Planned endpoints (not implemented)

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/ai/summary` | Firebase ID token | Generate a summary + key points. |
| POST | `/api/ai/quiz` | Firebase ID token | Generate a multiple-choice quiz. |
| POST | `/api/ai/plan` | Firebase ID token | Suggest a study plan. |

These routes will be mounted under `/api` and guarded by the auth middleware
(`src/middleware/auth.js`, currently returns `501`), rate limiting
(`src/middleware/rateLimit.js`), and Zod input validation
(`src/validators/`).

## Conventions

- **Auth**: `Authorization: Bearer <Firebase ID token>`; the backend verifies
  it and derives the user UID.
- **Validation**: request bodies validated with Zod; AI responses validated
  before returning.
- **Errors**: centralized in `src/middleware/errorHandler.js`; production
  responses never leak stack traces or secrets.
- **Rate limits**: applied to the whole `/api` surface; AI endpoints will be
  stricter.

## Code map

| Concern | Location |
| --- | --- |
| App factory | `apps/backend/src/app.js` |
| Server/listener | `apps/backend/src/server.js` |
| Routes | `apps/backend/src/routes/` |
| Controllers | `apps/backend/src/controllers/` |
| Services (Gemini) | `apps/backend/src/services/` |
| Validators | `apps/backend/src/validators/` |
| Middleware | `apps/backend/src/middleware/` |
