import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter for Trade & Product Enquiry Endpoints
 * Limits submissions to 15 enquiries per 15-minute window per IP
 */
export const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiry requests from this IP. Please wait a few minutes before submitting again.',
  },
});
