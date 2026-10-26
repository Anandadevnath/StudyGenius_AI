/**
 * tests/health.test.js — Backend smoke test.
 *
 * Verifies the app starts and the health-check endpoint responds. This is
 * environment scaffolding, NOT a StudyGenius AI feature test.
 */
'use strict';

const request = require('supertest');
const createApp = require('../src/app');

describe('backend health check', () => {
  const app = createApp();

  it('GET /api/health returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('studygenius-ai-backend');
  });

  it('unknown route returns 404 JSON', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.error.status).toBe(404);
  });
});
