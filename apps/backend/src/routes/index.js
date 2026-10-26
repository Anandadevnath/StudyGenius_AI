/**
 * routes/index.js — API surface router.
 *
 * Mounts the health check. AI routes (summary, quiz, plan) are added during
 * feature development and do not exist yet.
 */
'use strict';

const express = require('express');
const healthRouter = require('./health');

const router = express.Router();

router.use('/health', healthRouter);

// Placeholder AI surface: intentionally not implemented.
// router.use('/ai', requireAuth, aiRouter);

module.exports = router;
