import React from 'react';
import './MainLayout.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="app-layout">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Main Outlet / Page Content */}
      <main className="app-main-content">
        {children}
      </main>

      {/* 3. Global Corporate Footer */}
      <Footer />
    </div>
  );
}
