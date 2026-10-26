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

## 4. Security rules (write later)

Rules are the real client-side boundary because the app talks to Firestore
directly. Require auth and enforce `ownerUid` ownership:

```
// Firestore (draft — refine during implementation)
match /notes/{noteId} {
  allow read, write: if request.auth != null
    && request.resource.data.ownerUid == request.auth.uid;
}
```

Storage rules should restrict access to each user's files and validate allowed
paths and file limits where supported. Rules are **created manually** in the
console — not by this repository.

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

## Plan caveat

Some Firebase **Storage** configurations and **Cloud Functions** may require
the paid **Blaze** plan (proposal §7). A free-tier Node.js host is the default
backend plan.

## Data model

The planned collections are documented (not implemented) in
[architecture/data-model.md](./architecture/data-model.md).
