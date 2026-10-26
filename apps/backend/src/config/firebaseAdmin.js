/**
 * config/firebaseAdmin.js — Firebase Admin SDK configuration (PLACEHOLDER).
 *
 * Proposal ref: §8 (AI backend verifies Firebase ID tokens), §10.3, §14.
 *
 * This module does NOT initialize the Admin SDK and does NOT make network
 * calls. It only describes the credential-loading strategy and raises a
 * clear error if configuration is missing.
 *
 * SECURITY: The Admin service-account credential is a PRIVATE key. It must
 * NEVER be committed to Git and must NEVER be sent to the mobile app. Provide
 * it via FIREBASE_SERVICE_ACCOUNT_PATH (a path outside version control) or
 * GOOGLE_APPLICATION_CREDENTIALS. Do not download or generate fake
 * credentials during setup.
 */

'use strict';

const { readEnv } = require('./env');

/**
 * Returns the strategy for loading Admin credentials without performing I/O.
 * @returns {{projectId: string, strategy: 'service-account-path'|'application-default'}}
 * @throws {Error} if no credential source is configured
 */
function getFirebaseAdminPlan() {
  const projectId = readEnv('FIREBASE_PROJECT_ID', { required: true });
  const serviceAccountPath = readEnv('FIREBASE_SERVICE_ACCOUNT_PATH', { fallback: '' });
  const adcPath = readEnv('GOOGLE_APPLICATION_CREDENTIALS', { fallback: '' });

  if (serviceAccountPath) {
    return { projectId, strategy: 'service-account-path' };
  }
  if (adcPath) {
    return { projectId, strategy: 'application-default' };
  }

  throw new Error(
    'Firebase Admin credentials are not configured. Set ' +
      'FIREBASE_SERVICE_ACCOUNT_PATH (preferred) or GOOGLE_APPLICATION_CREDENTIALS ' +
      'to a service-account JSON file kept OUTSIDE the repository. ' +
      'See the root README "Firebase Admin (backend)" section.',
  );
}

/**
 * Initializes Firebase Admin — NOT IMPLEMENTED YET.
 * Implemented during feature development: initializeApp({ credential:
 * cert(serviceAccount), projectId }) and export admin.auth() for token
 * verification middleware.
 */
function getFirebaseAdmin() {
  // Deliberately unimplemented. Guard the credential plan so callers get a
  // clear setup error instead of a silent undefined.
  getFirebaseAdminPlan();
  throw new Error('Firebase Admin initialization is not implemented yet.');
}

module.exports = { getFirebaseAdminPlan, getFirebaseAdmin };
