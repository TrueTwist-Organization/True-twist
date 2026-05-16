"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#fff";
  const colorDesignation = colors.designation ?? "#f97316";
  const colorTestimony = colors.testimony ?? "#e5e5e5";
  const colorArrowBg = colors.arrowBackground ?? "#ea580c";
  const colorArrowFg = colors.arrowForeground ?? "#fff";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#fff";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayRestartRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const INTERVAL_MS = 4000;

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, INTERVAL_MS);
  }, [autoplay, testimonialsLength]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      if (autoplayRestartRef.current) clearTimeout(autoplayRestartRef.current);
    };
  }, [startAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  const pauseAndRestart = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    if (autoplayRestartRef.current) clearTimeout(autoplayRestartRef.current);
    autoplayRestartRef.current = setTimeout(() => startAutoplay(), 2000);
  }, [startAutoplay]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    pauseAndRestart();
  }, [testimonialsLength, pauseAndRestart]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    pauseAndRestart();
  }, [testimonialsLength, pauseAndRestart]);

  // Image stack: show active (center), left, right
  function getImageStyle(index: number): React.CSSProperties {
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "none",
        transform: "translateX(-48px) translateY(-32px) scale(0.82) rotateY(12deg)",
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "none",
        transform: "translateX(48px) translateY(-32px) scale(0.82) rotateY(-12deg)",
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  };

  // Dot indicators
  const dots = Array.from({ length: testimonialsLength });

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
          alignItems: "center",
        }}
        className="ct-grid"
      >
        {/* ── Image Stack ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "320px",
            margin: "0 auto",
            height: "280px",
            perspective: "1000px",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "1.25rem",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                ...getImageStyle(index),
              }}
            />
          ))}
        </div>

        {/* ── Content ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <p style={{
                fontWeight: 700,
                fontSize: "1.25rem",
                color: colorName,
                marginBottom: "0.15rem",
                lineHeight: 1.3,
              }}>
                {activeTestimonial.name}
              </p>
              <p style={{
                fontSize: "0.85rem",
                color: colorDesignation,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}>
                {activeTestimonial.designation}
              </p>
              <p style={{
                color: colorTestimony,
                fontSize: "0.95rem",
                lineHeight: 1.75,
                margin: 0,
              }}>
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(6px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 0.18, ease: "easeInOut", delay: 0.018 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrow buttons + dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              style={{
                width: "2.4rem",
                height: "2.4rem",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                transition: "background-color 0.25s, transform 0.2s",
                transform: hoverPrev ? "scale(1.1)" : "scale(1)",
                flexShrink: 0,
              }}
            >
              <FaArrowLeft size={14} color={hoverPrev ? colorArrowBg : colorArrowFg} />
            </button>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              {dots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(i); pauseAndRestart(); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    width: i === activeIndex ? "1.5rem" : "0.45rem",
                    height: "0.45rem",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    backgroundColor: i === activeIndex ? "#ea580c" : "rgba(255,255,255,0.25)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              style={{
                width: "2.4rem",
                height: "2.4rem",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                transition: "background-color 0.25s, transform 0.2s",
                transform: hoverNext ? "scale(1.1)" : "scale(1)",
                flexShrink: 0,
              }}
            >
              <FaArrowRight size={14} color={hoverNext ? colorArrowBg : colorArrowFg} />
            </button>
          </div>
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (min-width: 640px) {
          .ct-grid {
            grid-template-columns: 280px 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
