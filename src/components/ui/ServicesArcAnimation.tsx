import * as React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface ServiceItem {
  id: string
  title: string
  description: string
  imageSrc: string
  href: string
  icon?: React.ReactNode
}

export interface ServicesArcAnimationProps {
  items: ServiceItem[]
}

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

interface ServiceArcCardProps {
  item: ServiceItem
  index: number
  total: number
  morphValue: number
  rotateValue: number
  parallaxValue: number
  containerSize: { width: number; height: number }
}

const ServiceArcCard = ({ item, index, total, morphValue, rotateValue, parallaxValue, containerSize }: ServiceArcCardProps) => {
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

  const zDepth = lerp(0, index * 10, morphValue);

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
        scale: target.scale * 1.05, 
        z: zDepth + 40,
        rotateX: -5,
        transition: { duration: 0.3 } 
      }}
      style={{
        position: "absolute",
        width: isMobile ? 180 : 300,
        height: isMobile ? 240 : 400,
        transformStyle: "preserve-3d",
        perspective: "2000px",
      }}
      className="cursor-pointer group z-20"
    >
      <Link
        to={item.href}
        className={cn(
          'flex flex-col h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#101012]/80 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:border-orange-500/40',
        )}
      >
        <div className="relative h-1/2 overflow-hidden">
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-transparent to-transparent opacity-80" />
          {item.icon && (
            <div className="absolute bottom-4 left-4 text-orange-500 drop-shadow-[0_0_8px_rgba(234,88,12,0.6)]">
              {React.cloneElement(item.icon as React.ReactElement<{ size: number }>, { size: isMobile ? 24 : 32 })}
            </div>
          )}
        </div>
        <div className="relative flex flex-grow flex-col justify-between p-4 md:p-6">
          <div className="text-left">
            <h3 className="text-sm md:text-xl font-bold text-white transition-colors group-hover:text-orange-400 line-clamp-2">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-[10px] md:text-xs leading-relaxed text-stone-400 group-hover:text-stone-300">{item.description}</p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-[8px] md:text-[10px] font-bold text-orange-500/80 uppercase tracking-widest">Learn More</span>
            <Plus className="h-4 w-4 text-orange-400" />
          </div>
        </div>
        
        {/* Ambient Highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />
      </Link>
    </motion.div>
  )
}

export const ServicesArcAnimation = ({ items }: ServicesArcAnimationProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 })
  const [morphValue, setMorphValue] = React.useState(0)
  const [rotateValue, setRotateValue] = React.useState(0)
  const [parallaxValue, setParallaxValue] = React.useState(0)

  const virtualScroll = useMotionValue(0)
  const mouseX = useMotionValue(0)
  
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1])
  const scrollRotate = useTransform(virtualScroll, [600, 4000], [0, 360])
  
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
      const newScroll = Math.min(Math.max(virtualScroll.get() + e.deltaY, 0), 4000)
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
      {items.map((item, index) => (
        <ServiceArcCard
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          morphValue={morphValue}
          rotateValue={rotateValue}
          parallaxValue={parallaxValue}
          containerSize={containerSize}
        />
      ))}
      
      <motion.div 
        animate={{ opacity: morphValue < 0.5 ? 0.3 : 0 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="text-white/30 text-[10px] font-bold tracking-[0.5em] uppercase">Scroll to Explore Services</span>
      </motion.div>
    </div>
  )
}
