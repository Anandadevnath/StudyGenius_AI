/**
 * config/firebaseAdmin.js — Firebase Admin SDK configuration.
 *
 * Proposal ref: §8 (AI backend verifies Firebase ID tokens), §10.3, §14.
 *
 * SECURITY: The Admin service-account credential is a PRIVATE key. It must
 * NEVER be committed to Git and must NEVER be sent to the mobile app. Provide
 * it via FIREBASE_SERVICE_ACCOUNT_PATH (a path outside version control) or
 * GOOGLE_APPLICATION_CREDENTIALS (application-default credentials).
 *
 * The Admin app is initialized lazily and exactly once, so requiring this
 * module has no side effects and tests can import it without credentials.
 */

'use strict';

const fs = require('fs');
const admin = require('firebase-admin');

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
 * Builds credential options from the configured strategy.
 * @returns {{projectId: string, credential: import('firebase-admin').credential.Credential}}
 */
function buildCredentialOptions() {
  const plan = getFirebaseAdminPlan();

  if (plan.strategy === 'service-account-path') {
    const serviceAccountPath = readEnv('FIREBASE_SERVICE_ACCOUNT_PATH', { required: true });
    const raw = fs.readFileSync(serviceAccountPath, 'utf8');
    const serviceAccount = JSON.parse(raw);
    return {
      projectId: plan.projectId,
      credential: admin.credential.cert(serviceAccount),
    };
  }

  return {
    projectId: plan.projectId,
    credential: admin.credential.applicationDefault(),
  };
}

/**
 * Initializes and returns the Firebase Admin app (singleton, lazy).
 * @returns {import('firebase-admin').app.App}
 */
function getFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }
  return admin.initializeApp(buildCredentialOptions());
}

/**
 * @returns {import('firebase-admin').auth.Auth} the Admin Auth instance.
 */
function getAdminAuth() {
  getFirebaseAdmin();
  return admin.auth();
}

/** Test-only: resets the cached Admin app so a fresh config can be loaded. */
function _resetFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return Promise.all(admin.apps.map((app) => app.delete()));
  }
  return Promise.resolve();
}

module.exports = {
  getFirebaseAdminPlan,
  getFirebaseAdmin,
  getAdminAuth,
  _resetFirebaseAdmin,
};
