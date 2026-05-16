import React from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, motionValue } from 'framer-motion';
import { 
  Cpu, 
  Code2, 
  Globe2, 
  ShieldCheck, 
  Cloud, 
  Zap, 
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import './HeroPremium2D.css';

const services = [
  { id: 'ai', title: 'AI Automation', icon: <Cpu />, color: '#ea580c', top: '15%', left: '20%' },
  { id: 'web', title: 'Web Systems', icon: <Code2 />, color: '#f97316', top: '25%', left: '70%' },
  { id: 'cloud', title: 'Cloud Infrastructure', icon: <Cloud />, color: '#ea580c', top: '65%', left: '15%' },
  { id: 'security', title: 'Cyber Security', icon: <ShieldCheck />, color: '#9a3412', top: '75%', left: '65%' },
  { id: 'data', title: 'Data Analytics', icon: <Database />, color: '#fb923c', top: '45%', left: '85%' },
  { id: 'devops', title: 'DevOps Flow', icon: <Layers />, color: '#fdba74', top: '50%', left: '5%' },
];

const HeroPremium2D = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left - width / 2) / 10);
    mouseY.set((clientY - top - height / 2) / 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="hero-premium-2d" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Abstract Shapes */}
      <div className="hero-bg-shapes">
        <motion.div 
          className="shape shape-1"
          style={{ x: smoothX, y: smoothY }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="shape shape-2"
          style={{ x: useTransform(smoothX, (v) => v * -1.2), y: useTransform(smoothY, (v) => v * -1.2) }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Connection SVG Layer */}
      <svg className="hero-connections-svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="energy-flow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
        </defs>
        
        {services.map((s, i) => (
          <motion.path
            key={`line-${s.id}`}
            d={`M 50 50 Q ${parseInt(s.left) + 5} ${parseInt(s.top) - 5} ${s.left} ${s.top}`}
            stroke="url(#energy-flow)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
      </svg>

      {/* Central Core */}
      <motion.div 
        className="hero-central-core"
        style={{ x: useTransform(smoothX, (v) => v * 0.5), y: useTransform(smoothY, (v) => v * 0.5) }}
      >
        <motion.div 
          className="core-outer"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="core-dot dot-1" />
          <div className="core-dot dot-2" />
          <div className="core-dot dot-3" />
        </motion.div>
        
        <motion.div 
          className="core-inner"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="core-glow" />
          <Zap size={48} className="core-icon" />
        </motion.div>
        
        <div className="core-pulse-rings">
          <div className="pulse-ring ring-1" />
          <div className="pulse-ring ring-2" />
          <div className="pulse-ring ring-3" />
        </div>
      </motion.div>

      {/* Service Cards */}
      <div className="hero-cards-layer">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            className="hero-service-node"
            style={{ 
              top: service.top, 
              left: service.left,
              x: useTransform(smoothX, (v) => v * (1.2 + i * 0.1)), 
              y: useTransform(smoothY, (v) => v * (1.2 + i * 0.1)) 
            }}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              delay: 0.5 + i * 0.15 
            }}
            whileHover={{ scale: 1.05, zIndex: 50 }}
          >
            <div className="node-content">
              <div className="node-icon-box" style={{ backgroundColor: service.color }}>
                {service.icon}
              </div>
              <div className="node-text">
                <span className="node-title">{service.title}</span>
                <div className="node-status">
                  <motion.span 
                    className="status-indicator"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Optimized
                </div>
              </div>
            </div>
            
            {/* Hover details */}
            <div className="node-hover-effect" />
          </motion.div>
        ))}
      </div>

      {/* Floating Data Bits */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bit-${i}`}
          className="data-bit"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{ 
            x: [null, (Math.random() - 0.5) * 50 + "%"],
            y: [null, (Math.random() - 0.5) * 50 + "%"],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles size={12} color="var(--accent-primary)" />
        </motion.div>
      ))}
    </div>
  );
};

export default HeroPremium2D;
