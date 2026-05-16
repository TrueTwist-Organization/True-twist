import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const HeroBackgroundCode = () => {
  const snippets = useMemo(() => [
    'const ai = new Brain();',
    'import { neural } from "tt";',
    'await process.optimize();',
    'if (growth) deploy();',
    'export default Innovation;',
    '01101010 01101111',
    'function future() { }',
    'state = { success: true };',
    'npm install tomorrow',
    'git push origin master',
    'docker-compose up',
    'kubectl get pods'
  ], []);

  return (
    <div className="hero-bg-code-container" style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.04,
      zIndex: 0,
      userSelect: 'none'
    }}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: -100, 
            opacity: 0 
          }}
          animate={{ 
            y: '110vh',
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 15 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 20
          }}
          style={{
            position: 'absolute',
            fontFamily: 'monospace',
            fontSize: 10 + Math.random() * 8 + 'px',
            color: 'var(--accent-primary)',
            whiteSpace: 'nowrap',
            fontWeight: 700
          }}
        >
          {snippets[i % snippets.length]}
        </motion.div>
      ))}
    </div>
  );
};

export default HeroBackgroundCode;
