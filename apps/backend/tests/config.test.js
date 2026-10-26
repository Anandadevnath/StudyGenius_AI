/**
 * tests/config.test.js — Placeholder config modules fail clearly when
 * unconfigured (setup check, not a feature test).
 */
'use strict';

const { getGeminiConfig } = require('../src/config/gemini');
const { getFirebaseAdminPlan } = require('../src/config/firebaseAdmin');

describe('placeholder config modules', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.GEMINI_API_KEY;
    delete process.env.FIREBASE_PROJECT_ID;
    delete process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('Gemini config throws a clear error when GEMINI_API_KEY is missing', () => {
    expect(() => getGeminiConfig()).toThrow(
      /Missing required environment variable: GEMINI_API_KEY/,
    );
  });

  it('Firebase Admin plan throws a clear error when credentials are missing', () => {
    process.env.FIREBASE_PROJECT_ID = 'test-project';
    expect(() => getFirebaseAdminPlan()).toThrow(/Firebase Admin credentials are not configured/);
  });
});
