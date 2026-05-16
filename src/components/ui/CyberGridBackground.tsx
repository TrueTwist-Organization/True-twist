"use client";
import React from "react";

export const CyberGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {/* Top Grid */}
      <div 
        className="absolute top-0 left-0 w-full h-1/2"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="w-full h-[200%] origin-bottom"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(234, 88, 12, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(234, 88, 12, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            transform: "rotateX(75deg) translateY(-50%)",
            maskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      {/* Bottom Grid */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="w-full h-[200%] origin-top"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(234, 88, 12, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(234, 88, 12, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            transform: "rotateX(-75deg) translateY(0%)",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </div>

      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-orange-600/10 blur-[120px]" />
    </div>
  );
};
