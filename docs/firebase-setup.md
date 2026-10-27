# Firebase Setup

> **Status:** manual steps, not performed during scaffolding. No cloud
> resources exist. Nothing below is automated.

## 1. Create the Firebase project

1. In the [Firebase console](https://console.firebase.google.com), create a
   project (free **Spark** plan to start).
2. Register a **Web app** (`</>`), and copy the client config values:
   `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`,
   `appId`.

## 2. Configure the mobile app

Copy `apps/mobile/.env.example` to `apps/mobile/.env` and fill in:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

These six values are **public client configuration** — safe in the app bundle.

## 3. Enable services

- **Authentication**: enable the Email/Password provider (proposal §5.1).
- **Cloud Firestore**: create a database (start in production mode; add rules
  later).
- **Storage**: enable it and note the bucket name.

## 4. Security rules

Rules are the real boundary because the app talks to Firestore/Storage directly.
The rules live in the repository and enforce authentication plus `ownerUid`
ownership:

- [`firestore.rules`](../firestore.rules) — all seven collections; reads/writes
  require `resource.data.ownerUid == request.auth.uid` (creates require
  `request.resource.data.ownerUid == request.auth.uid`); `users/{uid}` is keyed
  by uid; everything else is denied.
- [`storage.rules`](../storage.rules) — files under `notes/{uid}/...`; owner only,
  10 MB max, allowed content types matching the client validation.

Apply them with **either**:

1. **Firebase console (manual, no CLI):** Firestore Database → **Rules** → paste
   `firestore.rules` → **Publish**; then Storage → **Rules** → paste
   `storage.rules` → **Publish**.
2. **Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules,storage:rules --project study-ai-15805
   ```
   (`firebase.json` at the repo root already points at both rule files.)

## 5. Backend Admin credentials

The backend verifies Firebase ID tokens with the Admin SDK. Provide
credentials **without committing them**:

- **Preferred**: download a service-account JSON, keep it **outside the repo**,
  and set `FIREBASE_SERVICE_ACCOUNT_PATH` in `apps/backend/.env`.
- **Alternative**: Application Default Credentials via
  `GOOGLE_APPLICATION_CREDENTIALS`.

> Never commit a service-account JSON. The pattern
> `*serviceAccount*.json` is git-ignored as a safety net. Do not generate fake
> credentials during setup.

## 6. Google Sign-In (optional stretch goal)

The app supports Google sign-in when OAuth client IDs are configured. Without
them the button shows a clear "not configured" message; email/password still
works.

1. **Enable the provider:** Firebase Console → Authentication → Sign-in method →
   **Google** → Enable → Save.
2. **Create OAuth client IDs:** Google Cloud Console → APIs & Services →
   Credentials → **Create credentials → OAuth client ID**:
   - **Web application** → add `http://localhost:8081` (and your deploy origin)
     to Authorized redirect URIs → copy the client ID.
   - **iOS** / **Android** clients if you build native apps.
3. **Add to `apps/mobile/.env`:**
   ```
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=
   ```
4. Restart the dev server. The "Continue with Google" button completes the flow
   through `expo-auth-session` and exchanges the ID token with Firebase.

## Plan caveat

Some Firebase **Storage** configurations and **Cloud Functions** may require
the paid **Blaze** plan (proposal §7). A free-tier Node.js host is the default
backend plan.

## Data model

The planned collections are documented (not implemented) in
[architecture/data-model.md](./architecture/data-model.md).
