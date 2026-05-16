"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";

interface ThreeDTextProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  highlightClassName?: string;
}

export const ThreeDText: React.FC<ThreeDTextProps> = ({
  text,
  highlightWords = [],
  className,
  highlightClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Splitting text into words and checking for highlights
  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative", className)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-[1.4] md:leading-tight tracking-tight text-white">
          {words.map((word, wordIndex) => {
            const cleanWord = word.replace(/[?,.!]/g, "");
            const isHighlighted = highlightWords.some((hw) =>
              hw.toLowerCase().includes(cleanWord.toLowerCase())
            );

            return (
              <span
                key={wordIndex}
                className="inline-block mr-[0.25em] relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: (wordIndex * 0.1) + (charIndex * 0.03),
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className={cn(
                      "inline-block",
                      isHighlighted ? cn("text-orange-500", highlightClassName) : ""
                    )}
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
        </h2>
        
        {/* Dynamic Glow Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(234, 88, 12, 0.15) 0%, transparent 80%)`,
            zIndex: -1,
            transform: "translateZ(-20px)",
          }}
        />
      </motion.div>
    </div>
  );
};
