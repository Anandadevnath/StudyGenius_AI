/**
 * services/database/cache.js — SQLite offline cache service.
 *
 * Proposal ref: §11.1 (offline cache), §11 (sync-failure handling, no silent
 * data loss). Caches note metadata and holds pending uploads (drafts) so work
 * survives a failed/absent network.
 *
 * The database handle is injectable so this module can be unit-tested without
 * the native expo-sqlite module. In the app it is created from expo-sqlite.
 */

import { SCHEMA_STATEMENTS } from '../../database/schema';

let dbPromise = null;

/**
 * Lazily opens (and migrates) the cache database.
 * @returns {Promise<object>} the SQLite database handle
 */
export function getCacheDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQLite = require('expo-sqlite');
      const db = await SQLite.openDatabaseAsync('studygenius-cache.db');
      for (const statement of SCHEMA_STATEMENTS) {
        await db.execAsync(statement);
      }
      return db;
    })();
  }
  return dbPromise;
}

/** Test-only: overrides the database handle to inject a fake. */
export function _setCacheDb(handle) {
  dbPromise = Promise.resolve(handle);
}

/** Test-only: clears the cached handle. */
export function _resetCacheDb() {
  dbPromise = null;
}

/**
 * Replaces the cached note list for a user with freshly fetched notes.
 * @param {string} ownerUid
 * @param {object[]} notes
 */
export async function cacheNotes(ownerUid, notes) {
  const db = await getCacheDb();
  const now = new Date().toISOString();

  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM cached_notes WHERE ownerUid = ?', [ownerUid]);
    for (const note of notes) {
      await db.runAsync(
        `INSERT OR REPLACE INTO cached_notes
           (noteId, ownerUid, title, filePath, fileType, status, createdAt, cachedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          note.noteId ?? note.id,
          ownerUid,
          note.title ?? '',
          note.filePath ?? '',
          note.fileType ?? '',
          note.status ?? 'ready',
          note.createdAt ?? now,
          now,
        ],
      );
    }
  });
}

/**
 * Reads cached notes for a user, newest first.
 * @param {string} ownerUid
 * @returns {Promise<object[]>}
 */
export async function getCachedNotes(ownerUid) {
  const db = await getCacheDb();
  return db.getAllAsync('SELECT * FROM cached_notes WHERE ownerUid = ? ORDER BY createdAt DESC', [
    ownerUid,
  ]);
}

/**
 * Records a pending upload (draft) to retry later.
 * @param {object} draft
 */
export async function addPendingUpload(draft) {
  const db = await getCacheDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO pending_uploads
       (noteId, ownerUid, title, localUri, mimeType, size, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      draft.noteId,
      draft.ownerUid,
      draft.title ?? '',
      draft.localUri,
      draft.mimeType ?? '',
      draft.size ?? 0,
      new Date().toISOString(),
    ],
  );
}

/**
 * Lists pending uploads for a user so they can be retried.
 * @param {string} ownerUid
 * @returns {Promise<object[]>}
 */
export async function getPendingUploads(ownerUid) {
  const db = await getCacheDb();
  return db.getAllAsync('SELECT * FROM pending_uploads WHERE ownerUid = ?', [ownerUid]);
}

/**
 * Removes a pending upload once it succeeds.
 * @param {string} noteId
 */
export async function removePendingUpload(noteId) {
  const db = await getCacheDb();
  await db.runAsync('DELETE FROM pending_uploads WHERE noteId = ?', [noteId]);
}

/**
 * Clears all cached data for a user. Called on sign-out so one user's cached
 * records never leak to the next (proposal §14).
 * @param {string} ownerUid
 */
export async function clearUserCache(ownerUid) {
  const db = await getCacheDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM cached_notes WHERE ownerUid = ?', [ownerUid]);
    await db.runAsync('DELETE FROM pending_uploads WHERE ownerUid = ?', [ownerUid]);
  });
}

/** Wipes every cached table (used on sign-out when the uid is unknown). */
export async function clearAllCache() {
  const db = await getCacheDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM cached_notes');
    await db.runAsync('DELETE FROM pending_uploads');
  });
}

export default {
  getCacheDb,
  cacheNotes,
  getCachedNotes,
  addPendingUpload,
  getPendingUploads,
  removePendingUpload,
  clearUserCache,
  clearAllCache,
};
