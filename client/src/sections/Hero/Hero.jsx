import React from "react";
import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faShieldHalved, faGlobe, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import heroImg from "../../assets/images/hero/hero-onion-warehouse.jpg";

export default function Hero({ onExplore, onContact }) {
  return (
    <section id="home" className="hero-section">
      {/* Edge-to-Edge Background Image with Left-to-Right Gradient Fade */}
      <div className="hero-bg-container" aria-hidden="true">
        <div className="hero-bg-image-wrapper">
          <img src={heroImg} alt="" className="hero-bg-image" />
        </div>
        {/* Uplifted Signature Cursive Script Heading */}
        <div className="hero-script-overlay">
          <span className="script-text">
            From Our Farms
            <br />
            to Your Markets
          </span>
        </div>
      </div>

      {/* Foreground Content Container */}
      <div className="container-wide hero-container">
        <div className="hero-content">
          <span className="hero-eyebrow">
            PREMIUM ONION TRADING &amp; EXPORT
          </span>

          <h1 className="hero-headline">
            <span className="hero-headline-line">Quality Onions.</span>
            <span className="hero-headline-line">Reliable Supply.</span>
            <span className="hero-headline-line">Global Partnerships.</span>
          </h1>

          <p className="hero-description">
            Connecting quality onion sourcing with dependable bulk supply for
            businesses worldwide.
          </p>

          <div className="hero-actions">
            <a
              href="#about"
              className="btn btn-primary btn-large hero-btn-primary"
              onClick={onExplore}
            >
              <span>Explore Our Business</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <a
              href="#contact"
              className="btn btn-secondary btn-large hero-btn-secondary"
              onClick={onContact}
            >
              <span>Contact Us</span>
            </a>
          </div>

          {/* Value Badges Row */}
          <div className="hero-highlights">
            <div className="highlight-item">
              <div className="highlight-icon-box">
                <FontAwesomeIcon icon={faSeedling} />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Premium Quality</span>
                <span className="highlight-sub">Naturally Grown</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-box">
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Reliable Supply</span>
                <span className="highlight-sub">On Time, Every Time</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-box">
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Global Reach</span>
                <span className="highlight-sub">Serving 20+ Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
