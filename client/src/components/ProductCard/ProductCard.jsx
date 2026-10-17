import React from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard({
  image,
  title,
  origin = 'Indian Origin',
  sizeRange = '40mm - 70mm',
  onInquire
}) {
  return (
    <div className="product-card" onClick={onInquire} role="button" tabIndex={0}>
      <div className="product-image-container">
        <img src={image} alt={`${title} - ${origin}`} className="product-image" loading="lazy" />
      </div>
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-title">{title}</h3>
          <span className="product-origin">({origin})</span>
        </div>
        <div className="product-footer">
          <span className="product-sizes">
            Available in: <strong>{sizeRange}</strong>
          </span>
          <div className="product-arrow-btn" aria-label={`Enquire about ${title}`}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
