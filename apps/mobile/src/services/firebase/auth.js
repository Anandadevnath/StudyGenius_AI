import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Platform } from 'react-native';

import { getFirebaseAuth } from './client';

// Required so the popup/redirect resolves on web.
WebBrowser.maybeCompleteAuthSession();

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

/**
 * Google OAuth client IDs (public). Set these in apps/mobile/.env.
 * See docs/firebase-setup.md for how to create them in Google Cloud.
 */
export const googleClientIds = {
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '',
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '',
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? '',
};

/** @returns {boolean} true when the current platform's Google client ID is set. */
export function isGoogleSignInConfigured() {
  if (Platform.OS === 'android') {
    return Boolean(googleClientIds.androidClientId);
  }
  if (Platform.OS === 'ios') {
    return Boolean(googleClientIds.iosClientId || googleClientIds.webClientId);
  }
  return Boolean(googleClientIds.webClientId);
}

/**
 * React hook for the Google sign-in flow. Returns the prompt function so the
 * screen can trigger it; the credential exchange happens in `signInWithGoogle`.
 *
 * On web the redirect is the app origin (http://localhost:8081); on native it is
 * the app scheme. Each platform's client ID must be registered as an Authorized
 * redirect URI in the Google OAuth client. See docs/firebase-setup.md.
 *
 * Passing an empty client ID makes expo-auth-session throw, which would crash
 * the screen, so this always passes the web client ID as a fallback while the
 * per-platform ID is missing.
 * @returns {[import('expo-auth-session').AuthRequest|null, object|null, () => Promise<{type: string, params?: object}>]}
 */
export function useGoogleAuthRequest() {
  // expo-auth-session throws at render time when the platform-specific client
  // ID is `undefined` (an empty string is accepted). A missing config must
  // never crash the screen, so pass placeholders and block the flow in
  // wrappedPrompt instead. See docs/firebase-setup.md for the real IDs.
  const placeholder = 'unconfigured.apps.googleusercontent.com';
  const [request, , promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: googleClientIds.webClientId || placeholder,
    iosClientId: googleClientIds.iosClientId || placeholder,
    androidClientId: googleClientIds.androidClientId || placeholder,
  });

  const wrappedPrompt = async () => {
    if (!isGoogleSignInConfigured()) {
      throw new Error(
        'Google sign-in is not configured for this platform yet. Use email and password.',
      );
    }
    return promptAsync();
  };

  return [request, null, wrappedPrompt];
}

/**
 * Completes Google sign-in with the ID token returned by the Google prompt.
 * @param {string} idToken
 * @returns {Promise<object>} normalized user
 */
export async function signInWithGoogleIdToken(idToken) {
  try {
    const auth = getFirebaseAuth();
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    return toAuthUser(result.user);
  } catch (error) {
    throw toAuthError(error);
  }
}

export default {
  register,
  login,
  logout,
  sendPasswordReset,
  subscribeToAuthChanges,
  getIdToken,
  signInWithGoogleIdToken,
  isGoogleSignInConfigured,
  toAuthUser,
  toAuthError,
};
