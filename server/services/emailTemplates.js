import { config } from '../config/env.js';

/**
 * Escapes unsafe characters for safe inclusion inside HTML emails
 * @param {string} str
 * @returns {string}
 */
export const escapeHtml = (str) => {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Formats timestamps cleanly (e.g. "16 Oct 2026, 06:45 PM IST")
 */
export const formatTimestamp = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date) + ' (IST)';
};

/**
 * Base Email Layout Wrapper for Bhagwati Traders
 * - Deep Burgundy / Warm Off-white / Forest Green Palette
 * - Table-based structure for maximum email client compatibility (Outlook, Gmail, Apple Mail)
 * - Max width: 600px
 */
const baseEmailWrapper = ({ content, previewText = '' }) => {
  const logoUrl = config.emailLogoUrl;

  const headerLogoHtml = logoUrl
    ? `
      <img src="${escapeHtml(logoUrl)}" alt="Bhagwati Traders" width="56" height="56" style="display:block;margin:0 auto 12px;width:56px;height:56px;object-fit:contain;border:0;" />
      <div style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#FFFFFF;letter-spacing:0.5px;">BHAGWATI TRADERS</div>
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;color:#E5C384;letter-spacing:2px;margin-top:3px;text-transform:uppercase;">Onion Trading &amp; Global Export</div>
    `
    : `
      <div style="display:inline-block;width:48px;height:48px;line-height:48px;border-radius:50%;background:#8E3747;color:#FFFFFF;font-family:Georgia,serif;font-size:22px;font-weight:bold;margin-bottom:8px;">BT</div>
      <div style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#FFFFFF;letter-spacing:0.5px;">BHAGWATI TRADERS</div>
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;color:#E5C384;letter-spacing:2px;margin-top:3px;text-transform:uppercase;">Onion Trading &amp; Global Export</div>
    `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bhagwati Traders</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF8F5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;">
  ${previewText ? `<div style="display:none;font-size:1px;color:#FAF8F5;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${escapeHtml(previewText)}</div>` : ''}

  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;padding:30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container (600px) -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#FFFFFF;border:1px solid #E8E2DD;border-radius:10px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.04);">
          
          <!-- Branded Burgundy Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg, #57202B 0%, #762C3A 100%);background-color:#762C3A;padding:32px 24px;text-align:center;">
              ${headerLogoHtml}
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding:36px 32px 32px;color:#222222;font-size:15px;line-height:1.65;">
              ${content}
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#F4EFEA;border-top:1px solid #E8E2DD;padding:26px 30px;text-align:center;color:#737373;font-size:12px;line-height:1.6;">
              <p style="margin:0 0 6px;color:#57202B;font-weight:bold;font-size:13px;">Bhagwati Traders — Export Division</p>
              <p style="margin:0 0 8px;">APMC Market Yard, Nashik, Maharashtra - 422003, India</p>
              <p style="margin:0 0 10px;">
                <span style="color:#777B50;font-weight:600;">Quality Onions</span> &bull; 
                <span style="color:#777B50;font-weight:600;">Global Partnerships</span> &bull; 
                <span style="color:#777B50;font-weight:600;">Timely Delivery</span>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#999999;border-top:1px solid #E5DFD9;padding-top:10px;">
                This is an official transactional message from Bhagwati Traders. &copy; ${new Date().getFullYear()} All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/* ==========================================================================
   1. CUSTOMER EMAIL — GENERAL TRADE ENQUIRY
   ========================================================================== */
export const tradeInquiryCustomerTemplate = (data) => {
  const {
    name,
    company,
    onionVariety,
    quantity,
    message,
    phone,
  } = data;

  const content = `
    <!-- Eyebrow -->
    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#762C3A;text-transform:uppercase;margin-bottom:8px;">
      TRADE INQUIRY CONFIRMATION
    </div>

    <!-- Heading -->
    <h2 style="font-family:Georgia,serif;font-size:24px;font-weight:normal;color:#142C25;margin:0 0 18px;line-height:1.25;">
      Thank You for Your Inquiry, ${escapeHtml(name)}
    </h2>

    <p style="margin:0 0 16px;color:#4D4D4D;">
      We have received your commercial onion supply request. Our export desk is reviewing your requirements and will follow up shortly with current market pricing, grade availability, and shipping schedules.
    </p>

    <!-- Structured Summary Card -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;border:1px solid #E8E2DD;border-radius:8px;margin:22px 0;padding:18px 20px;">
      <tr>
        <td colspan="2" style="padding-bottom:12px;border-bottom:1px solid #E8E2DD;">
          <strong style="color:#57202B;font-size:14px;letter-spacing:0.5px;text-transform:uppercase;">Submitted Requirements Summary</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0 6px;color:#737373;font-size:13px;width:38%;"><strong>Onion Variety:</strong></td>
        <td style="padding:10px 0 6px;color:#222222;font-size:14px;font-weight:600;">${escapeHtml(onionVariety || 'Standard Red Onion')}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#737373;font-size:13px;"><strong>Company:</strong></td>
        <td style="padding:6px 0;color:#222222;font-size:14px;">${escapeHtml(company || 'Not provided')}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#737373;font-size:13px;"><strong>Estimated Volume:</strong></td>
        <td style="padding:6px 0;color:#222222;font-size:14px;">${escapeHtml(quantity || 'To be finalized')}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#737373;font-size:13px;"><strong>Contact Phone:</strong></td>
        <td style="padding:6px 0;color:#222222;font-size:14px;">${escapeHtml(phone || 'Not provided')}</td>
      </tr>
      ${
        message
          ? `
      <tr>
        <td style="padding:6px 0 0;color:#737373;font-size:13px;vertical-align:top;"><strong>Destination / Notes:</strong></td>
        <td style="padding:6px 0 0;color:#222222;font-size:14px;line-height:1.4;">${escapeHtml(message)}</td>
      </tr>`
          : ''
      }
    </table>

    <div style="background-color:#F5F8F6;border-left:3px solid #777B50;padding:14px 16px;border-radius:4px;margin-bottom:24px;">
      <p style="margin:0;font-size:13px;color:#142C25;line-height:1.5;">
        <strong>Next Steps:</strong> An export representative will review your specifications against our daily mandi consignments and reply directly via email or WhatsApp.
      </p>
    </div>

    <p style="margin:0 0 6px;color:#4D4D4D;">Warm regards,</p>
    <p style="margin:0;color:#142C25;font-weight:bold;font-size:14px;">Export Sales Desk &bull; Bhagwati Traders</p>
  `;

  return baseEmailWrapper({
    content,
    previewText: `Thank you ${name}. Your trade inquiry for ${onionVariety} has been received by Bhagwati Traders.`,
  });
};

/* ==========================================================================
   2. OFFICIAL BUSINESS NOTIFICATION — GENERAL TRADE ENQUIRY
   ========================================================================== */
export const tradeInquiryBusinessTemplate = (data) => {
  const {
    name,
    company,
    email,
    phone,
    onionVariety,
    quantity,
    message,
    timestamp,
  } = data;

  const content = `
    <!-- Eyebrow -->
    <div style="display:inline-block;background-color:#F9EBEF;color:#762C3A;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:4px;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">
      NEW TRADE INQUIRY &bull; ACTION REQUIRED
    </div>

    <!-- Heading -->
    <h2 style="font-family:Georgia,serif;font-size:22px;color:#142C25;margin:0 0 10px;line-height:1.25;">
      New Commercial Trade Inquiry Received
    </h2>
    <p style="margin:0 0 20px;color:#737373;font-size:13px;">
      Received on: <strong>${escapeHtml(timestamp || formatTimestamp())}</strong>
    </p>

    <!-- Client Profile Table -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;border:1px solid #E8E2DD;border-radius:8px;margin-bottom:18px;padding:16px 18px;">
      <tr>
        <td colspan="2" style="padding-bottom:10px;border-bottom:1px solid #E8E2DD;">
          <strong style="color:#57202B;font-size:13px;text-transform:uppercase;">Customer Details</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 4px;color:#737373;font-size:13px;width:35%;">Buyer Name:</td>
        <td style="padding:8px 0 4px;color:#222222;font-size:14px;font-weight:600;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Company Name:</td>
        <td style="padding:4px 0;color:#222222;font-size:14px;">${escapeHtml(company || 'Not provided')}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Email Address:</td>
        <td style="padding:4px 0;color:#762C3A;font-size:14px;font-weight:600;">
          <a href="mailto:${escapeHtml(email)}" style="color:#762C3A;text-decoration:underline;">${escapeHtml(email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Phone / WhatsApp:</td>
        <td style="padding:4px 0;color:#222222;font-size:14px;font-weight:600;">
          <a href="tel:${escapeHtml(phone?.replace(/\s+/g, ''))}" style="color:#222222;text-decoration:none;">${escapeHtml(phone)}</a>
        </td>
      </tr>
    </table>

    <!-- Order Specifications Table -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border:1px solid #E8E2DD;border-radius:8px;margin-bottom:24px;padding:16px 18px;">
      <tr>
        <td colspan="2" style="padding-bottom:10px;border-bottom:1px solid #E8E2DD;">
          <strong style="color:#57202B;font-size:13px;text-transform:uppercase;">Order Specifications</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 4px;color:#737373;font-size:13px;width:35%;">Requested Variety:</td>
        <td style="padding:8px 0 4px;color:#222222;font-size:14px;font-weight:bold;">${escapeHtml(onionVariety)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Estimated Quantity:</td>
        <td style="padding:4px 0;color:#222222;font-size:14px;font-weight:600;">${escapeHtml(quantity || 'Not specified')}</td>
      </tr>
      <tr>
        <td style="padding:6px 0 0;color:#737373;font-size:13px;vertical-align:top;">Port &amp; Notes:</td>
        <td style="padding:6px 0 0;color:#222222;font-size:14px;line-height:1.45;">${escapeHtml(message || 'No additional notes provided.')}</td>
      </tr>
    </table>

    <!-- Direct Reply-To Button -->
    <div style="text-align:center;padding:10px 0;">
      <a href="mailto:${escapeHtml(email)}?subject=Re:%20Trade%20Inquiry%20from%20Bhagwati%20Traders" style="display:inline-block;background-color:#762C3A;color:#FFFFFF;text-decoration:none;padding:12px 26px;border-radius:6px;font-size:14px;font-weight:600;letter-spacing:0.5px;">
        Reply to ${escapeHtml(name)} &rarr;
      </a>
    </div>
  `;

  return baseEmailWrapper({
    content,
    previewText: `New trade inquiry from ${name} (${company || 'Individual'}) for ${onionVariety}.`,
  });
};

/* ==========================================================================
   3. CUSTOMER EMAIL — RED ONION PRODUCT INQUIRY
   ========================================================================== */
export const productInquiryCustomerTemplate = (data) => {
  const {
    name,
    email,
    phone,
    productName = 'Red Onion',
    sizeRange = '40mm - 70mm',
    origin = 'Indian Origin (Nashik / Maharashtra)',
    quantity,
    contactInfo,
  } = data;

  const displayEmail = email || (contactInfo && contactInfo.includes('@') ? contactInfo : '');
  const displayPhone = phone || (!contactInfo?.includes('@') ? contactInfo : '');

  const content = `
    <!-- Eyebrow -->
    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#762C3A;text-transform:uppercase;margin-bottom:8px;">
      PRODUCT INQUIRY CONFIRMATION
    </div>

    <!-- Heading -->
    <h2 style="font-family:Georgia,serif;font-size:24px;font-weight:normal;color:#142C25;margin:0 0 16px;line-height:1.25;">
      We've Received Your ${escapeHtml(productName)} Inquiry
    </h2>

    <p style="margin:0 0 16px;color:#4D4D4D;">
      Hello ${escapeHtml(name)}, thank you for your interest in our premium export-grade <strong>${escapeHtml(productName)}</strong>. Bhagwati Traders sources fresh, graded Indian onions directly from trusted farm networks across Nashik and Maharashtra.
    </p>

    <!-- Product Details Card -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;border:1px solid #E8E2DD;border-radius:8px;margin:20px 0;padding:18px 20px;">
      <tr>
        <td colspan="2" style="padding-bottom:10px;border-bottom:1px solid #E8E2DD;">
          <strong style="color:#57202B;font-size:13px;text-transform:uppercase;">Product Specification Details</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 4px;color:#737373;font-size:13px;width:38%;"><strong>Variety:</strong></td>
        <td style="padding:8px 0 4px;color:#222222;font-size:14px;font-weight:600;">${escapeHtml(productName)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;"><strong>Origin:</strong></td>
        <td style="padding:4px 0;color:#222222;font-size:14px;">${escapeHtml(origin)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;"><strong>Size Range:</strong></td>
        <td style="padding:4px 0;color:#222222;font-size:14px;font-weight:600;">${escapeHtml(sizeRange)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;"><strong>Requested Volume:</strong></td>
        <td style="padding:4px 0;color:#222222;font-size:14px;">${escapeHtml(quantity || 'Discussed upon follow-up')}</td>
      </tr>
      ${displayEmail ? `
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;"><strong>Email:</strong></td>
        <td style="padding:4px 0;color:#222222;font-size:14px;">${escapeHtml(displayEmail)}</td>
      </tr>` : ''}
      ${displayPhone ? `
      <tr>
        <td style="padding:4px 0 0;color:#737373;font-size:13px;"><strong>Phone / WhatsApp:</strong></td>
        <td style="padding:4px 0 0;color:#222222;font-size:14px;">${escapeHtml(displayPhone)}</td>
      </tr>` : ''}
    </table>

    <p style="margin:0 0 16px;color:#4D4D4D;font-size:14px;line-height:1.6;">
      Our commercial export desk will review current crop arrivals, container freight schedules, and packaging preferences (5kg, 10kg, 25kg, 50kg leno mesh bags) and contact you shortly.
    </p>

    <p style="margin:20px 0 6px;color:#4D4D4D;">Sincerely,</p>
    <p style="margin:0;color:#142C25;font-weight:bold;font-size:14px;">Bhagwati Traders Trade Desk</p>
  `;

  return baseEmailWrapper({
    content,
    previewText: `Thank you ${name}. Your inquiry for ${productName} (${sizeRange}) has been received.`,
  });
};

/* ==========================================================================
   4. OFFICIAL BUSINESS NOTIFICATION — PRODUCT INQUIRY
   ========================================================================== */
export const productInquiryBusinessTemplate = (data) => {
  const {
    name,
    email,
    phone,
    productName = 'Red Onion',
    sizeRange = '40mm - 70mm',
    origin = 'Indian Origin (Nashik / Maharashtra)',
    quantity,
    contactInfo,
    timestamp,
  } = data;

  const displayEmail = email || (contactInfo && contactInfo.includes('@') ? contactInfo : 'Not provided');
  const displayPhone = phone || (!contactInfo?.includes('@') ? contactInfo : 'Not provided');

  const content = `
    <!-- Eyebrow -->
    <div style="display:inline-block;background-color:#F9EBEF;color:#762C3A;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:4px;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">
      NEW PRODUCT INQUIRY &bull; ${escapeHtml(productName).toUpperCase()}
    </div>

    <!-- Heading -->
    <h2 style="font-family:Georgia,serif;font-size:22px;color:#142C25;margin:0 0 10px;line-height:1.25;">
      New Product Inquiry: ${escapeHtml(productName)}
    </h2>
    <p style="margin:0 0 20px;color:#737373;font-size:13px;">
      Received on: <strong>${escapeHtml(timestamp || formatTimestamp())}</strong>
    </p>

    <!-- Lead Details -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;border:1px solid #E8E2DD;border-radius:8px;margin-bottom:18px;padding:16px 18px;">
      <tr>
        <td colspan="2" style="padding-bottom:10px;border-bottom:1px solid #E8E2DD;">
          <strong style="color:#57202B;font-size:13px;text-transform:uppercase;">Buyer / Inquirer Info</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 4px;color:#737373;font-size:13px;width:35%;">Buyer / Company:</td>
        <td style="padding:8px 0 4px;color:#222222;font-size:14px;font-weight:600;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Email Address:</td>
        <td style="padding:4px 0;color:#762C3A;font-size:14px;font-weight:600;">
          ${displayEmail !== 'Not provided' ? `<a href="mailto:${escapeHtml(displayEmail)}" style="color:#762C3A;text-decoration:none;">${escapeHtml(displayEmail)}</a>` : 'Not provided'}
        </td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Phone / WhatsApp:</td>
        <td style="padding:4px 0;color:#2E7D32;font-size:14px;font-weight:600;">
          ${displayPhone !== 'Not provided' ? `<a href="https://wa.me/${escapeHtml(displayPhone.replace(/[^0-9]/g, ''))}" style="color:#2E7D32;text-decoration:none;">${escapeHtml(displayPhone)}</a>` : 'Not provided'}
        </td>
      </tr>
    </table>

    <!-- Product Specifics -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border:1px solid #E8E2DD;border-radius:8px;margin-bottom:24px;padding:16px 18px;">
      <tr>
        <td colspan="2" style="padding-bottom:10px;border-bottom:1px solid #E8E2DD;">
          <strong style="color:#57202B;font-size:13px;text-transform:uppercase;">Product Requirements</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 4px;color:#737373;font-size:13px;width:35%;">Selected Product:</td>
        <td style="padding:8px 0 4px;color:#222222;font-size:14px;font-weight:bold;">${escapeHtml(productName)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Origin:</td>
        <td style="padding:4px 0;color:#222222;font-size:14px;">${escapeHtml(origin)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Size Range:</td>
        <td style="padding:4px 0;color:#222222;font-size:14px;font-weight:600;">${escapeHtml(sizeRange)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#737373;font-size:13px;">Volume Needed:</td>
        <td style="padding:4px 0;color:#222222;font-size:14px;font-weight:bold;color:#762C3A;">${escapeHtml(quantity || 'Not specified by buyer')}</td>
      </tr>
    </table>
  `;

  return baseEmailWrapper({
    content,
    previewText: `Product inquiry for ${productName} from ${name} (${displayEmail} / ${displayPhone}).`,
  });
};
