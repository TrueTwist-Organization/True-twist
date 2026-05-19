import React, { forwardRef } from 'react';

const Gallery = forwardRef((props, ref) => {
  React.useEffect(() => {
    // Disable scroll snapping on HTML element for Gallery page
    // This unlocks trackpad and mouse wheel scrolling completely!
    const originalScrollSnap = document.documentElement.style.scrollSnapType;
    document.documentElement.style.scrollSnapType = 'none';
    
    return () => {
      // Re-enable scroll snapping when leaving the Gallery page
      document.documentElement.style.scrollSnapType = originalScrollSnap;
    };
  }, []);

  return (
    <>
      <main className='bg-black' ref={ref}>
        {/* Gallery Section - Branded Header and Office Images */}
        <div className='text-white w-full bg-transparent relative z-10 pt-32 pb-20 px-4 sm:px-8'>
          
          {/* Premium Branded Title Header */}
          <div className='text-center max-w-3xl mx-auto mb-16 relative z-20'>
            <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold text-[#e65014] bg-[#e65014]/10 px-5 py-2.5 rounded-full border border-[#e65014]/25 mb-6 inline-block backdrop-blur-md shadow-[0_0_15px_rgba(230,80,20,0.1)]">
              True Twist Workspace
            </span>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[110%] mb-4 text-white'>
              Our Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e65014] via-[#ff6b00] to-[#ff9d00] animate-pulse">Studio</span>
            </h1>
            <p className='text-stone-400 font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed'>
              Take a peak inside our high-performance workspace where innovation, collaboration, and code come together.
            </p>
          </div>

          <div className='grid grid-cols-12 gap-2 items-start'>
            {/* Left Scrolling Column (Office & Developer Life) */}
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' 
                  alt='Creative Workspace' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80' 
                  alt='Coding at Night' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' 
                  alt='Team Meeting' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' 
                  alt='Design Sprint' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80' 
                  alt='Modern Desk Setup' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80' 
                  alt='Team Collaboration' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80' 
                  alt='Brainstorming Session' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
            </div>

            {/* Middle Sticky Column (Featured Office Spaces) */}
            <div className='sticky top-24 h-screen w-full col-span-4 gap-2 grid grid-rows-3 py-2'>
              <figure className='w-full h-full'>
                <img 
                  src='https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80' 
                  alt='Premium Boardroom' 
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md border border-[#e65014]/20 shadow-[0_0_20px_rgba(230,80,20,0.1)]' 
                />
              </figure>
              <figure className='w-full h-full'>
                <img 
                  src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80' 
                  alt='Workspace Overhead' 
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md border border-[#e65014]/20 shadow-[0_0_20px_rgba(230,80,20,0.1)]' 
                />
              </figure>
              <figure className='w-full h-full'>
                <img 
                  src='https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80' 
                  alt='Office Architecture' 
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md border border-[#e65014]/20 shadow-[0_0_20px_rgba(230,80,20,0.1)]' 
                />
              </figure>
            </div>

            {/* Right Scrolling Column (Collaboration & Workspace Layouts) */}
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80' 
                  alt='Industrial Loft Workspace' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80' 
                  alt='Software Engineering Setup' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=600&q=80' 
                  alt='Agency Lounge' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80' 
                  alt='Designing UI UX' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80' 
                  alt='Creative Desks' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80' 
                  alt='Office Meeting Session' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
              <figure className='w-full'>
                <img 
                  src='https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=600&q=80' 
                  alt='Tech Office Space' 
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md' 
                />
              </figure>
            </div>
          </div>
        </div>
      </main>
    </>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
