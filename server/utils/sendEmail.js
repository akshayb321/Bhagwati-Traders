import axios from 'axios';
import { config } from '../config/env.js';

/**
 * Send transactional email via Brevo REST API v3
 * @param {Object} options
 * @param {string|Array<{email: string, name?: string}>} options.to - Recipient email or array of recipients
 * @param {string} options.subject - Email subject line
 * @param {string} options.htmlContent - Formatted HTML email content
 * @param {Object} [options.replyTo] - Optional reply-to address { email, name }
 * @returns {Promise<Object>} Brevo response data
 */
export const sendEmail = async ({ to, subject, htmlContent, replyTo }) => {
  if (!config.brevoApiKey) {
    throw new Error('BREVO_API_KEY is not configured on the server.');
  }
  if (!config.mailFromEmail) {
    throw new Error('MAIL_FROM_EMAIL is not configured on the server.');
  }

  // Format recipient array
  const formattedTo = Array.isArray(to)
    ? to.map((r) => (typeof r === 'string' ? { email: r } : r))
    : [{ email: to }];

  const payload = {
    sender: {
      name: config.mailFromName,
      email: config.mailFromEmail,
    },
    to: formattedTo,
    subject,
    htmlContent,
  };

  // Add reply-to if supplied and valid
  if (replyTo && replyTo.email) {
    payload.replyTo = {
      email: replyTo.email,
      name: replyTo.name || replyTo.email,
    };
  }

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          accept: 'application/json',
          'api-key': config.brevoApiKey,
          'content-type': 'application/json',
        },
        timeout: 15000,
      }
    );

    return response.data;
  } catch (error) {
    const errorDetails = error.response?.data?.message || error.response?.data || error.message;
    console.error('❌ Brevo Email Error:', errorDetails);
    throw new Error(`Email delivery failed: ${error.response?.data?.message || error.message}`);
  }
};

export default sendEmail;
