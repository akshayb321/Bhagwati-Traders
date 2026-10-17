import { config } from '../config/env.js';

/**
 * Centralized API Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'An unexpected error occurred while processing your request.';

  if (config.nodeEnv !== 'test') {
    console.error(`🚨 [API Error] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(statusCode >= 400 && statusCode < 600 ? statusCode : 500).json({
    success: false,
    message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};
