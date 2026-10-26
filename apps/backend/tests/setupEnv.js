/**
 * tests/setupEnv.js — Test environment defaults.
 *
 * Provides non-secret defaults so tests run without a real .env. Intentionally
 * leaves GEMINI_API_KEY and Firebase credentials UNSET so the "fails clearly"
 * behavior can be tested.
 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.PORT = process.env.PORT || '4000';
