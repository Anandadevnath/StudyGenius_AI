# database/

SQLite (expo-sqlite) schema and local persistence helpers for selected offline
data (proposal §11.1).

- `schema.js` — `SCHEMA_VERSION` and idempotent `SCHEMA_STATEMENTS` creating
  `cached_notes` (cache-first note list) and `pending_uploads` (drafts to
  retry). Applied by `services/database/cache.js` when the DB opens.

Firestore remains the source of truth; this is a cache. The planned Firestore
schema is documented in `docs/architecture.md`.
