# services/database/

Expo SQLite offline cache and draft persistence (proposal §11.1).

- `cache.js` — cache service: `cacheNotes`, `getCachedNotes`,
  `addPendingUpload`, `getPendingUploads`, `removePendingUpload`,
  `clearUserCache`, `clearAllCache`. The DB handle is lazily opened and can be
  injected for tests (`_setCacheDb`).

Schema and migrations live in `src/database/schema.js`. Only selected data is
cached — note metadata and pending (draft) uploads — never the whole dataset.
Firestore remains the source of truth.
