'use strict';

const fs = require('fs');
const admin = require('firebase-admin');

const { readEnv } = require('./env');

/**
 * Describes the credential-loading strategy without performing I/O.
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

/** Initializes the Admin app lazily and exactly once. */
function getFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }
  return admin.initializeApp(buildCredentialOptions());
}

function getAdminAuth() {
  getFirebaseAdmin();
  return admin.auth();
}

module.exports = {
  getFirebaseAdminPlan,
  getFirebaseAdmin,
  getAdminAuth,
};
