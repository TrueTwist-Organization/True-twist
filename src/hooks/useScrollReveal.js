import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   TrueWiz Scroll Reveal
   Uses IntersectionObserver to add [data-sr-visible] to
   elements when they enter the viewport.
   CSS in scroll-reveal.css handles the actual transitions.
   Framer-motion elements are NOT affected because they use
   inline `style` attributes which take priority over our CSS.
   ───────────────────────────────────────────────────────────── */

const CARD_GRID_SELECTORS = [
  '.services-grid',
  '.services-cinema-track',
  '.insights-grid',
  '.team-grid',
  '.portfolio-grid',
  '.gallery-grid',
  '.home-team-featured',
  '.home-market-cta-inner',
  '.footer-grid',
];

const CONTENT_SELECTORS = [
  'section:not(.hero) h1:not(.sr-skip)',
  'section:not(.hero) h2:not(.sr-skip)',
  'section:not(.hero) h3:not(.sr-skip)',
  'section:not(.hero) h4:not(.sr-skip)',
  'section:not(.hero) .section-header',
  'section:not(.hero) p:not(.sr-skip)',
  'section:not(.hero) .btn-primary',
  'section:not(.hero) .btn-outline',
  'section:not(.hero) .btn-premium-outline',
  'section:not(.hero) .home-team-cta-outline',
  '.footer .footer-col',
  '.footer .footer-bottom',
  '.sr-up',
  '.sr-left',
  '.sr-right',
  '.sr-scale',
];

const STAT_SELECTOR = '.hero-stat-value';

/* Count numbers up when stat enters view */
const animateStat = (el) => {
  const original = el.textContent.trim();
  const match = original.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return;

  const target = parseFloat(match[1]);
  const suffix = match[2] || '';
  const duration = 900; // ms
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = `${Math.round(eased * target)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = original;
  };

  requestAnimationFrame(tick);
};

/* Mark card children with stagger index */
const markCardStagger = (container) => {
  Array.from(container.children).forEach((child, i) => {
    child.setAttribute('data-sr-index', String(Math.min(i, 7)));
  });
};

export const useScrollReveal = (pathname) => {
  const observerRef = useRef(null);
  const statObserverRef = useRef(null);

  useEffect(() => {
    /* Disconnect previous observers on route change */
    observerRef.current?.disconnect();
    statObserverRef.current?.disconnect();

    /* Small delay — let React paint + framer-motion set initial inline styles */
    const timer = setTimeout(() => {
      /* ── Stat counter observer ── */
      const statEls = document.querySelectorAll(STAT_SELECTOR);
      if (statEls.length) {
        statObserverRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.setAttribute('data-sr-stat', '');
                entry.target.setAttribute('data-sr-visible', '');
                animateStat(entry.target);
                statObserverRef.current?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 },
        );
        statEls.forEach((el) => statObserverRef.current.observe(el));
      }

      /* ── Card grids: mark children with stagger index ── */
      CARD_GRID_SELECTORS.forEach((sel) => {
        document.querySelectorAll(sel).forEach(markCardStagger);
      });

      /* ── Content reveal observer ── */
      const elements = [];
      CONTENT_SELECTORS.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          /* Skip elements framer-motion already controls via inline style */
          const inlineStyle = el.getAttribute('style') || '';
          const hasMotionOpacity = inlineStyle.includes('opacity');
          if (!hasMotionOpacity) {
            elements.push(el);
          } else {
            /* If it has motion opacity, ensure it's not hidden by SR CSS */
            el.classList.add('sr-skip');
          }
        });
      });

      const unique = [...new Set(elements)];

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute('data-sr-visible', '');
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '0px' }, // Much more aggressive
      );

      unique.forEach((el) => observerRef.current.observe(el));
    }, 400); // More time for layout to settle

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      statObserverRef.current?.disconnect();
    };
  }, [pathname]);
};
