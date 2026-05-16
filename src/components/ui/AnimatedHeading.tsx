"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  highlightText?: string;
  className?: string;
  delay?: number;
}

export const AnimatedHeading = ({ text, highlightText, className = "", delay = 0 }: AnimatedHeadingProps) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      },
    },
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(8px)",
    },
  };

  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => {
        const isHighlight = highlightText && word.toLowerCase().includes(highlightText.toLowerCase());
        return (
          <span 
            key={index} 
            className={isHighlight ? "highlight" : ""}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span key={charIndex} variants={child} style={{ display: "inline-block" }}>
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.h2>
  );
};
