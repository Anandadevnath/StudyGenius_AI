/**
 * services/firebase/client.js — Firebase client configuration (PLACEHOLDER).
 *
 * Proposal ref: §7 (stack), §10.3 (security), §14 (secrets).
 *
 * SECURITY: Only EXPO_PUBLIC_* values (Firebase client config) belong here.
 * These are bundled into the mobile app and are NOT secret. NEVER place the
 * Gemini API key, a Firebase Admin private key, or any service-account data
 * in this file or in any EXPO_PUBLIC_* variable.
 *
 * This module is a stub. It does NOT initialize Firebase and does NOT make
 * network calls. It validates that configuration is present and throws a
 * clear, actionable error when it is not, so that missing setup surfaces as
 * an understandable message rather than a confusing crash.
 *
 * Implemented later (NOT now): initializeApp(), getAuth(), getFirestore(),
 * getStorage(). Firebase Auth/Firestore/Storage access will be direct from
 * the client; the backend is used only for AI calls + ID-token verification.
 */

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

export default { getFirebaseClientConfig };
