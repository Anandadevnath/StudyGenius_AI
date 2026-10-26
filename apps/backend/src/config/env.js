/**
 * config/env.js — Environment configuration loader.
 *
 * Loads backend configuration from environment variables (via dotenv in
 * server.js or the test setup). Provides helpers that FAIL CLEARLY when
 * required values are missing, so misconfiguration surfaces as an
 * understandable message rather than a confusing crash.
 *
 * SECURITY (proposal §14): secrets live ONLY here in the backend, never in
 * the mobile app. Never log or return secret values.
 */

'use strict';

/**
 * @param {string} name
 * @param {{required?: boolean, fallback?: string}} [opts]
 * @returns {string|undefined}
 */
function readEnv(name, opts = {}) {
  const { required = false, fallback } = opts;
  const value = process.env[name];

  if (value === undefined || value === '') {
    if (required) {
      throw new Error(
        `Missing required environment variable: ${name}. ` +
          'Copy backend/.env.example to backend/.env and fill in the value. ' +
          'See the root README "Environment variables" section.',
      );
    }
    return fallback;
  }
  return value;
}

/** Server configuration. */
function getServerConfig() {
  return {
    port: Number.parseInt(readEnv('PORT', { fallback: '4000' }), 10),
    nodeEnv: readEnv('NODE_ENV', { fallback: 'development' }),
    allowedOrigins: readEnv('ALLOWED_ORIGINS', { fallback: '' })
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

/** Rate-limit configuration (proposal §8, §14). */
function getRateLimitConfig() {
  return {
    windowMs: Number.parseInt(readEnv('RATE_LIMIT_WINDOW_MS', { fallback: '900000' }), 10),
    max: Number.parseInt(readEnv('RATE_LIMIT_MAX', { fallback: '100' }), 10),
  };
}

module.exports = {
  readEnv,
  getServerConfig,
  getRateLimitConfig,
};
