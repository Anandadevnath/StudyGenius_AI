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
 * Reads Firebase client config from EXPO_PUBLIC_* env vars.
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

export function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(getFirebaseClientConfig());
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

export function getFirebaseFirestore() {
  return getFirestore(getFirebaseApp());
}

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
