/**
 * tests/auth.test.js — Firebase ID-token verification middleware.
 *
 * Covers: missing token, malformed header, valid token, invalid token, and a
 * misconfigured Admin path. Admin Auth is mocked so tests need no real
 * credentials or network access.
 */
'use strict';

const request = require('supertest');

jest.mock('../src/config/firebaseAdmin', () => ({
  getAdminAuth: jest.fn(),
}));

const { getAdminAuth } = require('../src/config/firebaseAdmin');
const { extractBearerToken } = require('../src/middleware/auth');
const createApp = require('../src/app');

describe('extractBearerToken', () => {
  const makeReq = (header) => ({ get: () => header });

  it('returns the token for a well-formed Bearer header', () => {
    expect(extractBearerToken(makeReq('Bearer abc.def.ghi'))).toBe('abc.def.ghi');
  });

  it('is case-insensitive on the scheme', () => {
    expect(extractBearerToken(makeReq('bearer abc'))).toBe('abc');
  });

  it('returns null when the header is absent', () => {
    expect(extractBearerToken(makeReq(undefined))).toBeNull();
  });

  it('returns null when the token is missing or blank', () => {
    expect(extractBearerToken(makeReq('Bearer'))).toBeNull();
    expect(extractBearerToken(makeReq('Bearer   '))).toBeNull();
  });

  it('returns null for a non-Bearer scheme', () => {
    expect(extractBearerToken(makeReq('Basic abc'))).toBeNull();
  });
});

describe('requireAuth middleware via /api/auth/me', () => {
  const app = createApp();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects a request with no token (401)', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.error.status).toBe(401);
  });

  it('rejects a malformed Authorization header (401)', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', 'Token abc');
    expect(res.status).toBe(401);
  });

  it('accepts a valid token and attaches req.user (200)', async () => {
    getAdminAuth.mockReturnValue({
      verifyIdToken: jest.fn().mockResolvedValue({ uid: 'user-123', email: 'a@b.com' }),
    });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer valid.token.sig');

    expect(res.status).toBe(200);
    expect(res.body.user).toEqual({ uid: 'user-123', email: 'a@b.com' });
  });

  it('rejects an invalid/expired token (401)', async () => {
    const err = new Error('expired');
    err.code = 'auth/id-token-expired';
    getAdminAuth.mockReturnValue({ verifyIdToken: jest.fn().mockRejectedValue(err) });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer expired.token.sig');

    expect(res.status).toBe(401);
    expect(res.body.error.message).toMatch(/Invalid or expired/);
  });

  it('returns 500 for a server-side verify failure (auth/invalid-credential)', async () => {
    const err = new Error('Must initialize app with a cert credential');
    err.code = 'auth/invalid-credential';
    getAdminAuth.mockReturnValue({ verifyIdToken: jest.fn().mockRejectedValue(err) });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer some.token.sig');

    expect(res.status).toBe(500);
    expect(res.body.error.message).toBe('Authentication service unavailable.');
  });

  it('returns 500 for a transient network failure', async () => {
    const err = new Error('network');
    err.code = 'auth/network-request-failed';
    getAdminAuth.mockReturnValue({ verifyIdToken: jest.fn().mockRejectedValue(err) });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer some.token.sig');

    expect(res.status).toBe(500);
  });

  it('returns 500 (no secrets) when Admin verification is misconfigured', async () => {
    const err = new Error('Firebase Admin credentials are not configured.');
    getAdminAuth.mockImplementation(() => {
      throw err;
    });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer some.token.sig');

    expect(res.status).toBe(500);
    expect(res.body.error.message).toBe('Authentication service unavailable.');
    expect(JSON.stringify(res.body)).not.toContain('credentials are not configured');
  });
});
