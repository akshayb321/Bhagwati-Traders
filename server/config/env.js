import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  brevoApiKey: process.env.BREVO_API_KEY || '',
  mailFromEmail: process.env.MAIL_FROM_EMAIL || '',
  mailFromName: process.env.MAIL_FROM_NAME || 'Bhagwati Traders',
  businessEmail: process.env.BUSINESS_EMAIL || process.env.MAIL_FROM_EMAIL || '',
  emailLogoUrl: process.env.EMAIL_LOGO_URL || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

// Validate critical environment variables on startup
export const validateEnv = () => {
  const missing = [];
  if (!config.brevoApiKey) missing.push('BREVO_API_KEY');
  if (!config.mailFromEmail) missing.push('MAIL_FROM_EMAIL');
  if (!config.businessEmail) missing.push('BUSINESS_EMAIL');

  if (missing.length > 0 && config.nodeEnv !== 'test') {
    console.warn(
      `⚠️ [Config Warning] The following environment variables are missing: ${missing.join(', ')}.\n` +
      `   Transactional emails via Brevo will fail until these are configured in server/.env`
    );
  }
};
