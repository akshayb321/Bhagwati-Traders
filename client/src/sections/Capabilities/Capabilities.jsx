import React from 'react';
import './Capabilities.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTruck, faLocationDot, faBoxArchive, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';

export default function Capabilities({ onContact }) {
  const capabilities = [
    {
      icon: <FontAwesomeIcon icon={faGlobe} size="lg" />,
      metric: '20+',
      label: 'Countries Supplied'
    },
    {
      icon: <FontAwesomeIcon icon={faTruck} size="lg" />,
      metric: '5,000+ MT',
      label: 'Monthly Supply Capacity'
    },
    {
      icon: <FontAwesomeIcon icon={faLocationDot} size="lg" />,
      metric: 'Pan India',
      label: 'Sourcing Network'
    },
    {
      icon: <FontAwesomeIcon icon={faBoxArchive} size="lg" />,
      metric: 'Flexible',
      label: 'Packaging & Logistics'
    }
  ];

  return (
    <section id="capabilities" className="section-wrapper bg-warm capabilities-section">
      <div className="container-wide">
        <div className="capabilities-container">
          {/* Left Area: Capabilities & World Map Background */}
          <div className="capabilities-main reveal-on-scroll">
            <span className="eyebrow">OUR SUPPLY CAPABILITIES</span>
            <h2 className="capabilities-headline">Growing Together Globally</h2>

            <div className="capabilities-grid">
              {capabilities.map((item, idx) => (
                <div key={idx} className={`capability-stat-item reveal-on-scroll delay-${idx + 1}`}>
                  <div className="capability-icon-wrap">
                    {item.icon}
                  </div>
                  <div className="capability-meta">
                    <span className="cap-metric">{item.metric}</span>
                    <span className="cap-label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Dark Burgundy Partnership CTA */}
          <div className="cta-partnership-card reveal-on-scroll delay-2">
            <div className="cta-icon-badge">
              <FontAwesomeIcon icon={faGlobe} className="cta-globe-icon" />
            </div>
            <h3 className="cta-card-title">Ready to Work Together?</h3>
            <p className="cta-card-desc">
              Let's build a strong and long-term partnership for your business.
            </p>
            <div className="cta-card-btn-wrap">
              <a href="#contact" className="btn btn-white btn-medium" onClick={onContact}>
                <span>Contact Us</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
