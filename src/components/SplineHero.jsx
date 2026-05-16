import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_SPLINE_SCENE } from '../constants/splineScenes';
import { SplineScene } from '@/components/ui/splite';
import './SplineHero.css';

const SplineHero = () => {
  return (
    <section className="spline-hero">
      <div className="spline-hero-bg-glow" />
      
      <div className="spline-hero-container">
        <motion.div 
          className="spline-hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="spline-hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles size={14} className="mr-2" />
            <span>AI-Driven Innovation</span>
          </motion.div>

          <motion.h1 
            className="spline-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Building the <br />
            Digital Future
          </motion.h1>

          <motion.p 
            className="spline-hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We combine cutting-edge AI with world-class engineering to create 
            scalable solutions that drive growth and redefine industries.
          </motion.p>

          <motion.div 
            className="spline-hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a href="/contact" className="btn-primary">
              Get Started <ArrowRight size={18} />
            </a>
            <a href="/portfolio" className="btn-secondary">
              View Projects
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="spline-hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <SplineScene scene={HERO_SPLINE_SCENE} className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default SplineHero;
