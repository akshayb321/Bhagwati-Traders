import { useEffect } from 'react';

/**
 * Custom hook to initialize scroll-triggered entrance reveals using IntersectionObserver.
 * - Targets elements with `.reveal-on-scroll`
 * - Adds `.is-revealed` once entering viewport
 * - Unobserves after reveal to avoid repeated replays
 * - Respects prefers-reduced-motion
 * - Graceful fallback if IntersectionObserver is unavailable
 */
export default function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 60px 0px',
        threshold: 0.02,
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
