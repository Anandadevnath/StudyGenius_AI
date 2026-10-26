/**
 * routes/health.js — Health-check endpoint.
 *
 * Environment scaffolding: proves the Express app starts and responds. This
 * is NOT a StudyGenius AI feature.
 */
'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'studygenius-ai-backend',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
