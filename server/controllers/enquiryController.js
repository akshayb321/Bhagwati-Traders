import { config } from '../config/env.js';
import { sendEmail } from '../utils/sendEmail.js';
import {
  tradeInquiryCustomerTemplate,
  tradeInquiryBusinessTemplate,
  productInquiryCustomerTemplate,
  productInquiryBusinessTemplate,
  formatTimestamp,
} from '../services/emailTemplates.js';

// Simple email regex validation
const isValidEmail = (email) => {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Allowed varieties for trade inquiry validation
const ALLOWED_VARIETIES = [
  'Red Onion',
  'Yellow Onion',
  'White Onion',
  'Red Onion (40mm - 70mm)',
  'Yellow Onion (40mm - 70mm)',
  'White Onion (40mm - 70mm)',
  'Mixed / Custom Order',
  'Mixed Containers',
];

/**
 * Handle General Trade Enquiries from the Contact Section
 * POST /api/enquiries/trade
 */
export const submitTradeEnquiry = async (req, res, next) => {
  try {
    const {
      name,
      company = '',
      email,
      phone,
      onionVariety = 'Red Onion',
      quantity = '',
      message = '',
      honeypot = '',
    } = req.body;

    // Honeypot spam protection: ignore bot submissions quietly
    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been submitted successfully.',
      });
    }

    // Input validation & sanitization
    const trimmedName = String(name || '').trim();
    const trimmedCompany = String(company || '').trim();
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const trimmedPhone = String(phone || '').trim();
    const trimmedVariety = String(onionVariety || '').trim();
    const trimmedQuantity = String(quantity || '').trim();
    const trimmedMessage = String(message || '').trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid full name (2 to 100 characters).',
      });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (!trimmedPhone || trimmedPhone.length < 5 || trimmedPhone.length > 35) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone or WhatsApp number.',
      });
    }

    // Validate variety
    const isVarietyValid = ALLOWED_VARIETIES.some(
      (v) => v.toLowerCase() === trimmedVariety.toLowerCase()
    ) || trimmedVariety.length <= 100;

    const finalVariety = isVarietyValid ? trimmedVariety : 'Red Onion (Standard Export)';

    const submissionTime = formatTimestamp();
    const enquiryData = {
      name: trimmedName,
      company: trimmedCompany,
      email: trimmedEmail,
      phone: trimmedPhone,
      onionVariety: finalVariety,
      quantity: trimmedQuantity,
      message: trimmedMessage,
      timestamp: submissionTime,
    };

    // 1. Send Business Notification to Official Inbox
    const businessHtml = tradeInquiryBusinessTemplate(enquiryData);
    let businessEmailResult = null;
    try {
      businessEmailResult = await sendEmail({
        to: config.businessEmail,
        subject: `New Trade Inquiry — ${trimmedName} — ${finalVariety}`,
        htmlContent: businessHtml,
        replyTo: {
          email: trimmedEmail,
          name: trimmedName,
        },
      });
    } catch (bizErr) {
      console.error('❌ Failed to dispatch business notification:', bizErr.message);
      return res.status(502).json({
        success: false,
        message: 'Unable to deliver trade inquiry to our export desk. Please try again or contact us via WhatsApp.',
      });
    }

    // 2. Send Customer Confirmation Email
    let customerEmailSent = false;
    try {
      const customerHtml = tradeInquiryCustomerTemplate(enquiryData);
      await sendEmail({
        to: trimmedEmail,
        subject: "We've Received Your Trade Inquiry | Bhagwati Traders",
        htmlContent: customerHtml,
      });
      customerEmailSent = true;
    } catch (custErr) {
      console.warn('⚠️ Could not send confirmation to customer email:', custErr.message);
      // We do not fail the request since business notification was recorded
    }

    return res.status(200).json({
      success: true,
      message: 'Your trade inquiry has been submitted successfully. Our export desk will contact you shortly.',
      customerNotified: customerEmailSent,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle Product-Specific Enquiries (e.g. Red Onion Modal or Section)
 * POST /api/enquiries/product
 */
export const submitProductEnquiry = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      contactInfo,
      productName = 'Red Onion',
      origin = 'Indian Origin (Nashik / Maharashtra)',
      sizeRange = '40mm - 70mm',
      quantity = '',
      honeypot = '',
    } = req.body;

    // Honeypot spam protection
    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: 'Your product inquiry has been submitted successfully.',
      });
    }

    const trimmedName = String(name || '').trim();
    const rawEmail = String(email || (contactInfo && contactInfo.includes('@') ? contactInfo : '')).trim().toLowerCase();
    const rawPhone = String(phone || (!contactInfo?.includes('@') ? contactInfo : '')).trim();
    const trimmedProduct = String(productName || 'Red Onion').trim();
    const trimmedOrigin = String(origin || 'Indian Origin (Nashik / Maharashtra)').trim();
    const trimmedSize = String(sizeRange || '40mm - 70mm').trim();
    const trimmedQuantity = String(quantity || '').trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name or company name (2 to 100 characters).',
      });
    }

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address so we can send your inquiry confirmation.',
      });
    }

    if (!rawPhone || rawPhone.length < 5 || rawPhone.length > 35) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone or WhatsApp number (min 5 digits).',
      });
    }

    const submissionTime = formatTimestamp();

    const productData = {
      name: trimmedName,
      email: rawEmail,
      phone: rawPhone,
      contactInfo: `${rawEmail} / ${rawPhone}`,
      productName: trimmedProduct,
      origin: trimmedOrigin,
      sizeRange: trimmedSize,
      quantity: trimmedQuantity,
      timestamp: submissionTime,
    };

    // 1. Send Business Notification
    const businessHtml = productInquiryBusinessTemplate(productData);
    const emailPayload = {
      to: config.businessEmail,
      subject: `New Product Inquiry — ${trimmedProduct} — ${trimmedName}`,
      htmlContent: businessHtml,
      replyTo: {
        email: rawEmail,
        name: trimmedName,
      },
    };

    try {
      await sendEmail(emailPayload);
    } catch (bizErr) {
      console.error('❌ Failed to dispatch product enquiry to business:', bizErr.message);
      return res.status(502).json({
        success: false,
        message: 'Unable to deliver your product inquiry. Please try again or reach out on WhatsApp.',
      });
    }

    // 2. Send confirmation to buyer's email
    let customerNotified = false;
    try {
      const customerHtml = productInquiryCustomerTemplate(productData);
      await sendEmail({
        to: rawEmail,
        subject: `Your ${trimmedProduct} Inquiry Has Been Received | Bhagwati Traders`,
        htmlContent: customerHtml,
      });
      customerNotified = true;
    } catch (custErr) {
      console.warn('⚠️ Could not send confirmation to customer email:', custErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Your inquiry for ${trimmedProduct} has been sent successfully.`,
      customerNotified,
    });
  } catch (error) {
    next(error);
  }
};
