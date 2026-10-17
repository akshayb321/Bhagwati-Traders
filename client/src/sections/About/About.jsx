import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faUsers, faCircleCheck, faArrowRight, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import aboutImg from '../../assets/images/about/onion-field-harvest.jpg';

export default function About({ onLearnMore }) {
  return (
    <section id="about" className="section-wrapper bg-warm about-section">
      <div className="container-wide about-container">
        {/* Left Side: Visual & Floating Trust Badge */}
        <div className="about-visual-col reveal-on-scroll">
          <div className="about-image-card">
            <img
              src={aboutImg}
              alt="Bhagwati Traders onion farm harvest and quality sourcing"
              className="about-photo"
              loading="lazy"
            />
            {/* Floating Trust Badge */}
            <div className="about-trust-badge reveal-on-scroll delay-2">
              <div className="badge-icon-box">
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>
              <div className="badge-text-box">
                <span className="badge-title">Trusted by Global Buyers</span>
                <span className="badge-sub">Quality Consistency. Long-Term Partnerships.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right Content */}
        <div className="about-content-col reveal-on-scroll delay-1">
          <span className="eyebrow">ABOUT BHAGWATI TRADERS</span>
          <h2 className="about-headline">
            Your Trusted Partner<br />in Onion Trading
          </h2>
          <p className="about-description">
            Bhagwati Traders is a reputed onion trading and export company based in India, committed to delivering high-quality onions to international markets. With years of experience, strong farmer networks and a focus on quality, we ensure consistent supply, competitive pricing and timely delivery.
          </p>
          <div className="about-action">
            <a href="#products" className="btn btn-primary btn-medium" onClick={onLearnMore}>
              <span>Learn More</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>

        {/* Right Column: 3 Pillars */}
        <div className="about-pillars-col">
          <div className="pillar-card reveal-on-scroll delay-1">
            <div className="pillar-icon-box">
              <FontAwesomeIcon icon={faAward} />
            </div>
            <div className="pillar-text">
              <h4 className="pillar-title">Quality Assurance</h4>
              <p className="pillar-sub">Careful selection &amp; grading</p>
            </div>
          </div>

          <div className="pillar-card reveal-on-scroll delay-2">
            <div className="pillar-icon-box">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="pillar-text">
              <h4 className="pillar-title">Strong Network</h4>
              <p className="pillar-sub">Direct sourcing from farmers</p>
            </div>
          </div>

          <div className="pillar-card reveal-on-scroll delay-3">
            <div className="pillar-icon-box">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <div className="pillar-text">
              <h4 className="pillar-title">Global Standards</h4>
              <p className="pillar-sub">Meets international requirements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
