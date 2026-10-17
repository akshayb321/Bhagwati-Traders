import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logoLight from "../../assets/images/logo/Elegant BT Onion Crest Logo-Photoroom.png";

export default function Footer({
  phone = "+91 98765 43210",
  email = "info@bhagwatitraders.in",
  location = "Nashik, Maharashtra, India",
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Infrastructure", href: "#infrastructure" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="container-wide footer-container">
        {/* Main Footer Row */}
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-col footer-brand-col">
            <div className="footer-logo-row">
              <img
                src={logoLight}
                alt="Bhagwati Traders Emblem"
                className="footer-onion-emblem"
              />
              <div className="footer-brand-text">
                <span className="footer-brand-name">Bhagwati Traders</span>
                <span className="footer-brand-tagline">
                  ONION TRADING &amp; EXPORT
                </span>
              </div>
            </div>
            <p className="footer-about-text">
              Reputed Indian onion trading and export company delivering premium
              grade red, yellow, and white onions to international markets with
              dependability and consistency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="footer-nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="footer-contact-icon"
                />
                <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="footer-contact-icon"
                />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="footer-contact-icon"
                />
                <span>{location}</span>
              </li>
            </ul>
          </div>

          {/* Social Links & Back to Top */}
          <div className="footer-col footer-social-col">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-social-row">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Bhagwati Traders. All rights
            reserved.
          </p>
          <div className="footer-slogan">
            <span>Quality Onions</span>
            <span className="dot-sep">&bull;</span>
            <span>Global Partnerships</span>
            <span className="dot-sep">&bull;</span>
            <span>Sustainable Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
