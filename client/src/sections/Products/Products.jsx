import React, { useState, useEffect } from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faXmark, faBoxArchive, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../../components/ProductCard/ProductCard';
import redOnionImg from '../../assets/images/products/red-onion.jpg';
import yellowOnionImg from '../../assets/images/products/yellow-onion.jpg';
import whiteOnionImg from '../../assets/images/products/white-onion.jpg';

export default function Products({ onInquireProduct }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 'red-onion',
      title: 'Red Onion',
      origin: 'Indian Origin (Nashik / Maharashtra)',
      sizeRange: '40mm - 70mm',
      image: redOnionImg,
      description: 'Firm, pungent, and rich in natural antioxidants with deep purple-red papery skin. Preferred worldwide for culinary, retail, and food service markets.',
      packaging: '5kg, 10kg, 25kg, 50kg Red Leno Mesh Bags',
      grade: 'Export Grade A / Commercial Grade'
    },
    {
      id: 'yellow-onion',
      title: 'Yellow Onion',
      origin: 'Indian Origin (Maharashtra / Gujarat)',
      sizeRange: '40mm - 70mm',
      image: yellowOnionImg,
      description: 'Golden-amber skin with balanced sweetness and pungency. Excellent storage life and high dry-matter content suitable for export and processing.',
      packaging: '10kg, 25kg, 50kg Mesh Sacks or Jute Bags',
      grade: 'Export Grade A'
    },
    {
      id: 'white-onion',
      title: 'White Onion',
      origin: 'Indian Origin (Gujarat / Maharashtra)',
      sizeRange: '40mm - 70mm',
      image: whiteOnionImg,
      description: 'Pristine pearlescent white skin with crisp texture and sharp, zesty flavor. Highly sought after for dehydration, culinary processing, and Middle Eastern export.',
      packaging: '10kg, 25kg, 50kg Breathable Mesh Bags',
      grade: 'Export Grade A / Dehydration Grade'
    }
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleInquireFromModal = (product) => {
    setIsModalOpen(false);
    if (onInquireProduct) {
      onInquireProduct(product);
    }
  };

  return (
    <section id="products" className="section-wrapper bg-white products-section">
      <div className="container-wide">
        <div className="products-layout">
          {/* Header & CTA Block */}
          <div className="products-header-block reveal-on-scroll">
            <div className="products-heading-wrap">
              <span className="eyebrow">OUR PRODUCTS</span>
              <h2 className="products-headline">
                Premium Onion Varieties &amp; Supply
              </h2>
            </div>
            <p className="products-subtext">
              We offer a wide range of onion varieties, available in multiple grades and packaging options to meet the needs of global buyers.
            </p>
            <div className="products-header-action">
              <button
                type="button"
                className="btn btn-primary btn-medium"
                onClick={() => setIsModalOpen(true)}
              >
                <span>View All Products</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          {/* Cards Grid with Staggered Scroll Entrance */}
          <div className="products-grid">
            {products.map((item, idx) => (
              <div key={item.id} className={`reveal-on-scroll delay-${idx + 1}`}>
                <ProductCard
                  image={item.image}
                  title={item.title}
                  origin={item.origin.split(' ')[0] + ' Origin'}
                  sizeRange={item.sizeRange}
                  onInquire={() => onInquireProduct && onInquireProduct(item)}
                />
              </div>
            ))}
          </div>

          {/* Mobile Bottom Action matching mobile reference */}
          <div className="products-mobile-btn-wrap reveal-on-scroll delay-2">
            <button
              type="button"
              className="btn btn-primary btn-medium"
              onClick={() => setIsModalOpen(true)}
            >
              <span>View All Products</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>

      {/* All Products Pop-up Modal */}
      {isModalOpen && (
        <div
          className="products-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="products-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Navigation & Header Bar */}
            <div className="products-modal-top-bar">
              <button
                type="button"
                className="products-modal-back-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back</span>
              </button>

              <div className="products-modal-title-group">
                <span className="eyebrow">EXPORT SPECIFICATIONS</span>
                <h3 className="products-modal-title">All Onion Varieties</h3>
              </div>

              <button
                type="button"
                className="products-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Varieties List / Grid Inside Modal */}
            <div className="products-modal-grid">
              {products.map((item) => (
                <div key={item.id} className="modal-variety-card">
                  <div className="modal-variety-img-wrap">
                    <img src={item.image} alt={item.title} className="modal-variety-img" />
                    <span className="modal-variety-size-badge">{item.sizeRange}</span>
                  </div>

                  <div className="modal-variety-content">
                    <div className="modal-variety-header">
                      <h4 className="modal-variety-title">{item.title}</h4>
                      <span className="modal-variety-origin">{item.origin}</span>
                    </div>

                    <p className="modal-variety-desc">{item.description}</p>

                    <div className="modal-variety-specs">
                      <div className="spec-row">
                        <FontAwesomeIcon icon={faBoxArchive} className="spec-icon" />
                        <span><strong>Packaging:</strong> {item.packaging}</span>
                      </div>
                      <div className="spec-row">
                        <FontAwesomeIcon icon={faShieldHalved} className="spec-icon" />
                        <span><strong>Grading:</strong> {item.grade}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-small modal-variety-inquire-btn"
                      onClick={() => handleInquireFromModal(item)}
                    >
                      <span>Inquire for {item.title}</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
