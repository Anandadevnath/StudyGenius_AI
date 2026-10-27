# services/firebase/

Firebase client SDK configuration, Authentication, Storage, and Firestore
data access (proposal §5.1, §5.3, §7, §10.3).

- `client.js` — reads Firebase client config from `EXPO_PUBLIC_*` env vars
  (throws a clear error if any are missing) and lazily creates the shared
  Firebase app plus `getFirebaseAuth()`, `getFirebaseFirestore()` and
  `getFirebaseStorage()`.
- `auth.js` — the single boundary between the UI and Firebase Authentication:
  `register`, `login`, `logout`, `sendPasswordReset`,
  `subscribeToAuthChanges`, `getIdToken`, plus `toAuthUser`/`toAuthError`.
  Firebase error codes are mapped to safe, user-facing messages.
- `storage.js` — file upload/download boundary: `uploadNoteFile` (with
  progress) and `deleteNoteFile` (idempotent).
- `fileValidation.js` — allowed MIME types, max file size, `validateNoteFile`,
  and `buildNoteStoragePath` (paths scoped under the owner UID).
- `notes.js` — Firestore note metadata: `createNote`, `listNotes` (paged),
  `getNote`, `deleteNote`. Every document carries `ownerUid`.

## Security

`EXPO_PUBLIC_*` variables are bundled into the mobile app and are public.
Only Firebase client configuration belongs here. The Gemini API key and
Firebase Admin credentials must remain server-side in `backend/`.

- ID tokens are read on demand via `getIdToken()` to authenticate backend AI
  calls. Tokens are never logged or persisted by these modules.
- Password reset resolves without disclosing whether an account exists.
- Raw Firebase SDK error messages are never shown to users.
- Client-side validation is a UX boundary only; Storage/Firestore rules are
  the real enforcement.
