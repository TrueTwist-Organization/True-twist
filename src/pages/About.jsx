import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Award } from 'lucide-react';
import './About.css';

// Helper for character-by-character animation
const CharStagger = ({ text, delay = 0 }) => {
  const characters = text.split("");
  return (
    <span className="flex flex-wrap">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + (i * 0.04),
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Helper for word-by-word reveal
const WordReveal = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className="flex flex-wrap">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + (i * 0.05),
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const About = () => {
  useEffect(() => {
    // Add Playfair Display font dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    }
  }, [titleControls, titleInView]);

  const headingVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__glow" />
        <div className="container relative z-10" ref={titleRef}>
          {/* WHO WE ARE Label */}
          <motion.span 
            className="about-label"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            WHO WE ARE
          </motion.span>

          {/* Main Heading */}
          <div className="overflow-hidden mb-2">
            <motion.h1 
              className="about-heading"
              variants={headingVariants}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
            >
              About <span className="orange">
                TRUE TWIST
                <motion.div 
                  className="underline"
                  initial={{ scaleX: 0 }}
                  animate={titleInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
                />
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p 
            className="about-subtitle"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Empowering businesses through innovative software and web development.
          </motion.p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            {/* Card 1: Mission */}
            <motion.div 
              className="mv-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="icon-wrap">
                <Target size={26} />
              </div>
              <h2>
                <CharStagger text="Our Mission" delay={1.2} />
              </h2>
              <motion.div 
                className="divider-bar"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.3 }}
              />
              <p>
                <WordReveal 
                  text="To deliver cutting-edge technology solutions that transform complex challenges into intuitive, scalable digital products, driving tangible value for our clients globally." 
                  delay={1.5} 
                />
              </p>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div 
              className="mv-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="icon-wrap">
                <Award size={26} />
              </div>
              <h2>
                <CharStagger text="Our Vision" delay={1.4} />
              </h2>
              <motion.div 
                className="divider-bar"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.5 }}
              />
              <p>
                <WordReveal 
                  text="To be the leading tech partner for businesses navigating the digital era, recognized for our innovation, AI integration, and commitment to engineering excellence." 
                  delay={1.7} 
                />
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
