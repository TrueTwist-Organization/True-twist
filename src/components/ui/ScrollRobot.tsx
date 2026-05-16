import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue } from 'framer-motion';
import robotMascot from '../../assets/scroll_robot.png';

export const ScrollRobot = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Mouse tracking for "Look Around" effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 30, damping: 25 });

  const y = useTransform(smoothProgress, [0, 1], ['0%', '85%']);
  
  const x = useTransform(
    smoothProgress,
    [0, 0.2, 0.35, 0.55, 0.65, 0.85, 0.95],
    ['0vw', '0vw', '-80vw', '-80vw', '0vw', '0vw', '-80vw']
  );
  
  const leanX = useTransform(smoothVelocity, [-2000, 0, 2000], [25, 0, -25]);
  const pullY = useTransform(smoothVelocity, [-2000, 0, 2000], [-30, 0, 30]);

  const combinedRotateX = useTransform(
    [leanX, smoothMouseY],
    ([lean, mouse]: any) => lean - mouse
  );

  // Puppet Independent Physics (Reacts to Scroll Velocity + Idle Animation)
  const headNod = useTransform(smoothVelocity, [-2000, 0, 2000], [15, 0, -15]);
  const rightArmWave = useTransform(smoothVelocity, [-2000, 0, 2000], [-35, 0, 35]);
  const leftArmSwing = useTransform(smoothVelocity, [-2000, 0, 2000], [25, 0, -25]);
  const legsSwing = useTransform(smoothVelocity, [-2000, 0, 2000], [-20, 0, 20]);
  const torsoSquish = useTransform(smoothVelocity, [-2000, 0, 2000], [0.95, 1, 0.95]);

  return (
    <motion.div
      className="fixed right-4 top-24 z-[100] pointer-events-auto hidden md:block"
      style={{ x, y, perspective: '1200px', width: '320px', height: '400px' }}
    >
      <motion.div
        style={{
          rotateX: combinedRotateX,
          rotateY: smoothMouseX,
          y: pullY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%'
        }}
        className="relative flex flex-col items-center bg-transparent border-none shadow-none"
      >
        <div className="relative bg-transparent group">
          {/* SINGLE ROBOT IMAGE (Prevents double limbs and glitching) */}
          <motion.img
            src={robotMascot}
            alt="3D Scrolling Robot Model"
            className="w-40 h-auto pointer-events-none drop-shadow-2xl"
            style={{
               mixBlendMode: 'screen', 
               filter: 'contrast(1.15) brightness(1.1) drop-shadow(0px 10px 20px rgba(234, 88, 12, 0.4))',
               rotateZ: useTransform(smoothVelocity, [-2000, 0, 2000], [-10, 0, 10]), // Banks like an airplane on scroll
               scale: useTransform(smoothVelocity, [-2000, 0, 2000], [0.95, 1, 0.95]), // Squishes on speed
            }}
            // Advanced whole-body breathing animation
            animate={{
               y: [0, -15, 0],
               scaleY: [1, 1.03, 1], // Chest/Body expands slightly
               scaleX: [1, 0.98, 1], // Body contracts slightly
            }}
            transition={{
               repeat: Infinity,
               duration: 3.2, 
               ease: "easeInOut"
            }}
          />
          
          {/* Enhanced Smooth Propulsion Burner */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-24 bg-orange-500/60 blur-2xl rounded-full -z-10"
            style={{
              scaleY: useTransform(smoothVelocity, [-2000, 0, 2000], [3, 1, 3]),
              opacity: useTransform(smoothVelocity, [-2000, 0, 2000], [0.9, 0.3, 0.9]),
            }}
            animate={{ opacity: [0.6, 0.9, 0.6], scaleX: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        {/* Dynamic Glow Layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/10 blur-[60px] rounded-full -z-20 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};
