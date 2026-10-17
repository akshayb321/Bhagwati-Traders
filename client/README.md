# Bhagwati Traders — Premium Responsive Website

Official high-performance responsive web application for **Bhagwati Traders**, a premier onion trading and export enterprise based in Nashik, Maharashtra, India.

---

## 🌾 Overview

This project is a modern, responsive single-page web experience engineered strictly with **React**, **Vite**, **JavaScript**, **JSX**, and **modular CSS files**. It showcases Bhagwati Traders' commercial onion trading capabilities, infrastructure, export varieties, packing scale, and international reach.

### Core Visual & Brand Identity
- **Primary Brand Color**: Deep Burgundy / Wine Red (`#762C3A`, `#57202B`)
- **Secondary / Accent Colors**: Muted Olive Green (`#777B50`), Forest Green (`#142C25`)
- **Backgrounds**: Warm Off-White (`#FAF8F5`) and Crisp White (`#FFFFFF`)
- **Typography**:
  - Headings: `DM Serif Display`
  - Body: `Inter`
  - Signature Script: `Caveat`
- **Brand Emblem**: Customized Bhagwati Traders Onion Emblem

---

## 📁 Project Structure

```text
bhagwati-traders/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── logo/
│   │       │   ├── bhagwati-logo.png
│   │       │   ├── bhagwati-logo-transparent.png
│   │       │   └── bhagwati-logo-light.png
│   │       ├── hero/
│   │       │   └── hero-onion-warehouse.jpg
│   │       ├── about/
│   │       │   └── onion-field-harvest.jpg
│   │       ├── products/
│   │       │   ├── red-onion.jpg
│   │       │   ├── yellow-onion.jpg
│   │       │   └── white-onion.jpg
│   │       ├── infrastructure/
│   │       │   ├── onion-storage-shed.jpg
│   │       │   ├── warehouse-exterior.jpg
│   │       │   └── warehouse-forklift-loading.jpg
│   │       ├── gallery/
│   │       │   ├── gallery-storage-sheds.jpg
│   │       │   ├── gallery-fresh-onions.jpg
│   │       │   ├── gallery-grading-line.jpg
│   │       │   ├── gallery-packaged-mesh-bags.jpg
│   │       │   ├── gallery-truck-loading.jpg
│   │       │   └── gallery-cargo-ship-export.jpg
│   │       └── contact/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── SectionHeading/
│   │   │   ├── SectionHeading.jsx
│   │   │   └── SectionHeading.css
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductCard.css
│   │   ├── Gallery/
│   │   │   ├── Gallery.jsx
│   │   │   └── Gallery.css
│   │   └── ContactSection/
│   │       ├── ContactSection.jsx
│   │       └── ContactSection.css
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.css
│   │   ├── Products/
│   │   │   ├── Products.jsx
│   │   │   └── Products.css
│   │   ├── Infrastructure/
│   │   │   ├── Infrastructure.jsx
│   │   │   └── Infrastructure.css
│   │   ├── Capabilities/
│   │   │   ├── Capabilities.jsx
│   │   │   └── Capabilities.css
│   ├── pages/
│   │   └── Home/
│   │       ├── Home.jsx
│   │       └── Home.css
│   ├── styles/
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── responsive.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The site will run at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready build in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📱 Responsive Verification Matrix

Tested and optimized for:
- **Mobile (Small / Standard)**: 320px, 360px, 375px, 390px, 480px
- **Tablets**: 768px, 834px, 1024px
- **Laptops & Standard Desktops**: 1280px, 1366px, 1440px
- **Ultra-Wide Screens**: 1920px+

---

## ⚡ Key Features

1. **Sticky Header Navigation**:
   - High-fidelity brand onion emblem + typography.
   - Smooth anchor jumping with offset calculation.
   - Global Supply badge indicator.
   - Accessible slide-in mobile navigation drawer.

2. **Hero Section**:
   - High-definition warehouse backdrop with natural grain and warm illumination.
   - Authentic script typography: *"From Our Farms to Your Markets"*.
   - Value trust markers (Naturally Grown, Reliable Supply, Global Reach).

3. **About Section**:
   - Authentic farm harvest visual with floating trust credentials badge.
   - Three core pillars: Quality Assurance, Strong Farmer Network, Global Standards.

4. **Products Catalog**:
   - Red Onion, Yellow Onion, White Onion with size specifications (40mm - 70mm).
   - Interactive Quick Inquiry modal with instant WhatsApp/Email trade desk dispatch.

5. **Infrastructure Mosaic**:
   - Modern storage sheds, packhouse exteriors, and motorized logistics equipment.
   - Key operational capacity counters: 50,000+ MT capacity, 2 sheds, 100+ workforce.

6. **Interactive Gallery & Lightbox**:
   - 6 high-definition operational photos.
   - Full-screen lightbox with keyboard controls (Escape, Arrow Left/Right).

7. **Supply Capabilities & CTA**:
   - 20+ countries supplied, 5,000+ MT monthly supply, Pan-India sourcing.
   - Deep burgundy partnership CTA card.

8. **Direct Trade Desk Communication**:
   - One-click WhatsApp direct chat link.
   - One-click `mailto:` inquiry generator with pre-filled trade parameters.
   - Direct telephone dialing.
