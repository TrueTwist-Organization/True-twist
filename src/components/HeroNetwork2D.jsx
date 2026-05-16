import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Code, 
  Monitor, 
  CloudCog, 
  BrainCircuit, 
  LayoutDashboard, 
  SquareMousePointer,
  Sparkles,
  Zap
} from 'lucide-react';
import './HeroNetwork2D.css';

const nodes = [
  { key: 'software', Icon: Code, label: 'Software Dev', angle: 210, color: '#ea580c' },
  { key: 'web', Icon: Monitor, label: 'Web Systems', angle: 270, color: '#f97316' },
  { key: 'uiux', Icon: SquareMousePointer, label: 'UI/UX Design', angle: 330, color: '#c2410c' },
  { key: 'mobile', Icon: Smartphone, label: 'Mobile Apps', angle: 0, color: '#fb923c' },
  { key: 'cloud', Icon: CloudCog, label: 'Cloud Ops', angle: 45, color: '#f97316' },
  { key: 'ai', Icon: BrainCircuit, label: 'AI Core', angle: 90, color: '#ea580c' },
  { key: 'cms', Icon: LayoutDashboard, label: 'CMS Hub', angle: 135, color: '#fdba74' },
];

const HeroNetwork2D = () => {
  return (
    <div className="hero-2d-network-wrapper">
      <div className="hero-2d-canvas">
        {/* Ambient background effects */}
        <div className="hero-2d-glow-center" />
        <div className="hero-2d-grid-overlay" />
        
        {/* Connection Lines SVG */}
        <svg className="hero-2d-svg-layer" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Circular Orbits */}
          <motion.circle 
            cx="50" cy="50" r="38" 
            className="hero-2d-orbit-circle"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="50" cy="50" r="25" 
            className="hero-2d-orbit-circle hero-2d-orbit-circle--inner"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Radial Connections */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x2 = 50 + 38 * Math.cos(rad);
            const y2 = 50 + 38 * Math.sin(rad);
            return (
              <motion.line
                key={`line-${node.key}`}
                x1="50" y1="50"
                x2={x2} y2={y2}
                className="hero-2d-connection-line"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Central Hub */}
        <motion.div 
          className="hero-2d-main-hub"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(139, 92, 246, 0.3)",
              "0 0 40px rgba(139, 92, 246, 0.6)",
              "0 0 20px rgba(139, 92, 246, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="hero-2d-hub-glass">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="hero-2d-hub-icon-wrap"
            >
              <Zap size={32} fill="currentColor" />
            </motion.div>
          </div>
          
          <div className="hero-2d-hub-rings">
            <div className="hero-2d-hub-ring hero-2d-hub-ring--1" />
            <div className="hero-2d-hub-ring hero-2d-hub-ring--2" />
          </div>
        </motion.div>

        {/* Floating Nodes */}
        <div className="hero-2d-nodes-container">
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);
            
            return (
              <motion.div
                key={node.key}
                className="hero-2d-node-anchor"
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.1 }}
              >
                <motion.div 
                  className="hero-2d-node-card"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  <div className="hero-2d-node-icon" style={{ backgroundColor: node.color }}>
                    <node.Icon size={18} color="white" />
                  </div>
                  <div className="hero-2d-node-info">
                    <span className="hero-2d-node-name">{node.label}</span>
                    <div className="hero-2d-node-status">
                      <span className="hero-2d-status-dot" />
                      Active
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div className="hero-2d-decor">
          <Sparkles className="hero-2d-sparkle hero-2d-sparkle--1" size={16} />
          <Sparkles className="hero-2d-sparkle hero-2d-sparkle--2" size={20} />
        </div>
      </div>
    </div>
  );
};

export default HeroNetwork2D;
