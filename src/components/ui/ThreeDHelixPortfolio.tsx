"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles } from "lucide-react";

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

export const ThreeDHelixPortfolio = ({ projects: initialProjects }: ThreeDHelixPortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Web", "Mobile", "Software", "AI", "UI/UX"];

  // Filter projects dynamically
  const filteredProjects = activeFilter === "All"
    ? initialProjects
    : initialProjects.filter(p => p.category === activeFilter);

  return (
    <div className="relative w-full bg-[#050508] py-20 px-4 sm:px-8 md:px-16 overflow-hidden">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Title & Section Header */}
      <div className="text-center mb-12 sm:mb-16 relative z-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles size={12} /> PORTFOLIO
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
          Our Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Showcase</span>
        </h2>
        <p className="text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
          Explore our collection of high-performance websites, AI-powered systems, and dynamic mobile applications engineered for global brands.
        </p>
      </div>

      {/* Beautiful Category Filter Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 max-w-4xl mx-auto relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 ${
              activeFilter === cat
                ? "text-white bg-orange-600 shadow-[0_4px_20px_rgba(234,88,12,0.4)]"
                : "text-stone-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout - 3 columns on desktop/laptop, 2 on tablet, 1 on mobile! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ 
                opacity: 0, 
                scale: 0.4, 
                y: 150, 
                rotate: -180 
              }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                rotate: 0 
              }}
              viewport={{ once: true, amount: 0.1 }}
              exit={{ 
                opacity: 0, 
                scale: 0.4, 
                y: -150, 
                rotate: 180 
              }}
              transition={{ 
                type: "spring",
                stiffness: 70,
                damping: 15,
                delay: (idx % 3) * 0.08 
              }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group relative rounded-[32px] p-1 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-orange-500/50 hover:shadow-[0_10px_40px_rgba(234,88,12,0.15)] flex flex-col h-[400px] sm:h-[450px]"
            >
              {/* Image Layer */}
              <div className="relative w-full h-3/5 rounded-[28px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 bg-orange-600/90 text-white text-[9px] sm:text-[10px] font-black px-3 py-1.5 rounded-full backdrop-blur-md tracking-widest uppercase">
                  {project.category}
                </span>
              </div>

              {/* Content Layer */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:text-orange-500 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-orange-500 font-black text-[10px] sm:text-xs uppercase tracking-widest mt-4">
                  View Details <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* Hover Radial Ambient Light */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cinematic Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050508]/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#101012] rounded-[30px] sm:rounded-[40px] overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="w-full md:w-1/2 h-[220px] md:h-auto overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
                <span className="text-orange-500 font-black tracking-[0.3em] text-[9px] sm:text-[10px] uppercase mb-3 block">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="w-12 h-1 bg-orange-600 mb-4 sm:mb-5 rounded-full" />
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                  {selectedProject.desc}
                  <br /><br />
                  Our engineering team delivered this state-of-the-art solution using AI-driven architecture and cloud-native technologies, ensuring maximum scalability and user engagement.
                </p>
                <button className="bg-orange-600 text-white font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-orange-700 transition-all shadow-[0_10px_30px_rgba(234,88,12,0.3)] w-fit uppercase tracking-widest text-[9px] sm:text-[10px]">
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
