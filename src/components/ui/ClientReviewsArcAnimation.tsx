import * as React from 'react'
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

export interface ReviewTestimonial {
  id: number | string
  name: string
  company: string
  text: string
  rating: number
  poster: string
}

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

const ReviewStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1 justify-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={cn("size-3 md:size-4", i < Math.floor(rating) ? "text-orange-500" : "text-stone-700")}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

interface ReviewArcCardProps {
  item: ReviewTestimonial
  index: number
  total: number
  morphValue: number
  rotateValue: number
  parallaxValue: number
  containerSize: { width: number; height: number }
}

const ReviewArcCard = ({ item, index, total, morphValue, rotateValue, parallaxValue, containerSize }: ReviewArcCardProps) => {
  const isMobile = containerSize.width < 768;
  
  // 1. Calculate Circle Position
  const minDimension = Math.min(containerSize.width, containerSize.height);
  const circleRadius = Math.min(minDimension * 0.35, 300);
  const circleAngle = (index / total) * 360;
  const circleRad = (circleAngle * Math.PI) / 180;
  
  const circlePos = {
    x: Math.cos(circleRad) * circleRadius,
    y: Math.sin(circleRad) * circleRadius,
    rotation: circleAngle + 90,
  };

  // 2. Calculate Bottom Arc Position
  const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
  const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
  const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
  const arcCenterY = arcApexY + arcRadius;
  const spreadAngle = isMobile ? 100 : 130;
  const startAngle = -90 - (spreadAngle / 2);
  const step = spreadAngle / (total - 1);

  const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
  const maxRotation = spreadAngle * 0.8;
  const boundedRotation = -scrollProgress * maxRotation;

  const currentArcAngle = startAngle + (index * step) + boundedRotation;
  const arcRad = (currentArcAngle * Math.PI) / 180;

  const arcPos = {
    x: Math.cos(arcRad) * arcRadius + parallaxValue,
    y: Math.sin(arcRad) * arcRadius + arcCenterY,
    rotation: currentArcAngle + 90,
    scale: isMobile ? 1.4 : 1.6,
  };

  // 3. Interpolate
  const target = {
    x: lerp(circlePos.x, arcPos.x, morphValue),
    y: lerp(circlePos.y, arcPos.y, morphValue),
    rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
    scale: lerp(1, arcPos.scale, morphValue),
    opacity: 1,
  };

  const zDepth = lerp(0, index * 15, morphValue);

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        z: zDepth,
        rotateX: morphValue > 0.5 ? -15 : 0,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 45, damping: 18 }}
      whileHover={{ 
        scale: target.scale * 1.1, 
        z: zDepth + 50,
        rotateX: -5,
        transition: { duration: 0.3 } 
      }}
      style={{
        position: "absolute",
        width: isMobile ? 220 : 320,
        height: isMobile ? 280 : 420,
        transformStyle: "preserve-3d",
        perspective: "2000px",
      }}
      className="cursor-pointer group z-20"
    >
      <div
        className={cn(
          'flex flex-col h-full w-full p-4 md:p-8 rounded-3xl border border-orange-500/30 bg-orange-500/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 group-hover:shadow-[0_40px_100px_rgba(234,88,12,0.2)]',
        )}
      >
        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <ReviewStars rating={item.rating} />
            <blockquote className="text-sm md:text-lg font-medium italic text-white/90 leading-relaxed line-clamp-6 drop-shadow-md">
              "{item.text}"
            </blockquote>
          </div>
          
          <div className="flex items-center gap-4 border-t border-orange-500/20 pt-4">
            <Avatar className="size-10 md:size-12 border-2 border-orange-500/50 shadow-xl">
              <AvatarImage src={item.poster} alt={item.name} />
              <AvatarFallback className="bg-orange-500/20 text-orange-300">
                {item.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-left min-w-0">
              <p className="font-bold text-white text-base md:text-xl truncate drop-shadow-sm">{item.name}</p>
              <p className="text-[10px] md:text-xs font-bold text-orange-400 uppercase tracking-widest truncate">{item.company}</p>
            </div>
          </div>
        </div>
        
        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none" />
        
        {/* Animated Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -inset-20 bg-[radial-gradient(circle_at_center,_rgba(234,88,12,0.5)_0%,_transparent_70%)] blur-3xl"
          />
        </div>
      </div>
    </motion.div>
  )
}

const ClientReviewsArcAnimation = ({ reviews }: { reviews: ReviewTestimonial[] }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 })
  const [morphValue, setMorphValue] = React.useState(0)
  const [rotateValue, setRotateValue] = React.useState(0)
  const [parallaxValue, setParallaxValue] = React.useState(0)

  const virtualScroll = useMotionValue(0)
  const mouseX = useMotionValue(0)
  
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1])
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360])
  
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 })
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 })
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 })

  React.useEffect(() => {
    const unsubMorph = smoothMorph.on("change", setMorphValue)
    const unsubRotate = smoothScrollRotate.on("change", setRotateValue)
    const unsubMouse = smoothMouseX.on("change", setParallaxValue)
    return () => { unsubMorph(); unsubRotate(); unsubMouse(); }
  }, [smoothMorph, smoothScrollRotate, smoothMouseX])

  React.useEffect(() => {
    if (!containerRef.current) return
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
      const newScroll = Math.min(Math.max(virtualScroll.get() + e.deltaY, 0), 3000)
      virtualScroll.set(newScroll)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseX.set(normX * 100)
      }
    }

    containerRef.current.addEventListener('wheel', handleWheel, { passive: false })
    containerRef.current.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeEventListener('wheel', handleWheel)
      containerRef.current?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [virtualScroll, mouseX])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {reviews.map((item, index) => (
        <ReviewArcCard
          key={item.id}
          item={item}
          index={index}
          total={reviews.length}
          morphValue={morphValue}
          rotateValue={rotateValue}
          parallaxValue={parallaxValue}
          containerSize={containerSize}
        />
      ))}
      
      <motion.div 
        animate={{ opacity: morphValue < 0.5 ? 0.4 : 0 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">Scroll to Transform Reviews</span>
      </motion.div>
    </div>
  )
}

export default ClientReviewsArcAnimation;
