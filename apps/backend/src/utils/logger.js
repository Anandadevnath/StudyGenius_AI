/**
 * utils/logger.js — Structured logging (proposal §14).
 *
 * Uses pino. In development it pretty-prints is not required; JSON logs are
 * fine and dependency-light. NEVER log secrets or private study content.
 */
'use strict';

const pino = require('pino');

const isProd = process.env.NODE_ENV === 'production';

const logger = pino({
  level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
  // Redact anything that could carry credentials if it ever appears in a log.
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.apiKey', '*.GEMINI_API_KEY'],
    censor: '[redacted]',
  },
});

module.exports = logger;
