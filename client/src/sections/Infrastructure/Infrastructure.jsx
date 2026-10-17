import React from 'react';
import './Infrastructure.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import storageShedImg from '../../assets/images/infrastructure/onion-storage-shed.jpg';
import exteriorImg from '../../assets/images/infrastructure/warehouse-exterior.jpg';
import forkliftImg from '../../assets/images/infrastructure/warehouse-forklift-loading.jpg';

export default function Infrastructure({ onExplore }) {
  return (
    <section id="infrastructure" className="section-wrapper bg-warm infrastructure-section">
      <div className="container-wide infrastructure-container">
        {/* Left Side: Photo Mosaic */}
        <div className="infra-visual-col reveal-on-scroll">
          <div className="infra-mosaic-grid">
            <div className="mosaic-main">
              <img
                src={storageShedImg}
                alt="Modern onion storage shed interior with stacked mesh sacks"
                className="mosaic-img"
                loading="lazy"
              />
            </div>
            <div className="mosaic-sub-stack">
              <div className="mosaic-sub">
                <img
                  src={exteriorImg}
                  alt="Bhagwati Traders modern warehouse facility exterior"
                  className="mosaic-img"
                  loading="lazy"
                />
              </div>
              <div className="mosaic-sub">
                <img
                  src={forkliftImg}
                  alt="Warehouse forklift logistics and onion pallet handling"
                  className="mosaic-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Operational Details & Metrics */}
        <div className="infra-content-col reveal-on-scroll delay-1">
          <span className="eyebrow">OUR INFRASTRUCTURE</span>
          <h2 className="infra-headline">
            Modern Sheds.<br />Strong Operations.
          </h2>
          <p className="infra-description">
            Our well-equipped storage facilities, sorting and packing units help us maintain quality and supply consistency, even during peak seasons.
          </p>

          {/* Key Metrics */}
          <div className="infra-stats-row">
            <div className="stat-card reveal-on-scroll delay-1">
              <span className="stat-number">50,000+ MT</span>
              <span className="stat-label">Storage Capacity</span>
            </div>
            <div className="stat-card reveal-on-scroll delay-2">
              <span className="stat-number">2</span>
              <span className="stat-label">Trading Sheds</span>
            </div>
            <div className="stat-card reveal-on-scroll delay-3">
              <span className="stat-number">100+</span>
              <span className="stat-label">Skilled Workforce</span>
            </div>
          </div>

          <div className="infra-action">
            <a href="#gallery" className="btn btn-outline btn-medium" onClick={onExplore}>
              <span>Explore Our Infrastructure</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
