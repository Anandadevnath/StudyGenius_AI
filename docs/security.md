# Security

See also the root [`SECURITY.md`](../SECURITY.md). This page summarizes the
security model and where it lives in the code.

> **Status:** foundation only. Rules and token verification are documented and
> stubbed, not enforced yet.

## Principles

- **No secrets in the repository.** `.env`, service-account JSON, keystores,
  and local databases are git-ignored.
- **The client is public.** Anything prefixed `EXPO_PUBLIC_*` is bundled into
  the app. Only Firebase client configuration may live there.
- **Secrets stay server-side.** The Gemini API key and Firebase Admin
  credentials live only in `apps/backend/.env`.
- **Client validation ≠ authorization.** Enforcement happens in Firestore/
  Storage rules and the backend.

## Where things live

| Concern | Location |
| --- | --- |
| Client config validation | `apps/mobile/src/services/firebase/client.js` |
| File-type/size validation | `apps/mobile/src/services/firebase/fileValidation.js` |
| Storage upload/download | `apps/mobile/src/services/firebase/storage.js` |
| Note metadata (`ownerUid`) | `apps/mobile/src/services/firebase/notes.js` |
| Offline cache / drafts | `apps/mobile/src/services/database/cache.js` |
| Backend env validation | `apps/backend/src/config/env.js` |
| Admin credential strategy | `apps/backend/src/config/firebaseAdmin.js` |
| Gemini key handling | `apps/backend/src/config/gemini.js` |
| Token verification | `apps/backend/src/middleware/auth.js` |
| Rate limiting | `apps/backend/src/middleware/rateLimit.js` |
| Safe error responses | `apps/backend/src/middleware/errorHandler.js` |
| Log redaction | `apps/backend/src/utils/logger.js` |

## Authentication and authorization

- Firebase Authentication only — passwords are never stored directly.
- Firestore/Storage rules require auth and `ownerUid` ownership:
  `resource.data.ownerUid == request.auth.uid`. The mobile stores and services
  always write `ownerUid` and scope reads to the signed-in user.
- Storage files live under `notes/<uid>/...`; the given owner UID bounds access.
- The backend verifies the Firebase ID token before accepting AI requests.
- See [firebase-setup.md](./firebase-setup.md) for rule drafts.

## Backend hardening (planned)

- Verify ID tokens; apply rate limits (whole API now, stricter for AI later).
- Validate inputs and AI response schemas with Zod.
- HTTPS only in production; avoid logging private study content (the logger
  redacts auth headers and key fields).
- Return clear errors without secrets or stack traces.

## Git hygiene

- `.gitignore` covers `node_modules/`, build output, `.expo/`, `.env*`
  (except `.env.example`), `*serviceAccount*.json`, `*.keystore`, `*.jks`,
  `google-services.json`, `GoogleService-Info.plist`, and local databases.
- Never commit signing keys; keep the release keystore outside the repository.

## Reporting

This is a course project. Report concerns to the team members listed in the
README.
