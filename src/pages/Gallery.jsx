import React, { forwardRef } from 'react';
import { ReactLenis } from 'lenis/react';
import './Gallery.css';

const Gallery = forwardRef((props, ref) => {
  return (
    <ReactLenis root>
      <main className='bg-black pt-20' ref={ref}>
        <div className='wrapper'>
          <section className='text-white h-[60vh] w-full bg-[#0a0a0b] grid place-content-center sticky top-0 z-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-7xl text-5xl px-8 font-bold text-center tracking-tight leading-[120%]'>
              Company <span className="highlight">Gallery</span>
              <br />
              <span className="text-2xl font-medium text-stone-400 mt-4 block">Scroll down to explore! 👇</span>
            </h1>
          </section>
        </div>

        <section className='text-white w-full bg-[#0a0a0b] relative z-10 py-10'>
          <div className='container'>
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
                      className='transition-all duration-500 w-full h-32 md:h-96 align-bottom object-cover rounded-lg md:rounded-2xl border border-white/5 hover:border-orange-500/50 hover:scale-[1.02]'
                    />
                  </figure>
                ))}
              </div>

              {/* Middle Column (Sticky) */}
              <div className='sticky top-20 md:top-24 h-[calc(50vh)] md:h-[calc(100vh-120px)] w-full col-span-4 gap-2 md:gap-4 grid grid-rows-3'>
                {[
                  'https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1476180814856-a36609db0493?w=500&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=500&auto=format&fit=crop'
                ].map((src, i) => (
                  <figure key={i} className='w-full h-full'>
                    <img
                      src={src}
                      alt=''
                      className='transition-all duration-500 h-full w-full align-bottom object-cover rounded-lg md:rounded-2xl border border-white/5 hover:border-orange-500/50 hover:scale-[1.02]'
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
                      className='transition-all duration-500 w-full h-32 md:h-96 align-bottom object-cover rounded-lg md:rounded-2xl border border-white/5 hover:border-orange-500/50 hover:scale-[1.02]'
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className='group bg-[#0a0a0b] py-20'>
          <h1 className='text-[12vw] leading-[100%] uppercase font-bold text-center bg-gradient-to-r from-stone-400 to-stone-800 bg-clip-text text-transparent opacity-20'>
            True Twist
          </h1>
          <div className='bg-black h-20 relative z-10 rounded-tr-full rounded-tl-full mt-10'></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
