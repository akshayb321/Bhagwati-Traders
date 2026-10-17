import React, { useState, useRef } from 'react';
import './Home.css';
import Hero from '../../sections/Hero/Hero';
import About from '../../sections/About/About';
import Products from '../../sections/Products/Products';
import Infrastructure from '../../sections/Infrastructure/Infrastructure';
import Capabilities from '../../sections/Capabilities/Capabilities';
import Gallery from '../../components/Gallery/Gallery';
import ContactSection from '../../components/ContactSection/ContactSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faXmark,
  faCircleCheck,
  faCircleExclamation,
  faUpRightAndDownLeftFromCenter
} from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@mui/material';
import useScrollReveal from '../../hooks/useScrollReveal';
import { sendProductEnquiry } from '../../services/api';

const muiModalInputSx = {
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  boxSizing: 'border-box',
  '& .MuiOutlinedInput-root': {
    minHeight: '52px',
    backgroundColor: '#FAFAFA',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    width: '100%',
    boxSizing: 'border-box',
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
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    transform: 'translate(14px, 15px) scale(1)',
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
  '& input': {
    padding: '14px 16px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
  },
};

// Gallery Images
import galleryStorage from '../../assets/images/gallery/gallery-storage-sheds.jpg';
import galleryFresh from '../../assets/images/gallery/gallery-fresh-onions.jpg';
import galleryGrading from '../../assets/images/gallery/gallery-grading-line.jpg';
import galleryPackaged from '../../assets/images/gallery/gallery-packaged-mesh-bags.jpg';
import galleryTruck from '../../assets/images/gallery/gallery-truck-loading.jpg';
import galleryShip from '../../assets/images/gallery/gallery-cargo-ship-export.jpg';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    honeypot: '',
  });
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState('');
  const [productSuccessMsg, setProductSuccessMsg] = useState('');
  const [galleryOpenIndex, setGalleryOpenIndex] = useState(null);
  const galleryRef = useRef(null);

  const handleOpenFirstGalleryImage = () => {
    setGalleryOpenIndex(0);
    if (galleryRef.current && typeof galleryRef.current.openLightbox === 'function') {
      galleryRef.current.openLightbox(0);
    }
  };

  // Initialize scroll-triggered animations
  useScrollReveal([selectedProduct]);

  const galleryItems = [
    {
      src: galleryStorage,
      title: 'Bulk Storage Warehouses & Palletized Sheds',
      alt: 'Large onion storage warehouse with organized stacks of red mesh bags'
    },
    {
      src: galleryFresh,
      title: 'Farm-Fresh Graded Red Onions',
      alt: 'Freshly harvested Indian red onions with rich crimson skin'
    },
    {
      src: galleryGrading,
      title: 'Conveyor Sorting & Precision Quality Grading',
      alt: 'Workers sorting and grading fresh onions along packhouse conveyor line'
    },
    {
      src: galleryPackaged,
      title: 'Standardized Export Mesh Bag Packaging',
      alt: 'Neatly organized stacks of red mesh bags ready for export'
    },
    {
      src: galleryTruck,
      title: 'Container Freight Loading & Dispatch',
      alt: 'Loading pallets of onion sacks into freight logistics container truck'
    },
    {
      src: galleryShip,
      title: 'Global Ocean Freight Container Transit',
      alt: 'International cargo container vessel carrying export shipments at sea'
    }
  ];

  const handleScrollTo = (targetId) => {
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 80;
      const targetTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.round(targetTop - headerHeight),
        behavior: 'smooth',
      });
    }
  };

  const handleInquireProduct = (product) => {
    setSelectedProduct(product);
    setInquirySuccess(false);
    setProductForm({ name: '', email: '', phone: '', quantity: '', honeypot: '' });
    setProductError('');
    setProductSuccessMsg('');
  };

  const handleQuickModalSubmit = async (e) => {
    e.preventDefault();
    setProductLoading(true);
    setProductError('');

    try {
      const response = await sendProductEnquiry({
        name: productForm.name,
        email: productForm.email,
        phone: productForm.phone,
        productName: selectedProduct?.title || 'Red Onion',
        origin: selectedProduct?.origin || 'Indian Origin (Nashik / Maharashtra)',
        sizeRange: selectedProduct?.sizeRange || '40mm - 70mm',
        quantity: productForm.quantity,
        honeypot: productForm.honeypot,
      });

      setInquirySuccess(true);
      setProductSuccessMsg(
        response.message || `Your inquiry for ${selectedProduct?.title || 'our products'} has been submitted.`
      );
    } catch (err) {
      setProductError(err.message || 'Unable to submit your product inquiry. Please try again.');
    } finally {
      setProductLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero
        onExplore={(e) => { e.preventDefault(); handleScrollTo('about'); }}
        onContact={(e) => { e.preventDefault(); handleScrollTo('contact'); }}
      />

      {/* 2. About Section */}
      <About
        onLearnMore={(e) => { e.preventDefault(); handleScrollTo('products'); }}
      />

      {/* 3. Products Section */}
      <Products
        onInquireProduct={handleInquireProduct}
      />

      {/* 4. Infrastructure Section */}
      <Infrastructure
        onExplore={(e) => { e.preventDefault(); handleScrollTo('gallery'); }}
      />

      {/* 5. Gallery Section */}
      <section id="gallery" className="section-wrapper bg-white gallery-section">
        <div className="container-wide">
          <div className="gallery-header-row reveal-on-scroll">
            <div className="gallery-title-box">
              <span className="eyebrow">OUR GALLERY</span>
              <h2 className="gallery-section-title">Real Operations. Real Scale.</h2>
              <p className="gallery-section-subtitle">
                A closer look at our storage sheds, grading operations, packaging standards, and export logistics.
              </p>
            </div>
            <div className="gallery-header-action">
              <button
                type="button"
                className="btn btn-primary btn-medium gallery-header-btn"
                onClick={handleOpenFirstGalleryImage}
              >
                <span>View Gallery</span>
                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
              </button>
            </div>
          </div>

          <Gallery
            ref={galleryRef}
            items={galleryItems}
            openIndex={galleryOpenIndex}
            onClose={() => setGalleryOpenIndex(null)}
          />

          <div className="gallery-bottom-action reveal-on-scroll">
            <button
              type="button"
              className="btn btn-primary btn-large gallery-bottom-btn"
              onClick={handleOpenFirstGalleryImage}
            >
              <span>View Gallery</span>
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Supply Capabilities Section */}
      <Capabilities
        onContact={(e) => { e.preventDefault(); handleScrollTo('contact'); }}
      />

      {/* 7. Contact Section */}
      <section id="contact" className="section-wrapper bg-white contact-main-section">
        <div className="container-wide">
          <div className="contact-section-header reveal-on-scroll">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2 className="contact-section-title">Connect with Our Export Desk</h2>
            <p className="contact-section-desc">
              Whether you need regular container shipments or bulk seasonal consignments, our team is ready to assist with specifications, pricing, and freight schedules.
            </p>
          </div>

          <ContactSection />
        </div>
      </section>

      {/* Product Quick-Inquiry Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="modal-header">
              <div className="modal-thumb-wrap">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="modal-thumb" />
              </div>
              <div className="modal-product-details">
                <span className="modal-origin">{selectedProduct.origin}</span>
                <h3 className="modal-title">{selectedProduct.title}</h3>
                <span className="modal-sizes">Size: <strong>{selectedProduct.sizeRange}</strong></span>
              </div>
            </div>

            <p className="modal-desc">{selectedProduct.description}</p>

            {inquirySuccess ? (
              <div className="modal-success-state">
                <FontAwesomeIcon icon={faCircleCheck} size="2x" className="modal-check-icon" />
                <h4>Inquiry Sent Successfully!</h4>
                <p>
                  {productSuccessMsg || `We have received your interest in ${selectedProduct.title}.`}
                  {' '}Our export desk will review your requirements and reach out promptly.
                </p>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Bhagwati Traders, I just submitted an inquiry for bulk supply of ${selectedProduct.title} (${selectedProduct.sizeRange}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-medium modal-whatsapp-btn"
                >
                  Continue on WhatsApp →
                </a>
              </div>
            ) : (
              <form onSubmit={handleQuickModalSubmit} className="modal-form">
                {productError && (
                  <div className="modal-error-alert" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <span>{productError}</span>
                  </div>
                )}

                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="user_note_hp"
                  value={productForm.honeypot}
                  onChange={(e) => setProductForm({ ...productForm, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <TextField
                  label="Your Name / Company"
                  required
                  fullWidth
                  placeholder="e.g. Ahmed Al Mansoori - Gulf Imports"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  sx={muiModalInputSx}
                />

                <div className="modal-form-row">
                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    fullWidth
                    placeholder="buyer@company.com"
                    value={productForm.email}
                    onChange={(e) => setProductForm({ ...productForm, email: e.target.value })}
                    sx={muiModalInputSx}
                  />

                  <TextField
                    label="Phone / WhatsApp Number"
                    type="tel"
                    required
                    fullWidth
                    placeholder="+971 50 123 4567"
                    value={productForm.phone}
                    onChange={(e) => setProductForm({ ...productForm, phone: e.target.value })}
                    sx={muiModalInputSx}
                  />
                </div>

                <TextField
                  label="Required Quantity (Metric Tons)"
                  fullWidth
                  placeholder="e.g. 50 MT (2 Containers)"
                  value={productForm.quantity}
                  onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
                  sx={muiModalInputSx}
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-medium modal-submit-btn"
                  disabled={productLoading}
                >
                  <span>{productLoading ? 'Submitting Inquiry...' : 'Confirm Inquiry'}</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
