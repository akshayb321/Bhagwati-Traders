import React from 'react';
import './Button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'white'
  size = 'medium',     // 'small', 'medium', 'large'
  href,
  onClick,
  showArrow = false,
  className = '',
  type = 'button',
  ...props
}) {
  const buttonClass = `btn btn-${variant} btn-${size} ${className}`.trim();

  const content = (
    <>
      <span className="btn-text">{children}</span>
      {showArrow && <FontAwesomeIcon icon={faArrowRight} className="btn-arrow" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={buttonClass} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClass} {...props}>
      {content}
    </button>
  );
}
