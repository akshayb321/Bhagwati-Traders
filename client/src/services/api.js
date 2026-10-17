/**
 * Bhagwati Traders API Client Service
 * Centralizes all communication with the enquiry backend
 */
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

/**
 * Submit General Trade Enquiry (from Contact Section)
 * @param {Object} formData
 * @returns {Promise<{success: boolean, message: string, customerNotified?: boolean}>}
 */
export async function sendTradeEnquiry(formData) {
  const response = await fetch(`${API_BASE_URL}/api/enquiries/trade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Unable to submit your trade inquiry. Please try again.');
  }

  return data;
}

/**
 * Submit Product-Specific Enquiry (from Product Cards or Modal)
 * @param {Object} formData
 * @returns {Promise<{success: boolean, message: string, customerNotified?: boolean}>}
 */
export async function sendProductEnquiry(formData) {
  const response = await fetch(`${API_BASE_URL}/api/enquiries/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Unable to submit your product inquiry. Please try again.');
  }

  return data;
}

/**
 * Check backend health
 */
export async function checkBackendHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  return response.json();
}
