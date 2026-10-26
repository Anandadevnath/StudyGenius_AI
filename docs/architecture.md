# Architecture

> **Status:** foundation only. Folder structure, config placeholders, and a
> health check exist. No application features are implemented.

## Overview

StudyGenius AI uses a **mobile client + secure backend** architecture. The
client handles presentation, navigation, validation, and interaction. Firebase
provides identity and cloud data. AI requests pass through the backend so
provider secrets never reach the device.

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

## Layer responsibilities

| Layer | Responsibility |
| --- | --- |
| Presentation | Screens, navigation, reusable components, accessibility, UI states. |
| Feature/state | Study-item operations, quiz flows, plan editing, validation, Zustand stores. |
| Cloud | Firebase Authentication, Firestore records, uploaded files. |
| AI backend | Verify Firebase ID tokens, enforce limits, keep secrets server-side, validate requests/responses. |
| Local | Selected cached data and drafts in SQLite. |
| Device | Camera/image capture, file selection, local reminder scheduling. |

## Data access model

- The mobile app uses the **Firebase JS SDK directly** for Auth, Firestore,
  and Storage.
- The Express backend is used **only** for Gemini AI calls and Firebase
  ID-token verification.
- Firestore/Storage security rules (requiring auth + `ownerUid` ownership) are
  the client-side enforcement boundary — documented, created manually later.
- The planned Firestore schema (7 collections) is documented in
  [`architecture/data-model.md`](./architecture/data-model.md).

## Code organization

- **Mobile** (`apps/mobile/`): `app/` (Expo Router screens/layouts) plus
  `src/{components,features,services,stores,hooks,constants,database,theme,utils}`.
  UI is separated from business logic; services are injected into stores.
- **Backend** (`apps/backend/`): `src/{config,middleware,routes,controllers,services,validators,utils}`
  with `app.js` (app factory) separated from `server.js` (listener).

## Related docs

- [Data model](./architecture/data-model.md)
- [API structure](./api-structure.md)
- [Security](./security.md)
- [Environment setup](./environment-setup.md)
- [Firebase setup](./firebase-setup.md)
- [Development workflow](./development-workflow.md)
