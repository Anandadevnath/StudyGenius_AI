/**
 * middleware/errorHandler.js — Central error handler.
 *
 * Returns clear JSON errors. In production, internal error details are not
 * leaked to clients (proposal §14: clear errors without exposing secrets or
 * stack traces).
 */
'use strict';

// eslint-disable-next-line no-unused-vars -- Express requires the 4-arg signature
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  const body = {
    error: {
      message: status >= 500 && isProd ? 'Internal server error' : err.message,
      status,
    },
  };

  if (!isProd && err.stack) {
    body.error.stack = err.stack;
  }

  res.status(status).json(body);
}

module.exports = { errorHandler };
