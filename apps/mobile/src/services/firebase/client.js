/**
 * services/firebase/client.js — Firebase client configuration and init.
 *
 * Proposal ref: §7 (stack), §10.3 (security), §14 (secrets).
 *
 * SECURITY: Only EXPO_PUBLIC_* values (Firebase client config) belong here.
 * These are bundled into the mobile app and are NOT secret. NEVER place the
 * Gemini API key, a Firebase Admin private key, or any service-account data
 * in this file or in any EXPO_PUBLIC_* variable.
 *
 * The Firebase app is created lazily and exactly once. Requiring this module
 * has no side effects, so importing it never crashes when configuration is
 * absent; the clear configuration error only surfaces when a feature actually
 * tries to use Firebase.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const requiredPublicEnvKeys = [
  'EXPO_PUBLIC_FIREBASE_API_KEY',
  'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
  'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'EXPO_PUBLIC_FIREBASE_APP_ID',
];

/**
 * Reads Firebase client config from EXPO_PUBLIC_* environment variables.
 * @returns {object} the config object
 * @throws {Error} if any required variable is missing
 */
export function getFirebaseClientConfig() {
  const missing = requiredPublicEnvKeys.filter(
    (key) => !process.env[key] || process.env[key].trim() === '',
  );

  if (missing.length > 0) {
    throw new Error(
      'Firebase client configuration is incomplete.\n' +
        `Missing EXPO_PUBLIC_* variables: ${missing.join(', ')}\n` +
        'Create a .env file in mobile/ (copy mobile/.env.example) and fill in ' +
        'the values from your Firebase project settings. See docs/setup/ and ' +
        'the root README "Firebase configuration" section.\n' +
        'These are public client values — never put private keys here.',
    );
  }

  return {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  };
}

/**
 * Returns the singleton Firebase app, initializing it on first use.
 * @returns {import('firebase/app').FirebaseApp}
 */
export function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(getFirebaseClientConfig());
}

/** @returns {import('firebase/auth').Auth} the shared Firebase Auth instance. */
export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

/** @returns {import('firebase/firestore').Firestore} the shared Firestore instance. */
export function getFirebaseFirestore() {
  return getFirestore(getFirebaseApp());
}

/** @returns {import('firebase/storage').FirebaseStorage} the shared Storage instance. */
export function getFirebaseStorage() {
  return getStorage(getFirebaseApp());
}

export default {
  getFirebaseClientConfig,
  getFirebaseApp,
  getFirebaseAuth,
  getFirebaseFirestore,
  getFirebaseStorage,
};
