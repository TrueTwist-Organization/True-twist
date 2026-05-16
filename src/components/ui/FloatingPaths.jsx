"use client";
import React from "react";
import { motion } from "framer-motion";

function FloatingPath({ position, index }) {
  const d = `M-${380 - index * 5 * position} -${189 + index * 6}C-${
    380 - index * 5 * position
  } -${189 + index * 6} -${312 - index * 5 * position} ${216 - index * 6} ${
    152 - index * 5 * position
  } ${343 - index * 6}C${616 - index * 5 * position} ${470 - index * 6} ${
    684 - index * 5 * position
  } ${875 - index * 6} ${684 - index * 5 * position} ${875 - index * 6}`;

  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={0.5 + index * 0.03}
      strokeOpacity={0.1 + index * 0.03}
      initial={{ pathLength: 0.3, opacity: 0.6 }}
      animate={{
        pathLength: 1,
        opacity: [0.3, 0.6, 0.3],
        pathOffset: [0, 1, 0],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );
}

export function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => i);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full text-orange-500/20"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((id) => (
          <FloatingPath key={id} index={id} position={position} />
        ))}
      </svg>
    </div>
  );
}
