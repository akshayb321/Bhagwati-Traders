import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faBars, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../../assets/images/logo/bhagwati-logo-transparent.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Do not override activeSection while smooth scrolling triggered by a click
      if (isClickScrollingRef.current) return;

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 80;

      // At top of page
      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }

      // At bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("contact");
        return;
      }

      // Check sections from bottom to top
      const sections = [
        "contact",
        "gallery",
        "infrastructure",
        "products",
        "about",
        "home",
      ];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerHeight + 50) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About Us", href: "#about", id: "about" },
    { name: "Products", href: "#products", id: "products" },
    { name: "Infrastructure", href: "#infrastructure", id: "infrastructure" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);

    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 80;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.round(targetTop - headerHeight),
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container-wide nav-container">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          className="brand-logo-group"
          onClick={(e) => handleLinkClick(e, "#home")}
        >
          <img
            src={logoImg}
            alt="Bhagwati Traders Emblem"
            className="brand-onion-emblem"
          />
          <div className="brand-text-block">
            <span className="brand-name">Bhagwati Traders</span>
            <span className="brand-tagline">ONION TRADING & EXPORT</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="active-indicator" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Global Supply Badge */}
        <div className="nav-badge-wrapper">
          <div className="global-supply-pill">
            <div className="pill-icon-box">
              <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
            </div>
            <div className="pill-text">
              <span className="pill-title">Global Supply</span>
              <span className="pill-subtitle">From India to the World</span>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="mobile-nav-item">
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? "active" : ""}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span>{link.name}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="mobile-arrow" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-supply-badge">
            <div className="global-supply-pill mobile-pill">
              <div className="pill-icon-box">
                <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
              </div>
              <div className="pill-text">
                <span className="pill-title">Global Supply</span>
                <span className="pill-subtitle">From India to the World</span>
              </div>
            </div>
            <a
              href="#contact"
              className="btn btn-primary btn-medium mobile-contact-btn"
              onClick={(e) => handleLinkClick(e, "#contact")}
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
