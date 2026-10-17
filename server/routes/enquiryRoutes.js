import { Router } from 'express';
import {
  submitTradeEnquiry,
  submitProductEnquiry,
} from '../controllers/enquiryController.js';
import { enquiryRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// General Trade Enquiry (from Contact Section)
router.post('/trade', enquiryRateLimiter, submitTradeEnquiry);

// Product-Specific Enquiry (from Product Card or Modal)
router.post('/product', enquiryRateLimiter, submitProductEnquiry);

export default router;
