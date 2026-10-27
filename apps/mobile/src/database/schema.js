/**
 * database/schema.js — SQLite schema for the offline cache.
 *
 * Proposal ref: §11.1 (offline), §11 (selected cache/drafts). Only selected
 * data is cached — note metadata and pending (draft) uploads — not the whole
 * dataset. This is a cache, not the source of truth; Firestore is.
 */

export const SCHEMA_VERSION = 1;

/**
 * Statements to initialize the cache database. Idempotent (IF NOT EXISTS) so
 * running them on every app start is safe.
 * @type {string[]}
 */
export const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS meta (
     key TEXT PRIMARY KEY NOT NULL,
     value TEXT
   );`,
  `CREATE TABLE IF NOT EXISTS cached_notes (
     noteId TEXT PRIMARY KEY NOT NULL,
     ownerUid TEXT NOT NULL,
     title TEXT,
     filePath TEXT,
     fileType TEXT,
     status TEXT,
     createdAt TEXT,
     cachedAt TEXT NOT NULL
   );`,
  `CREATE INDEX IF NOT EXISTS idx_cached_notes_owner
     ON cached_notes (ownerUid, createdAt DESC);`,
  `CREATE TABLE IF NOT EXISTS pending_uploads (
     noteId TEXT PRIMARY KEY NOT NULL,
     ownerUid TEXT NOT NULL,
     title TEXT,
     localUri TEXT,
     mimeType TEXT,
     size INTEGER,
     createdAt TEXT NOT NULL
   );`,
];

export default { SCHEMA_VERSION, SCHEMA_STATEMENTS };
