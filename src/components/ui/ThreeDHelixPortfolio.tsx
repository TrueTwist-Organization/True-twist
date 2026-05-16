"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
}

interface ThreeDHelixPortfolioProps {
  projects: Project[];
}

export const ThreeDHelixPortfolio = ({ projects }: ThreeDHelixPortfolioProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const helixRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!containerRef.current || !helixRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".helix-card");
    const totalCards = cards.length;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    // Helix configuration - Responsive
    const radius = isMobile ? 320 : isTablet ? 450 : 550;
    const heightStep = isMobile ? 140 : 180; 
    const angleStep = (Math.PI * 2) / (isMobile ? 3 : 4.2);

    // Initial positioning in 3D space
    cards.forEach((card, i) => {
      const angle = i * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = i * heightStep;

      gsap.set(card, {
        x: x,
        y: y,
        z: z,
        rotateY: (angle * 180) / Math.PI,
        transformOrigin: "center center",
      });
    });

    // Create the scroll-triggered rotation animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalCards * 800}`,
        scrub: 1.5, // Smoother scrub
        pin: true,
        anticipatePin: 1,
      },
    });

    // Rotate the helix and move it vertically with a slight curve
    tl.to(helixRef.current, {
      rotateY: -360 * (totalCards / 4),
      y: -(totalCards - 1) * heightStep - 100,
      ease: "power2.inOut",
    });

    // Dynamic depth effects for cards
    cards.forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${i * 800} top`,
          end: `top+=${(i + 1) * 800} top`,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const blur = Math.abs(0.5 - progress) * 12; // Reduced blur
            const scale = 1 + (1 - Math.abs(0.5 - progress) * 2) * 0.35; // Slight scale boost

            gsap.set(card, {
              filter: `blur(${blur}px)`,
              opacity: Math.max(0, 1 - Math.abs(0.5 - progress) * 4), // Smoother, clearer falloff
              scale: Math.max(0.5, scale),
              zIndex: Math.round(progress * 100),
            });
          },
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050508] overflow-hidden"
    >
      {/* Visual Masks for smooth fade */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#050508] to-transparent z-[20] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050508] to-transparent z-[20] pointer-events-none" />

      {/* Background 3D Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-indigo-500/30 rounded-full"
            style={{
              width: `${(i + 1) * 800}px`,
              height: `${(i + 1) * 800}px`,
              transform: `rotateX(75deg) rotateY(${i * 45}deg)`,
            }}
          />
        ))}
      </div>

      <div
        className="relative flex items-center justify-center w-full h-screen"
        style={{ perspective: "2500px" }}
      >
        <div
          ref={helixRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="helix-card absolute w-[280px] sm:w-[340px] h-[380px] sm:h-[460px] cursor-pointer"
              onClick={() => setSelectedProject(project)}
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              {/* Premium Glassmorphism Card */}
              <div className="relative w-full h-full p-1 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 group overflow-hidden shadow-2xl transition-all duration-500 hover:border-orange-500/50">

                {/* Image Layer (Parallax Z) */}
                <div
                  className="relative w-full h-3/5 rounded-[32px] overflow-hidden"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-6 right-6 bg-orange-600/90 text-white text-[10px] font-black px-4 py-2 rounded-full backdrop-blur-md tracking-widest">
                    {project.category}
                  </span>
                </div>

                {/* Content Layer (Parallax Z) */}
                <div
                  className="p-6 mt-4"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-stone-400 text-[11px] leading-relaxed mb-6 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex items-center gap-3 text-orange-500 font-black text-[10px] uppercase tracking-widest">
                    View Details <ArrowRight size={14} />
                  </div>
                </div>

                {/* Mouse-Responsive Shine (Simulated) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#050508]/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative w-full max-w-6xl bg-[#101012] rounded-[48px] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-50 p-3 bg-black/50 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-orange-500 font-black tracking-[0.3em] text-xs uppercase mb-6 block">
                  {selectedProject.category}
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="w-16 h-1 bg-orange-600 mb-8 rounded-full" />
                <p className="text-stone-400 text-lg leading-relaxed mb-10">
                  {selectedProject.desc}
                  <br /><br />
                  Our engineering team delivered this state-of-the-art solution using AI-driven architecture and cloud-native technologies, ensuring maximum scalability and user engagement.
                </p>
                <button className="bg-orange-600 text-white font-black px-10 py-5 rounded-full hover:bg-orange-700 transition-all shadow-[0_10px_30px_rgba(234,88,12,0.3)] w-fit uppercase tracking-widest text-xs">
                  Start Your Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
