/**
 * src/server.js — Backend entry point.
 *
 * Loads environment variables, builds the app, and starts listening.
 * Environment scaffolding only — no StudyGenius AI feature logic.
 */
'use strict';

require('dotenv').config();

const createApp = require('./app');
const logger = require('./utils/logger');
const { getServerConfig } = require('./config/env');

const { port, nodeEnv } = getServerConfig();
const app = createApp();

const server = app.listen(port, () => {
  logger.info(
    { port, nodeEnv },
    'StudyGenius AI backend listening (foundation only — no features implemented)',
  );
});

// Graceful shutdown.
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    logger.info({ signal }, 'Shutting down backend');
    server.close(() => process.exit(0));
  });
}

module.exports = server;
