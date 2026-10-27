'use strict';

const { getAdminAuth } = require('../config/firebaseAdmin');
const logger = require('../utils/logger');

// Codes that indicate a bad/expired CLIENT token (=> 401). Other codes
// (e.g. auth/invalid-credential from a server missing credentials) are
// server-side problems and surface as 500.
const CLIENT_TOKEN_ERROR_CODES = new Set([
  'auth/id-token-expired',
  'auth/id-token-revoked',
  'auth/invalid-id-token',
  'auth/argument-error',
  'auth/user-disabled',
]);

/** @returns {string|null} */
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

/** Verifies a Firebase ID token and sets req.user. */
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
