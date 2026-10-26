/**
 * Smoke test — verifies the mobile Jest environment is configured.
 *
 * This is environment scaffolding only. It does NOT test any StudyGenius AI
 * feature. If Firebase configuration is absent (expected in CI/local setup),
 * the placeholder config module must raise a clear, understandable error.
 */
import { getFirebaseClientConfig } from '../src/services/firebase/client';

describe('mobile environment smoke test', () => {
  it('has a working test runner', () => {
    expect(true).toBe(true);
  });

  it('placeholder Firebase config raises a clear error when unconfigured', () => {
    // No EXPO_PUBLIC_FIREBASE_* vars are set in the test environment.
    expect(() => getFirebaseClientConfig()).toThrow(/Firebase client configuration is incomplete/);
  });
});
