'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FloatingPaths } from '../components/ui/FloatingPaths';
import './Gallery.css';

const Gallery = forwardRef((props, ref) => {
  return (
    <ReactLenis root>
      <main className='bg-black gallery-main' ref={ref}>
        <div className='wrapper'>
          <section className='text-white h-screen w-full bg-[#0a0a0b] grid place-content-center sticky top-0 z-0 pt-20 overflow-hidden'>
            {/* Ambient Animated Cyber Paths */}
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />

            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(230,80,20,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(230,80,20,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>

            <div className="relative z-10 text-center px-4 flex flex-col items-center">
              {/* Premium Badge */}
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] uppercase font-bold text-[#e65014] bg-[#e65014]/10 px-5 py-2.5 rounded-full border border-[#e65014]/25 mb-8 inline-block backdrop-blur-md shadow-[0_0_15px_rgba(230,80,20,0.1)]"
              >
                Creative Masterpieces
              </motion.span>

              {/* Unique Glow Title */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className='2xl:text-8xl lg:text-7xl md:text-6xl text-4xl font-black text-center tracking-tight leading-[110%] max-w-5xl mx-auto drop-shadow-[0_10px_30px_rgba(230,80,20,0.2)]'
              >
                True Twist <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e65014] via-[#ff6b00] to-[#ff9d00] animate-pulse">Visuals</span>
              </motion.h1>

              {/* Creative Slogan */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-2xl md:text-3xl text-stone-300 font-extralight mt-6 block tracking-wide max-w-3xl leading-relaxed"
              >
                Where <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400">Imagination</span> Meets <span className="font-bold text-[#e65014] underline decoration-[#e65014]/30 decoration-wavy underline-offset-8">Reality</span>
              </motion.span>

              {/* Premium Interactive Mouse Scroll Wheel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-14 flex flex-col items-center justify-center gap-3 cursor-pointer"
              >
                <span className="text-xs tracking-[0.3em] uppercase font-bold text-stone-500">Scroll to Explore</span>
                <div className="w-6 h-10 rounded-full border-2 border-stone-700 flex justify-center p-1.5 relative overflow-hidden bg-black/40 backdrop-blur-sm">
                  <motion.div
                    animate={{
                      y: [0, 12, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-[#e65014]"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        <section className='text-white w-full bg-[#0a0a0b] relative z-10 py-10'>
          <div className='container mx-auto px-2 md:px-4'>
            <div className='grid grid-cols-12 gap-2 md:gap-4'>
              {/* Left Column */}
              <div className='grid gap-2 md:gap-4 col-span-4'>
                {[
                  'https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1719411182379-ffd97c1f7ebf?w=500&auto=format&fit=crop'
                ].map((src, i) => (
                  <figure key={i} className='w-full'>
                    <img
                      src={src}
                      alt=''
                      className='transition-all duration-300 w-full h-28 sm:h-60 md:h-96 align-bottom object-cover rounded-md border border-white/5 hover:border-[#e65014]/50 hover:scale-[1.02] shadow-lg'
                    />
                  </figure>
                ))}
              </div>

              {/* Middle Column (Always Sticky, Dynamic height) */}
              <div className='sticky top-20 md:top-24 h-[60vh] md:h-screen w-full col-span-4 gap-2 md:gap-4 grid grid-rows-3'>
                {[
                  'https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1476180814856-a36609db0493?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=500&auto=format&fit=crop'
                ].map((src, i) => (
                  <figure key={i} className='w-full h-full'>
                    <img
                      src={src}
                      alt=''
                      className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md border border-white/5 hover:border-[#e65014]/50 hover:scale-[1.02] shadow-lg'
                    />
                  </figure>
                ))}
              </div>

              {/* Right Column */}
              <div className='grid gap-2 md:gap-4 col-span-4'>
                {[
                  'https://images.unsplash.com/photo-1719547907790-f661a88302c2?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1719554873571-0fd6bf322bb1?w=500&auto=format&fit=crop'
                ].map((src, i) => (
                  <figure key={i} className='w-full'>
                    <img
                      src={src}
                      alt=''
                      className='transition-all duration-300 w-full h-28 sm:h-60 md:h-96 align-bottom object-cover rounded-md border border-white/5 hover:border-[#e65014]/50 hover:scale-[1.02] shadow-lg'
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
