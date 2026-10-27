/**
 * routes/index.js — API surface router.
 *
 * Mounts the health check. AI routes (summary, quiz, plan) are added during
 * feature development and do not exist yet.
 */
'use strict';

const express = require('express');
const healthRouter = require('./health');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use('/health', healthRouter);

// Authenticated probe: verifies ID-token wiring without exposing a feature.
// AI routes (summary, quiz, plan) mount here under `requireAuth` during
// feature development: router.use('/ai', requireAuth, aiRouter).
router.get('/auth/me', requireAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
