/**
 * src/app.js — Express application factory.
 *
 * Environment scaffolding for the secure AI backend (proposal §7, §8).
 * Security middleware: helmet, CORS with an allowlist, rate limiting, JSON
 * body parsing, structured request logging, and a central error handler.
 *
 * NO StudyGenius AI feature logic is implemented here. Only /health responds
 * meaningfully.
 */
'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pinoHttp = require('pino-http');

const logger = require('./utils/logger');
const { getServerConfig } = require('./config/env');
const { createApiRateLimiter } = require('./middleware/rateLimit');
const { errorHandler } = require('./middleware/errorHandler');
const apiRouter = require('./routes');

/**
 * Builds and returns the Express app. Does not bind a port (see server.js).
 * @returns {import('express').Express}
 */
function createApp() {
  const app = express();
  const { allowedOrigins } = getServerConfig();

  // Behind a reverse proxy / free-tier host, trust the proxy for correct
  // client IPs in rate limiting.
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: allowedOrigins.length > 0 ? allowedOrigins : true,
      credentials: false,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(pinoHttp({ logger }));
  app.use(createApiRateLimiter());

  app.use('/api', apiRouter);

  // Root convenience endpoint.
  app.get('/', (_req, res) => {
    res.status(200).json({ service: 'studygenius-ai-backend', docs: '/api/health' });
  });

  app.use((_req, res) => {
    res.status(404).json({ error: { status: 404, message: 'Not found' } });
  });

  app.use(errorHandler);

  return app;
}

module.exports = createApp;
