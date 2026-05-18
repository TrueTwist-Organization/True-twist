import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Reset scroll position to top of the page when route changes
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback for native smooth/instant scrolling
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;
