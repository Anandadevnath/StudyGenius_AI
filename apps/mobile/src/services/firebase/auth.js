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
import { Platform } from 'react-native';

import { getFirebaseAuth } from './client';

/**
 * Loads the Google OAuth modules. On web these work everywhere. On native they
 * pull in Expo native modules that may be absent at runtime (Expo Go), so they
 * are only loaded on web — native Google sign-in requires a development build
 * and stays disabled otherwise. A missing module never crashes the app.
 * @returns {{Google: object|null, WebBrowser: object|null}}
 */
function loadGoogleModules() {
  if (Platform.OS !== 'web') {
    return { Google: null, WebBrowser: null };
  }
  try {
    const WebBrowser = require('expo-web-browser');
    const Google = require('expo-auth-session/providers/google');
    WebBrowser.maybeCompleteAuthSession?.();
    return { Google, WebBrowser };
  } catch (_error) {
    return { Google: null, WebBrowser: null };
  }
}

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

/** @returns {boolean} true when Google sign-in can run on this platform. */
export function isGoogleSignInConfigured() {
  // Google OAuth is wired for web only. Native requires a development build
  // (Expo Go lacks the needed native modules and signing key), so it stays off.
  if (Platform.OS !== 'web') {
    return false;
  }
  return Boolean(googleClientIds.webClientId);
}

/**
 * React hook for the Google sign-in flow. Returns the prompt function so the
 * screen can trigger it; the credential exchange happens in
 * `signInWithGoogleIdToken`. Google is supported on web only; on native the
 * returned prompt throws a clear message (a development build is required).
 * @returns {[object|null, object|null, () => Promise<object>]}
 */
export function useGoogleAuthRequest() {
  const { Google } = loadGoogleModules();
  const available = Boolean(Google?.useIdTokenAuthRequest);

  if (!available) {
    return [null, null, unavailableGoogle];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useConfiguredGoogleRequest(Google);
}

/** Placeholder prompt used when the Google modules cannot be loaded. */
async function unavailableGoogle() {
  throw new Error('Google sign-in is not available in this build. Use email and password.');
}

/**
 * Calls the expo-auth-session Google hook. Split out so the conditional case
 * above never calls a hook itself (rules of hooks).
 */
function useConfiguredGoogleRequest(Google) {
  const placeholder = 'unconfigured.apps.googleusercontent.com';
  // On web, expo-auth-session defaults the redirect to origin + '/', which does
  // not match the registered URI. Pass an explicit redirect that matches the
  // Google Cloud "Authorized redirect URIs" entry.
  const webRedirectUri = Platform.OS === 'web' ? 'http://localhost:8081' : undefined;

  const [request, , promptAsync] = Google.useIdTokenAuthRequest(
    {
      webClientId: googleClientIds.webClientId || placeholder,
      iosClientId: googleClientIds.iosClientId || placeholder,
      androidClientId: googleClientIds.androidClientId || placeholder,
      ...(webRedirectUri ? { redirectUri: webRedirectUri } : {}),
    },
    { native: 'studygeniusai:/oauthredirect' },
  );

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
