/**
 * services/firebase/auth.js — Firebase Authentication data-access service.
 *
 * Proposal ref: §5.1 (authentication & account), §10.3 (security), §14.
 *
 * This module is the single boundary between the UI and Firebase Auth. Screens
 * and stores call these functions; they never touch the Firebase SDK directly.
 * That keeps screens free of service/data logic (workstream: State management
 * & architecture).
 *
 * SECURITY: only the Firebase client SDK is used here. ID tokens are obtained
 * for authenticating backend AI calls; the token is never logged or persisted
 * by this module.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

import { getFirebaseAuth } from './client';

/**
 * Firebase Auth error codes mapped to safe, user-facing messages.
 * Raw SDK messages are never shown to users (proposal §14).
 */
const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'That email address is already registered.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/missing-password': 'Enter your password.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with that email address.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled.',
};

/**
 * Converts a thrown Firebase Auth error into a safe Error with a user-facing
 * message. Preserves the machine-readable `code` for tests and telemetry.
 * @param {unknown} error
 * @returns {Error}
 */
export function toAuthError(error) {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined;
  const message = (code && AUTH_ERROR_MESSAGES[code]) || 'Something went wrong. Please try again.';
  const safe = new Error(message);
  if (code) {
    safe.code = code;
  }
  return safe;
}

/**
 * Normalizes a Firebase user into the minimal shape the app relies on.
 * @param {import('firebase/auth').User|null} user
 * @returns {{uid: string, email: string|null, displayName: string|null}|null}
 */
export function toAuthUser(user) {
  if (!user) {
    return null;
  }
  return {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
  };
}

/**
 * Registers a new account with email/password.
 * @param {{email: string, password: string, displayName?: string}} params
 * @returns {Promise<object>} normalized user
 */
export async function register({ email, password, displayName }) {
  try {
    const auth = getFirebaseAuth();
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const name = displayName?.trim();
    if (name) {
      await updateProfile(credential.user, { displayName: name });
    }
    return toAuthUser(credential.user);
  } catch (error) {
    throw toAuthError(error);
  }
}

/**
 * Signs in with email/password.
 * @param {{email: string, password: string}} params
 * @returns {Promise<object>} normalized user
 */
export async function login({ email, password }) {
  try {
    const auth = getFirebaseAuth();
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return toAuthUser(credential.user);
  } catch (error) {
    throw toAuthError(error);
  }
}

/** Signs the current user out. */
export async function logout() {
  try {
    await signOut(getFirebaseAuth());
  } catch (error) {
    throw toAuthError(error);
  }
}

/**
 * Sends a password-reset email. Resolves even when the address is unknown, so
 * the flow does not disclose whether an account exists (proposal §14).
 * @param {string} email
 */
export async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(getFirebaseAuth(), email.trim());
  } catch (error) {
    const safe = toAuthError(error);
    // Do not reveal account existence.
    if (safe.code === 'auth/user-not-found') {
      return;
    }
    throw safe;
  }
}

/**
 * Subscribes to auth state changes. Fires immediately with the current user
 * (or null), which restores a persisted session on app start.
 * @param {(user: object|null) => void} callback
 * @returns {() => void} unsubscribe
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(getFirebaseAuth(), (user) => callback(toAuthUser(user)));
}

/**
 * Returns the current user's Firebase ID token for authenticating backend AI
 * requests. Refreshes when near expiry.
 * @returns {Promise<string|null>} ID token, or null when signed out
 */
export async function getIdToken() {
  const auth = getFirebaseAuth();
  if (!auth.currentUser) {
    return null;
  }
  return auth.currentUser.getIdToken();
}

export default {
  register,
  login,
  logout,
  sendPasswordReset,
  subscribeToAuthChanges,
  getIdToken,
  toAuthUser,
  toAuthError,
};
