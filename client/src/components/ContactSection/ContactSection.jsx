import React, { useState } from 'react';
import './ContactSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faCircleCheck,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TextField, MenuItem } from '@mui/material';
import Button from '../Button/Button';
import { sendTradeEnquiry } from '../../services/api';

const muiInputSx = {
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  boxSizing: 'border-box',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FAFAFA',
    borderRadius: '6px',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    minHeight: '48px',
    '& fieldset': {
      borderColor: '#D8D0C8',
      borderWidth: '1.5px',
    },
    '&:hover fieldset': {
      borderColor: '#762C3A',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#762C3A',
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      backgroundColor: '#FFFFFF',
      boxShadow: '0 0 0 3px rgba(118, 44, 58, 0.08)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666666',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    transform: 'translate(14px, 14px) scale(1)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
      backgroundColor: '#FFFFFF',
      padding: '0 6px',
    },
    '&.Mui-focused': {
      color: '#762C3A',
      fontWeight: 600,
    },
  },
  '& .MuiSelect-select': {
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    padding: '12px 14px !important',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  '& input': {
    padding: '12px 14px !important',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    height: 'auto !important',
  },
  '& textarea': {
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    padding: '2px 0 !important',
  }
};

export default function ContactSection({
  phone = '+91 98765 43210',
  whatsapp = '919876543210',
  email = 'info@bhagwatitraders.in',
  location = 'Agricultural Produce Market Committee (APMC), Nashik, Maharashtra - 422003, India'
}) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    variety: 'Red Onion (40mm - 70mm)',
    quantity: '',
    message: '',
    website: '' // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage('');

    try {
      await sendTradeEnquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        onionVariety: formData.variety,
        quantity: formData.quantity,
        message: formData.message,
        honeypot: formData.website || '',
      });

      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        variety: 'Red Onion (40mm - 70mm)',
        quantity: '',
        message: '',
        website: ''
      });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit your trade inquiry right now. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-component">
      <div className="contact-grid">
        {/* Contact Info Cards */}
        <div className="contact-info-column">
          <div className="contact-card reveal-on-scroll delay-1">
            <div className="contact-card-icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="contact-card-content">
              <h4>Call Us Directly</h4>
              <p>For urgent bulk trade and export requirements</p>
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-link">
                {phone}
              </a>
            </div>
          </div>

          <div className="contact-card reveal-on-scroll delay-2">
            <div className="contact-card-icon whatsapp-icon-box">
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </div>
            <div className="contact-card-content">
              <h4>WhatsApp Trade Desk</h4>
              <p>Instant quotes and specifications chat</p>
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Bhagwati Traders, I am interested in bulk onion supply.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link whatsapp-link"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>

          <div className="contact-card reveal-on-scroll delay-3">
            <div className="contact-card-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="contact-card-content">
              <h4>Email Inquiries</h4>
              <p>Official commercial export proposals</p>
              <a href={`mailto:${email}`} className="contact-link">
                {email}
              </a>
            </div>
          </div>

          <div className="contact-card reveal-on-scroll delay-4">
            <div className="contact-card-icon">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="contact-card-content">
              <h4>Trading Office</h4>
              <p>{location}</p>
            </div>
          </div>
        </div>

        {/* Trade Inquiry Form */}
        <div className="contact-form-column reveal-on-scroll delay-2">
          <div className="contact-form-container">
            <h3 className="form-title">Send a Trade Inquiry</h3>
            <p className="form-subtitle">Fill in your requirements for rapid pricing and export terms.</p>

            {submitted ? (
              <div className="form-success-box">
                <FontAwesomeIcon icon={faCircleCheck} size="3x" className="success-icon" />
                <h4>Thank You for Reaching Out!</h4>
                <p>Your trade inquiry has been officially dispatched to our export desk. A confirmation email has also been sent to your email address.</p>
                <Button variant="outline" size="small" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                {/* Honeypot field (hidden from real users, traps bots) */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                {errorMessage && (
                  <div className="form-error-alert" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} className="alert-icon" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-row">
                  <TextField
                    label="Full Name"
                    required
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Smith"
                    sx={muiInputSx}
                  />
                  <TextField
                    label="Company Name"
                    fullWidth
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Global Foods Ltd."
                    sx={muiInputSx}
                  />
                </div>

                <div className="form-row">
                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    fullWidth
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    sx={muiInputSx}
                  />
                  <TextField
                    label="Phone / WhatsApp"
                    type="tel"
                    required
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    sx={muiInputSx}
                  />
                </div>

                <div className="form-row">
                  <TextField
                    select
                    label="Onion Variety"
                    fullWidth
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    sx={muiInputSx}
                  >
                    <MenuItem value="Red Onion (40mm - 70mm)">Red Onion (40mm - 70mm)</MenuItem>
                    <MenuItem value="Yellow Onion (40mm - 70mm)">Yellow Onion (40mm - 70mm)</MenuItem>
                    <MenuItem value="White Onion (40mm - 70mm)">White Onion (40mm - 70mm)</MenuItem>
                    <MenuItem value="Mixed Containers">Mixed / Custom Order</MenuItem>
                  </TextField>
                  <TextField
                    label="Estimated Volume"
                    fullWidth
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 2 x 40ft Containers"
                    sx={muiInputSx}
                  />
                </div>

                <TextField
                  label="Destination Port & Requirements"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify delivery terms (FOB/CIF), packaging preference (mesh bag sizes), and target destination..."
                  sx={muiInputSx}
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-large submit-inquiry-btn"
                  disabled={loading}
                >
                  <span>{loading ? 'Submitting Inquiry...' : 'Send Trade Inquiry'}</span>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
