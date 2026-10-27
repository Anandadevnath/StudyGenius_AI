/**
 * services/firebase/notes.js — Firestore notes metadata service.
 *
 * Proposal ref: §5.3 (notes), §10 (data model), §10.3 (ownership).
 *
 * Every note document carries `ownerUid`, matching the planned Firestore rule
 * `resource.data.ownerUid == request.auth.uid`. Reads and writes are scoped to
 * the given owner so a user can never see another user's notes.
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from 'firebase/firestore';

import { getFirebaseFirestore } from './client';

const NOTES = 'notes';
export const NOTES_PAGE_SIZE = 20;

/**
 * Creates or replaces a note metadata document.
 * @param {object} params
 * @param {string} params.noteId
 * @param {string} params.ownerUid
 * @param {string} params.title
 * @param {string} params.storagePath
 * @param {string} params.fileType
 * @param {number} [params.size]
 * @returns {Promise<object>} the created note
 */
export async function createNote({ noteId, ownerUid, title, storagePath, fileType, size }) {
  const db = getFirebaseFirestore();
  const payload = {
    noteId,
    ownerUid,
    title,
    filePath: storagePath,
    fileType,
    size: size ?? null,
    status: 'ready',
    createdAt: serverTimestamp(),
  };
  await setDoc(doc(db, NOTES, noteId), payload);
  return payload;
}

/**
 * Lists a user's notes, newest first, with pagination.
 * @param {string} ownerUid
 * @param {{pageSize?: number, cursor?: object|null}} [opts]
 * @returns {Promise<{notes: object[], cursor: object|null}>}
 */
export async function listNotes(ownerUid, opts = {}) {
  const { pageSize = NOTES_PAGE_SIZE, cursor = null } = opts;
  const db = getFirebaseFirestore();

  const constraints = [
    where('ownerUid', '==', ownerUid),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];
  if (cursor) {
    constraints.push(startAfter(cursor));
  }

  const snapshot = await getDocs(query(collection(db, NOTES), ...constraints));
  const notes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  const last = snapshot.docs[snapshot.docs.length - 1] ?? null;
  const nextCursor = snapshot.docs.length === pageSize ? last : null;

  return { notes, cursor: nextCursor };
}

/**
 * Fetches a single note by id. Returns null if it does not exist or is not
 * owned by the caller.
 * @param {string} noteId
 * @param {string} ownerUid
 * @returns {Promise<object|null>}
 */
export async function getNote(noteId, ownerUid) {
  const db = getFirebaseFirestore();
  const snapshot = await getDoc(doc(db, NOTES, noteId));
  if (!snapshot.exists()) {
    return null;
  }
  const data = snapshot.data();
  if (data.ownerUid !== ownerUid) {
    return null;
  }
  return { id: snapshot.id, ...data };
}

/**
 * Deletes a note metadata document. Firestore rules enforce ownership.
 * @param {string} noteId
 */
export async function deleteNote(noteId) {
  const db = getFirebaseFirestore();
  await deleteDoc(doc(db, NOTES, noteId));
}

export default { createNote, listNotes, getNote, deleteNote, NOTES_PAGE_SIZE };
