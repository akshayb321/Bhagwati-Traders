import React from 'react';
import './SectionHeading.css';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light', // 'light' or 'dark'
  className = ''
}) {
  return (
    <div className={`section-heading section-heading-${align} section-heading-${theme} ${className}`.trim()}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
