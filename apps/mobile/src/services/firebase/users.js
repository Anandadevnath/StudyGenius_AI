/**
 * services/firebase/users.js — Firestore user profile service.
 *
 * Proposal ref: §10 (users collection), §16.1 (profile data model — Ananda).
 * The profile document is keyed by the Firebase Auth uid and is the app's
 * source of truth for display name, theme, and account metadata.
 */

import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { getFirebaseFirestore } from './client';

const USERS = 'users';

/**
 * Creates the profile document at registration. Idempotent: a merge keeps an
 * existing profile (e.g. from a previous provider) rather than overwriting it.
 * @param {object} params
 * @param {string} params.uid
 * @param {string} params.email
 * @param {string} [params.displayName]
 * @returns {Promise<object>} the profile payload
 */
export async function createUserProfile({ uid, email, displayName }) {
  const db = getFirebaseFirestore();
  const payload = {
    uid,
    email: email ?? '',
    displayName: displayName ?? '',
    theme: 'light',
    createdAt: serverTimestamp(),
  };
  await setDoc(doc(db, USERS, uid), payload, { merge: true });
  return payload;
}

/**
 * Reads a user's profile. Returns null when it does not exist yet.
 * @param {string} uid
 * @returns {Promise<object|null>}
 */
export async function getUserProfile(uid) {
  const db = getFirebaseFirestore();
  const snapshot = await getDoc(doc(db, USERS, uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

/**
 * Partially updates a user's profile (e.g. display name or theme).
 * @param {string} uid
 * @param {object} changes
 */
export async function updateUserProfile(uid, changes) {
  const db = getFirebaseFirestore();
  await updateDoc(doc(db, USERS, uid), changes);
}

export default { createUserProfile, getUserProfile, updateUserProfile };
