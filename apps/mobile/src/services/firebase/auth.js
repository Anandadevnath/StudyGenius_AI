import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

import { getFirebaseAuth } from './client';

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
 * Converts a Firebase Auth error into a safe Error with a user-facing message.
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

export async function login({ email, password }) {
  try {
    const auth = getFirebaseAuth();
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return toAuthUser(credential.user);
  } catch (error) {
    throw toAuthError(error);
  }
}

export async function logout() {
  try {
    await signOut(getFirebaseAuth());
  } catch (error) {
    throw toAuthError(error);
  }
}

/** Resolves even when the address is unknown, so it does not reveal account existence. */
export async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(getFirebaseAuth(), email.trim());
  } catch (error) {
    const safe = toAuthError(error);
    if (safe.code === 'auth/user-not-found') {
      return;
    }
    throw safe;
  }
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(getFirebaseAuth(), (user) => callback(toAuthUser(user)));
}

/** @returns {Promise<string|null>} ID token, or null when signed out. */
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
