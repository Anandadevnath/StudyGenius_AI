/**
 * middleware/auth.js — Firebase ID-token verification (PLACEHOLDER).
 *
 * Proposal ref: §8, §10.3, §14 — the backend verifies the user's Firebase ID
 * token before accepting AI requests, then applies rate limits and input
 * validation.
 *
 * NOT IMPLEMENTED: this middleware currently rejects with 501 so that no
 * unauthenticated request is ever treated as authenticated. Real verification
 * arrives with Firebase Admin initialization during feature development.
 */
'use strict';

function requireAuth(_req, res) {
  res.status(501).json({
    error: {
      status: 501,
      message:
        'Authentication middleware not implemented yet. Firebase ID-token ' +
        'verification is part of feature development.',
    },
  });
}

module.exports = { requireAuth };
