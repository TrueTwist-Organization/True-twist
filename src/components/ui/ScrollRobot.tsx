import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useMotionValueEvent } from 'framer-motion';
import robotMascot from '../../assets/robot/robot_scroll.png';

export const ScrollRobot = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const [activeText, setActiveText] = useState("TrueTwist builds smart, scalable & secure digital products using AI, Cloud & next-gen tech to drive your business growth! 🚀");
  const [isLeft, setIsLeft] = useState(false);

  useEffect(() => {
    const sections = [
      { id: 'hero', selector: '.hero', text: "TrueTwist builds smart, scalable & secure digital products using AI, Cloud & next-gen tech to drive your business growth! 🚀" },
      { id: 'services', selector: '.services-summary', text: "Discover our Specialized Services! We deliver end-to-end 3D Web experiences, Intelligent Automation, and Cinematic AI films. 🛠️" },
      { id: 'team', selector: '.home-team', text: "Meet the Innovators! Our expert crew of engineers, designers, and strategists shipping premium products with speed and clarity. 👥" },
      { id: 'testimonials', selector: '.testimonials-section', text: "Listen to our clients! Read authentic reviews about our production momentum, technical execution, and robust engineering. 💬" },
      { id: 'insights', selector: '.latest-insights', text: "Dive into our Latest Insights! Read our technical deep-dives on next-gen cloud systems, analytics, and intelligent operations. 📚" },
      { id: 'contact', selector: '.home-market-cta', text: "Shape tomorrow's markets with us! Let's build intelligent automation and elastic cloud foundations for your enterprise. 💼" }
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sec = sections.find(s => entry.target.matches(s.selector));
          if (sec) {
            setActiveText(sec.text);
          }
        }
      });
    }, { rootMargin: '-30% 0px -30% 0px', threshold: 0.1 });

    sections.forEach(sec => {
      const el = document.querySelector(sec.selector);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const [isGesturing, setIsGesturing] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const overlayActive = useRef(true);

  useEffect(() => {
    if (isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    } else if (!isMuted && activeText && !overlayActive.current) {
      speakText(activeText);
    }
  }, [isMuted]);

  // Set up robust listener for asynchronous neural voice loading (crucial for Chrome/Edge/Safari)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const handleVoicesChanged = () => setVoicesLoaded(true);
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoicesLoaded(true);
      }

      // Sensitive human interaction backup (runs only if browser autoplay MEI is blocked initially)
      const backupTrigger = () => {
        if (!window.speechSynthesis.speaking && !isMuted && !overlayActive.current) {
          speakText(activeText);
        }
        window.removeEventListener('click', backupTrigger);
        window.removeEventListener('scroll', backupTrigger);
        window.removeEventListener('mousemove', backupTrigger);
        window.removeEventListener('touchstart', backupTrigger);
      };

      window.addEventListener('click', backupTrigger, { passive: true });
      window.addEventListener('scroll', backupTrigger, { passive: true });
      window.addEventListener('mousemove', backupTrigger, { passive: true });
      window.addEventListener('touchstart', backupTrigger, { passive: true });

      return () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.onvoiceschanged = null;
        }
        window.removeEventListener('click', backupTrigger);
        window.removeEventListener('scroll', backupTrigger);
        window.removeEventListener('mousemove', backupTrigger);
        window.removeEventListener('touchstart', backupTrigger);
      };
    }
  }, [activeText, voicesLoaded, isMuted]);

  const speakText = (text: string) => {
    if (isMuted) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsGesturing(false);

      // Clean emojis for clean synthetic neural voice rendering
      const cleanText = text.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "");

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();

      // Priority list of ultra-premium English MALE AI / Neural voices
      const priorityMaleVoices = [
        "Microsoft Guy Online", "GuyNeural", "Google UK English Male", "Google US English Male", "Daniel", "Alex", "David", "Thomas", "Ryan", "Microsoft David"
      ];

      let selectedVoice = null;
      // 1. Search by premium priority male name
      for (const name of priorityMaleVoices) {
        selectedVoice = voices.find(v => v.name.includes(name) && v.lang.startsWith('en'));
        if (selectedVoice) break;
      }

      // 2. Search for any English voice containing "Male" or "male"
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.name.toLowerCase().includes("male") && v.lang.startsWith('en'));
      }

      // 3. Fallback to English voices with male names
      if (!selectedVoice) {
        const maleKeywords = ["daniel", "alex", "david", "fred", "guy", "thomas", "ryan"];
        selectedVoice = voices.find(v =>
          v.lang.startsWith('en') &&
          maleKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
        );
      }

      // 4. Default fallback to first English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en'));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Deep, clear, crystal-clear male AI narration pitch and cadence
      utterance.pitch = 0.95; // JARVIS-like deep premium male AI voice pitch!
      utterance.rate = 0.96;  // Professional, natural narration speed!
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsGesturing(true);
      };
      utterance.onend = () => {
        setIsGesturing(false);
      };
      utterance.onerror = () => {
        setIsGesturing(false);
      };

      // Safe asynchronous queue clearing buffer (Resolves chromium speech cancellation bugs!)
      setTimeout(() => {
        if ('speechSynthesis' in window && !isMuted) {
          window.speechSynthesis.speak(utterance);
        }
      }, 120);
    }
  };

  const handleBubbleClick = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      speakText(activeText);
    }
  };

  useEffect(() => {
    // Unconditional automatic narration play on mount / section snap!
    if (!overlayActive.current) {
      speakText(activeText);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsGesturing(false);
      }
    };
  }, [activeText, voicesLoaded]);

  const y = useTransform(smoothProgress, [0, 1], ['0%', '85%']);

  // Precise checkpoints matching early-acting section snaps and transitions
  const progressCheckpoints = [
    0, 0.05, 0.09, 0.13,
    0.21, 0.25, 0.29,
    0.37, 0.41, 0.45,
    0.53, 0.57, 0.61,
    0.70, 0.74, 0.78,
    0.88, 0.94, 1.0
  ];

  const x = useTransform(
    smoothProgress,
    progressCheckpoints,
    isMobile
      ? ['0vw', '0vw', '-29vw', '-58vw', '-58vw', '-29vw', '0vw', '0vw', '-29vw', '-58vw', '-58vw', '-29vw', '0vw', '0vw', '-29vw', '-58vw', '-58vw', '-58vw', '-58vw']
      : ['0vw', '0vw', '-38vw', '-76vw', '-76vw', '-38vw', '0vw', '0vw', '-38vw', '-76vw', '-76vw', '-38vw', '0vw', '0vw', '-38vw', '-76vw', '-76vw', '-76vw', '-76vw']
  );

  useMotionValueEvent(x, "change", (latest) => {
    const val = typeof latest === 'string' ? parseFloat(latest) : Number(latest);
    setIsLeft(val < -10);
  });

  const opacity = useTransform(
    smoothProgress,
    progressCheckpoints,
    isMobile
      ? [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0]
      : [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0]
  );

  const scale = useTransform(
    smoothProgress,
    progressCheckpoints,
    isMobile
      ? [1, 1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1, 1, 0, 0]
      : [1, 1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1, 1, 0, 0]
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
    <>
      <motion.div
        className="fixed right-4 top-[135px] md:top-36 z-[100] pointer-events-auto overflow-visible"
        style={{
          x,
          y,
          opacity,
          scale,
          perspective: '1200px',
          width: isMobile ? '280px' : '320px',
          height: isMobile ? '200px' : '400px'
        }}
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
          className="relative flex flex-col items-center bg-transparent border-none shadow-none overflow-visible"
        >
          <div className={`absolute ${isMobile ? 'right-[30px] w-20 h-[108px] top-[46px]' : 'left-1/2 -translate-x-1/2 w-40 h-[216px] top-[92px]'} bg-transparent group flex items-center justify-center overflow-visible`}>
            {/* SINGLE ROBOT IMAGE (Prevents double limbs and glitching) */}
            <motion.img
              src={robotMascot}
              alt="3D Scrolling Robot Model"
              className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
              style={{
                mixBlendMode: 'screen',
                filter: 'hue-rotate(205deg) saturate(2.2) contrast(1.15) brightness(1.1) drop-shadow(0px 10px 20px rgba(234, 88, 12, 0.55))',
                rotateZ: useTransform(smoothVelocity, [-3000, 0, 3000], [-18, 0, 18]), // Banks heavily in scroll direction!
                scaleY: useTransform(smoothVelocity, [-3000, 0, 3000], [0.85, 1, 0.85]), // Mechanically squashes down!
                scaleX: useTransform(smoothVelocity, [-3000, 0, 3000], [1.12, 1, 1.12]), // Bulges outwards!
              }}
              // Speaking gesture wobble & float when text updates, otherwise rich idle float
              animate={isGesturing ? {
                y: [0, -10, 3, -6, 1, -3, 0],
                rotateZ: isLeft ? [0, -6, -1, -4, 0, -2, 0] : [0, 6, 1, 4, 0, 2, 0],
                rotateY: isLeft ? [0, -10, -3, -8, 0, -4, 0] : [0, 10, 3, 8, 0, 4, 0],
                scale: [1, 1.04, 0.98, 1.02, 0.99, 1.01, 1]
              } : {
                y: [0, -12, 0],
                rotateZ: [-1.5, 1.5, -1.5],
                rotateY: [-4, 4, -4]
              }}
              transition={isGesturing ? {
                duration: 2.5,
                ease: "easeInOut"
              } : {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />


            {/* Left Holographic Hand Wave */}
            <motion.div
              className={`absolute ${isMobile ? 'left-[5%] w-6 h-6' : 'left-[10%] w-10 h-10'} top-[56%] -translate-y-1/2 z-10 pointer-events-none`}
              animate={isGesturing ? {
                scale: [0.8, 1.3, 0.8],
                opacity: [0.3, 0.95, 0.3],
                rotate: [0, 180, 360]
              } : {
                scale: [0.9, 1, 0.9],
                opacity: [0.1, 0.3, 0.1],
                rotate: 0
              }}
              transition={isGesturing ? {
                repeat: Infinity,
                duration: 1.5,
                ease: "linear"
              } : {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full rounded-full border border-orange-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(249,115,22,0.3)] bg-orange-500/5">
                <div className="w-[50%] h-[50%] rounded-full border border-orange-500/60 animate-ping" />
              </div>
            </motion.div>

            {/* Right Holographic Hand Wave */}
            <motion.div
              className={`absolute ${isMobile ? 'right-[5%] w-6 h-6' : 'right-[10%] w-10 h-10'} top-[56%] -translate-y-1/2 z-10 pointer-events-none`}
              animate={isGesturing ? {
                scale: [0.8, 1.3, 0.8],
                opacity: [0.3, 0.95, 0.3],
                rotate: [360, 180, 0]
              } : {
                scale: [0.9, 1, 0.9],
                opacity: [0.1, 0.3, 0.1],
                rotate: 0
              }}
              transition={isGesturing ? {
                repeat: Infinity,
                duration: 1.5,
                ease: "linear"
              } : {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full rounded-full border border-orange-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(249,115,22,0.3)] bg-orange-500/5">
                <div className="w-[50%] h-[50%] rounded-full border border-orange-500/60 animate-ping" />
              </div>
            </motion.div>

            {/* Enhanced Smooth Propulsion Burner */}
            <motion.div
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 ${isMobile ? 'w-6 h-12' : 'w-12 h-24'} bg-orange-500/60 blur-2xl rounded-full -z-10`}
              style={{
                scaleY: useTransform(smoothVelocity, [-2000, 0, 2000], [3, 1, 3]),
                opacity: useTransform(smoothVelocity, [-2000, 0, 2000], [0.9, 0.3, 0.9]),
              }}
              animate={{ opacity: [0.6, 0.9, 0.6], scaleX: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            {/* Speech Bubble Container for MOBILE ONLY (Inside mascot container to move dynamically on scroll) */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                key={activeText} // Animate transition on text changes!
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className={`absolute z-50 flex flex-col items-center pointer-events-auto bottom-[108%] w-[160px] ${isLeft ? 'left-[-5px]' : 'right-[-5px]'}`}
              >
                {/* Glassmorphic Bubble (Clickable for instant manual speech activation) */}
                <div
                  onClick={handleBubbleClick}
                  className="bg-black/40 backdrop-blur-md border border-orange-500/30 rounded-xl p-2 w-[160px] shadow-2xl relative cursor-pointer hover:border-orange-500/60 active:scale-95 transition-all duration-200 group select-none text-center"
                >
                  <p className="text-[8.5px] leading-snug font-medium text-stone-200">
                    {activeText}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between border-t border-stone-850 pt-1 text-[7.5px] text-stone-400">
                    <span
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering replay on parent click!
                        setIsMuted(!isMuted);
                      }}
                      className="hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {isMuted ? '🔇' : '🔊'}
                    </span>
                    <span className="text-[7px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded-full font-mono uppercase tracking-wider select-none">
                      AI Voice
                    </span>
                  </div>
                  {/* Custom arrow tail pointing directly down to the robot's helmet */}
                  <div className={`absolute bottom-[-4px] w-2 h-2 rotate-45 bg-black border-r border-b border-orange-500/30 z-10 ${isLeft ? 'left-[45px]' : 'right-[45px]'}`} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Dynamic Glow Layer */}
          <div className={`absolute ${isMobile ? 'right-[30px] w-20 h-20 top-[60px] blur-[30px]' : 'left-1/2 -translate-x-1/2 w-48 h-48 top-[100px] blur-[60px]'} bg-orange-500/10 rounded-full -z-20 pointer-events-none`} />
        </motion.div>
      </motion.div>

      {/* Desktop/Laptop Speech Bubble (Uses separate motion.div with only style={{ x, y }} so it travels perfectly, but remains 100% static with NO scaling, NO 3D tilting, and NO opacity fades!) */}
      {!isMobile && (
        <motion.div
          className="fixed right-4 top-36 z-[101] w-[320px] h-[400px] pointer-events-none"
          style={{ x, y }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 w-[190px] bottom-[290px] pointer-events-auto">
            <div
              onClick={handleBubbleClick}
              className="bg-black/95 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-3 w-[190px] shadow-2xl relative cursor-pointer hover:border-orange-500/60 active:scale-95 transition-all duration-200 group select-none text-center"
            >
              <p className="text-[11.5px] leading-normal font-semibold text-stone-200">
                {activeText}
              </p>
              <div className="mt-2.5 flex items-center justify-between border-t border-stone-800/80 pt-1.5 text-[9.5px] text-stone-400 transition-colors">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-[12px]"
                >
                  {isMuted ? '🔇' : '🔊'}
                </span>
                <span className="text-[7px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded-full font-mono uppercase tracking-wider select-none">
                  AI Voice
                </span>
              </div>
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black border-r border-b border-orange-500/30 z-10" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Futuristic Immersive Entry Overlay (Restored exactly as requested!) */}
      {showOverlay && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl text-stone-200 p-4 md:p-6 select-none"
        >
          <div className="max-w-md w-[92%] md:w-full text-center space-y-4 md:space-y-8 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-orange-500/20 bg-stone-950/80 shadow-2xl shadow-orange-500/5 relative overflow-hidden group">
            {/* Glowing radial background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.08),transparent_70%)] pointer-events-none" />

            {/* Pulsing Robot Mascot image */}
            <motion.img
              src={robotMascot}
              alt="Mascot Preview"
              className="w-20 md:w-32 h-auto mx-auto drop-shadow-[0_0_30px_rgba(234,88,12,0.45)]"
              style={{
                mixBlendMode: 'screen',
                filter: 'hue-rotate(205deg) saturate(2.2) contrast(1.15) brightness(1.1)'
              }}
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />

            <div className="space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase font-mono leading-tight">
                TrueTwist <span className="text-orange-500">Immersive Experience</span>
              </h2>
              <p className="text-[10.5px] md:text-xs text-stone-400 leading-relaxed max-w-sm mx-auto">
                Welcome! Wake up your 3D Companion Robot Guide and activate the premium AI Male Voice narration.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                overlayActive.current = false;
                setShowOverlay(false);
                speakText(activeText);
              }}
              className="w-full py-3 md:py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl md:rounded-2xl text-[10.5px] md:text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-500/20 border border-orange-400/30 transition-all duration-300 relative overflow-hidden active:scale-95 cursor-pointer font-mono"
            >
              🤖 Wake Up Guide & Start
            </motion.button>
          </div>
        </motion.div>
      )}

    </>
  );
};
