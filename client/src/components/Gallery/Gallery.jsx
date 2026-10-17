import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Gallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faChevronLeft,
  faChevronRight,
  faUpRightAndDownLeftFromCenter
} from '@fortawesome/free-solid-svg-icons';

const Gallery = forwardRef(function Gallery({ items = [], openIndex = null, onClose }, ref) {
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    if (openIndex !== null && openIndex !== undefined) {
      setSelectedIdx(openIndex);
      document.body.style.overflow = 'hidden';
    }
  }, [openIndex]);

  const openLightbox = (index = 0) => {
    setSelectedIdx(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.style.overflow = 'auto';
    if (onClose) onClose();
  };

  useImperativeHandle(ref, () => ({
    openLightbox: (index = 0) => openLightbox(index)
  }));

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev + 1) % items.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setSelectedIdx((prev) => (prev + 1) % items.length);
      if (e.key === 'ArrowLeft') setSelectedIdx((prev) => (prev - 1 + items.length) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, items.length]);

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className={`gallery-item reveal-on-scroll delay-${(index % 6) + 1}`}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(index); }}
            aria-label={`View photo: ${item.caption || item.alt}`}
          >
            <div className="gallery-image-wrapper">
              <img
                src={item.src}
                alt={item.alt || `Gallery Image ${index + 1}`}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className="gallery-zoom-icon" />
                {item.title && <span className="gallery-item-caption">{item.title}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close modal">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>

          <button className="lightbox-nav-btn lightbox-prev" onClick={prevImage} aria-label="Previous image">
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[selectedIdx].src}
              alt={items[selectedIdx].alt}
              className="lightbox-main-img"
            />
            <div className="lightbox-caption-bar">
              <span className="lightbox-counter">
                {selectedIdx + 1} / {items.length}
              </span>
              <span className="lightbox-title">{items[selectedIdx].title || items[selectedIdx].alt}</span>
            </div>
          </div>

          <button className="lightbox-nav-btn lightbox-next" onClick={nextImage} aria-label="Next image">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
      )}
    </div>
  );
});

export default Gallery;
