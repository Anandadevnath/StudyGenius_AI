/**
 * config/gemini.js — Google Gemini configuration (PLACEHOLDER).
 *
 * Proposal ref: §7 (Gemini via Node/Express backend), §12.4 (model chosen at
 * backend build time), §14 (keys server-side only).
 *
 * This module does NOT create a Gemini client and does NOT make network
 * calls. It validates that a key is present and raises a clear error if not.
 *
 * SECURITY: GEMINI_API_KEY is a PRIVATE credential. It belongs ONLY in
 * backend/.env (git-ignored). It must NEVER appear in the mobile app or in
 * any EXPO_PUBLIC_* variable.
 */

'use strict';

const { readEnv } = require('./env');

/**
 * Returns the Gemini configuration. The model name is provisional: the
 * proposal defers the final model choice to backend implementation.
 * @returns {{apiKey: string, model: string}}
 * @throws {Error} if GEMINI_API_KEY is missing
 */
function getGeminiConfig() {
  const apiKey = readEnv('GEMINI_API_KEY', { required: true });
  const model = readEnv('GEMINI_MODEL', { fallback: 'gemini-2.5-flash' });
  return { apiKey, model };
}

/**
 * Creates the Gemini client — NOT IMPLEMENTED YET.
 * Implemented during feature development using @google/genai.
 */
function getGeminiClient() {
  getGeminiConfig();
  throw new Error('Gemini client initialization is not implemented yet.');
}

module.exports = { getGeminiConfig, getGeminiClient };
