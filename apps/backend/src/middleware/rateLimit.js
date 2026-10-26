/**
 * middleware/rateLimit.js — Rate limiting (proposal §8, §14).
 *
 * Functional configuration (not a feature stub): protects the API surface.
 * Applied to the whole /api surface and, more strictly, to AI endpoints
 * later.
 */
'use strict';

const rateLimit = require('express-rate-limit');
const { getRateLimitConfig } = require('../config/env');

function createApiRateLimiter() {
  const { windowMs, max } = getRateLimitConfig();
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: { status: 429, message: 'Too many requests. Please try again later.' } },
  });
}

module.exports = { createApiRateLimiter };
