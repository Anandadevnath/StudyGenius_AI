# Architecture (planned)

> **Status:** Documentation only. Foundation code exists (folder structure,
> config placeholders, health check); no features are implemented.

## Layers (proposal §8)

```
            Mobile UI  (React Native + Expo Router)
                      │
        Feature logic & state  (Zustand, validation, API client)
                      │
   ┌─────────────┬────┴──────────┬─────────────────┐
 Local Cache   Firebase        Firestore      Secure AI Backend
  (SQLite)     Auth            + Storage       (Node/Express)
                                                    │
                                              AI Provider API
                                                 (Gemini)
```

- **Presentation layer:** screens, navigation, reusable components,
  accessibility, UI states.
- **Feature/state layer:** study-item operations, quiz flows, plan editing,
  validation, Zustand stores.
- **Cloud layer:** Firebase Authentication, Firestore records, uploaded files
  (accessed directly from the client via the Firebase JS SDK).
- **AI backend:** verifies Firebase ID tokens, enforces limits, keeps secrets
  server-side, validates requests and responses, returns structured output.
- **Local layer:** selected cached data and drafts in SQLite.
- **Device layer:** camera and image capture, file selection, local reminders.

## Decision: direct Firebase client + AI-only backend

Per the user decision and the proposal's framing, the mobile app uses the
Firebase JS SDK directly for Auth, Firestore, and Storage. The Express backend
is used **only** for Gemini AI calls and Firebase ID-token verification. The
Firestore/Storage security rules are therefore the client-side enforcement
boundary (documented, not yet created).

## Backend hosting

Default: a free-tier Node.js host (proposal §7). Firebase Cloud Functions is
an alternative that may require the paid Blaze plan. No hosting is configured
or provisioned during this setup.

See `docs/architecture/data-model.md` for the planned schema.
