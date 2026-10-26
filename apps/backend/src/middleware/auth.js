/**
 * middleware/auth.js — Firebase ID-token verification.
 *
 * Proposal ref: §8, §10.3, §14 — the backend verifies the user's Firebase ID
 * token before accepting AI requests, then applies rate limits and input
 * validation.
 *
 * Behavior: extracts a `Bearer <token>` credential, verifies it with Firebase
 * Admin, and attaches `req.user = { uid, email }`. Missing/blank tokens are
 * rejected with 401; invalid or expired tokens are rejected with 401. Internal
 * verification failures (e.g. Admin not configured) are surfaced as 500 without
 * leaking secrets or stack traces.
 *
 * SECURITY: never log the token or its contents.
 */
'use strict';

const { getAdminAuth } = require('../config/firebaseAdmin');
const logger = require('../utils/logger');

/**
 * Firebase Admin error codes that indicate a bad/expired CLIENT token, and so
 * warrant a 401. Every other code (e.g. `auth/invalid-credential` from a
 * server missing cert credentials, `auth/internal-error`, or a network error)
 * indicates a server-side problem and must surface as 500.
 */
const CLIENT_TOKEN_ERROR_CODES = new Set([
  'auth/id-token-expired',
  'auth/id-token-revoked',
  'auth/invalid-id-token',
  'auth/argument-error',
  'auth/user-disabled',
]);

/**
 * Extracts a bearer token from the Authorization header.
 * @param {import('express').Request} req
 * @returns {string|null}
 */
function extractBearerToken(req) {
  const header = req.get('authorization');
  if (!header) {
    return null;
  }
  const [scheme, token] = header.split(' ');
  if (!token || scheme.toLowerCase() !== 'bearer') {
    return null;
  }
  const trimmed = token.trim();
  return trimmed === '' ? null : trimmed;
}

/**
 * Express middleware that requires a valid Firebase ID token.
 */
async function requireAuth(req, res, next) {
  const token = extractBearerToken(req);

  if (!token) {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Authentication required. Provide a Firebase ID token as a Bearer token.',
      },
    });
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email ?? null };
    return next();
  } catch (error) {
    // Distinguish an invalid client token from a server misconfiguration.
    const code = error && error.code ? String(error.code) : '';

    if (CLIENT_TOKEN_ERROR_CODES.has(code)) {
      return res.status(401).json({
        error: { status: 401, message: 'Invalid or expired authentication token.' },
      });
    }

    logger.error({ code }, 'Firebase ID-token verification failed');
    return res.status(500).json({
      error: { status: 500, message: 'Authentication service unavailable.' },
    });
  }
}

module.exports = { requireAuth, extractBearerToken };
