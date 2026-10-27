# Security Policy — StudyGenius AI

Foundation-stage security notes. Aligned with the proposal's Security and
Privacy section (§14) and the Data Access section (§10.3).

## Secrets handling

- **Never commit secrets.** `.env`, `.env.*` (except `.env.example`),
  service-account JSON, keystores (`*.keystore`, `*.jks`), and local databases
  are git-ignored.
- **Client is public.** Anything prefixed `EXPO_PUBLIC_` is bundled into the
  mobile app. Only Firebase client configuration belongs there. The Gemini API
  key and Firebase Admin credentials must stay server-side in
  `apps/backend/.env`.
- **Backend credentials.** Load Firebase Admin credentials from a
  service-account JSON kept **outside** the repository, via
  `FIREBASE_SERVICE_ACCOUNT_PATH` or `GOOGLE_APPLICATION_CREDENTIALS`. Never
  download or generate fake credentials; never place private keys in the app.
- **No real secrets exist in this repository.** All `.env.example` values are
  descriptive placeholders.

## Authentication and authorization

- Firebase Authentication is used — passwords are never stored directly. The
  mobile app talks to Firebase Auth through `services/firebase/auth.js`; ID
  tokens are read on demand for backend calls and are never logged.
- Firebase SDK error codes are mapped to safe, user-facing messages; raw SDK
  messages are never shown to users. Password reset does not disclose whether
  an account exists.
- The backend verifies the Firebase ID token on protected routes via
  `middleware/auth.js` (`Authorization: Bearer <idToken>`), attaching
  `req.user = { uid, email }`. The token is never logged (logger redacts the
  authorization header).
- User-scoped Firestore and Storage rules
  (`resource.data.ownerUid == request.auth.uid`) are enforced once the
  Firestore/Storage feature lands.
- Client-side validation is not a substitute for server-side authorization.

## API and backend

- Verify Firebase ID tokens and apply rate limits on the AI backend.
- Validate inputs and AI response schemas on both client and server.
- HTTPS only in production; avoid logging private study content.
- Return clear errors without exposing secrets or stack traces.

## Reporting

This is a course project. Report security concerns to the team members listed
in the README.
