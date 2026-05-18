import * as React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

export type CardStackItem = {
  id: string | number
  title: string
  description?: string
  imageSrc?: string
  href?: string
  ctaLabel?: string
  tag?: string
}

export type CardStackProps<T extends CardStackItem> = {
  items: T[]
  initialIndex?: number
  maxVisible?: number
  cardWidth?: number
  cardHeight?: number
  overlap?: number
  spreadDeg?: number
  perspectivePx?: number
  depthPx?: number
  tiltXDeg?: number
  activeLiftPx?: number
  activeScale?: number
  inactiveScale?: number
  springStiffness?: number
  springDamping?: number
  loop?: boolean
  autoAdvance?: boolean
  intervalMs?: number
  pauseOnHover?: boolean
  showDots?: boolean
  /** Show previous / next arrow controls beside the stack */
  showNavButtons?: boolean
  className?: string
  onChangeIndex?: (index: number, item: T) => void
  /** When user taps the front (active) card — e.g. navigate to service detail */
  onActiveCardActivate?: (item: T) => void
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode
}

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0
  return ((n % len) + len) % len
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active
  if (!loop || len <= 1) return raw
  const alt = raw > 0 ? raw - len : raw + len
  return Math.abs(alt) < Math.abs(raw) ? alt : raw
}

function useResponsiveCardSize(baseW: number, baseH: number) {
  const [size, setSize] = React.useState({ w: baseW, h: baseH })
  React.useEffect(() => {
    const upd = () => {
      const pad = 32
      const maxW = window.innerWidth - pad
      const w = Math.min(baseW, Math.max(280, maxW))
      setSize({ w, h: Math.round(w * (baseH / baseW)) })
    }
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [baseW, baseH])
  return size
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth: cardWidthProp = 520,
  cardHeight: cardHeightProp = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  showNavButtons = true,
  className,
  onChangeIndex,
  onActiveCardActivate,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion()
  const len = items.length
  const { w: cardWidth, h: cardHeight } = useResponsiveCardSize(cardWidthProp, cardHeightProp)

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len))
  const [hovering, setHovering] = React.useState(false)

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len))
  }, [len])

  React.useEffect(() => {
    if (!len) return
    const item = items[active]
    if (item) onChangeIndex?.(active, item)
  }, [active, len, items, onChangeIndex])

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2))
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)))
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0

  const canGoPrev = loop || active > 0
  const canGoNext = loop || active < len - 1

  const prev = React.useCallback(() => {
    if (!len) return
    if (!canGoPrev) return
    setActive((a) => wrapIndex(a - 1, len))
  }, [canGoPrev, len])

  const next = React.useCallback(() => {
    if (!len) return
    if (!canGoNext) return
    setActive((a) => wrapIndex(a + 1, len))
  }, [canGoNext, len])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  React.useEffect(() => {
    if (!autoAdvance) return
    if (reduceMotion) return
    if (!len) return
    if (pauseOnHover && hovering) return

    const id = window.setInterval(() => {
      if (loop || active < len - 1) next()
    }, Math.max(700, intervalMs))

    return () => window.clearInterval(id)
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ])

  if (!len) return null

  const activeItem = items[active]!

  return (
    <div
      className={cn('w-full', className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative w-full"
        style={{ height: Math.max(window.innerWidth <= 768 ? 250 : 380, cardHeight + (window.innerWidth <= 768 ? 40 : 80)) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Service cards"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-orange-500/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/40 blur-3xl"
          aria-hidden
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop)
              const abs = Math.abs(off)
              const visible = abs <= maxOffset
              if (!visible) return null

              const rotateZ = off * stepDeg
              const x = off * cardSpacing
              const y = abs * 10
              const z = -abs * depthPx
              const isActive = off === 0
              const scale = isActive ? activeScale : inactiveScale
              const lift = isActive ? -activeLiftPx : 0
              const rotateX = isActive ? 0 : tiltXDeg
              const zIndex = 100 - abs

              const dragProps = isActive
                ? {
                  drag: 'x' as const,
                  dragConstraints: { left: 0, right: 0 },
                  dragElastic: 0.18,
                  onDragEnd: (
                    _e: unknown,
                    info: { offset: { x: number }; velocity: { x: number } },
                  ) => {
                    if (reduceMotion) return
                    const travel = info.offset.x
                    const v = info.velocity.x
                    const threshold = Math.min(160, cardWidth * 0.22)
                    if (travel > threshold || v > 650) prev()
                    else if (travel < -threshold || v < -650) next()
                  },
                }
                : {}

              return (
                <motion.div
                  key={String(item.id)}
                  className={cn(
                    'absolute bottom-0 overflow-hidden rounded-2xl border-[6px] border-orange-500/80 shadow-2xl',
                    'will-change-transform select-none',
                    isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                        opacity: 0,
                        y: y + 40,
                        x,
                        rotateZ,
                        rotateX,
                        scale,
                      }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onTap={() => {
                    if (isActive) onActiveCardActivate?.(item)
                    else setActive(i)
                  }}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {len > 1 && showNavButtons ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              disabled={!canGoPrev}
              style={{
                position: 'absolute',
                top: '50%',
                left: typeof window !== 'undefined' && window.innerWidth <= 768 ? '8px' : 'calc(50% - 250px)',
                transform: 'translateY(-50%)',
                zIndex: 9999,
                pointerEvents: 'auto',
              }}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full',
                'border border-white/15 bg-black/75 text-white shadow-lg backdrop-blur-sm transition',
                'hover:border-orange-500 hover:bg-black/90 hover:text-orange-500 hover:scale-115 active:scale-95',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
                'disabled:pointer-events-none disabled:opacity-35',
              )}
              aria-label="Previous service"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              disabled={!canGoNext}
              style={{
                position: 'absolute',
                top: '50%',
                right: typeof window !== 'undefined' && window.innerWidth <= 768 ? '8px' : 'calc(50% - 250px)',
                transform: 'translateY(-50%)',
                zIndex: 9999,
                pointerEvents: 'auto',
              }}
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full',
                'border border-white/15 bg-black/75 text-white shadow-lg backdrop-blur-sm transition',
                'hover:border-orange-500 hover:bg-black/90 hover:text-orange-500 hover:scale-115 active:scale-95',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
                'disabled:pointer-events-none disabled:opacity-35',
              )}
              aria-label="Next service"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active
              return (
                <button
                  key={String(it.id)}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={cn(
                    'h-2 w-2 rounded-full transition',
                    on ? 'bg-orange-500' : 'bg-stone-500 hover:bg-stone-400',
                  )}
                  aria-label={`Go to ${it.title}`}
                />
              )
            })}
          </div>
          {activeItem.href ? (
            activeItem.href.startsWith('http') ? (
              <a
                href={activeItem.href}
                target="_blank"
                rel="noreferrer"
                className="text-stone-400 transition hover:text-orange-400"
                aria-label="Open link"
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                to={activeItem.href}
                className="text-stone-400 transition hover:text-orange-400"
                aria-label="Open service"
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </Link>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function DefaultFanCard({ item }: { item: CardStackItem }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-800 text-sm text-stone-400">
            No image
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="truncate text-lg font-semibold text-white">{item.title}</div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-white/85">{item.description}</div>
        ) : null}
      </div>
    </div>
  )
}
