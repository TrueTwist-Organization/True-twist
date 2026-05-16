/**
 * Animated Cards Stack — shadcn-style + `motion/react` (see `motion` on npm).
 *
 * Integration (this repo): Vite + React + TS + Tailwind; primitives live in
 * `src/components/ui/`, alias `@/components/ui/*`. Optional re-export:
 * `src/components/blocks/animated-cards-stack.ts` → `@/components/blocks/animated-cards-stack`.
 * Full copy-paste integration prompt: `docs/client-reviews-animated-cards-prompt.txt`
 *
 * Deviations from raw copy-paste (required here):
 * - No conditional hooks around `useMotionTemplate` (filter is always created; applied only for `light`).
 * - `ReviewStars` uses `useId()` for gradient ids (multiple stacks on one page).
 * - `ClientReviewsScroll` optional `header` is rendered **inside** the scroll target so
 *   `scrollYProgress` is still ~0 when the user first reaches the title (first card not pre-peeled).
 * - Card peel uses composable Motion `style` keys (`y`, `z`, `rotate`) instead of one
 *   `useMotionTemplate` transform string so `translateY` reliably moves the front card up (px lift).
 *
 * `"use client"` is omitted (Vite has no Server Components; safe to add for portability).
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from 'motion/react'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const cardVariants = cva('absolute will-change-transform', {
  variants: {
    variant: {
      dark:
        'flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-stone-700/50 bg-accent-foreground/80 p-6 backdrop-blur-md',
      light:
        'flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-transparent bg-accent bg-background/80 p-6 backdrop-blur-md',
    },
  },
  defaultVariants: {
    variant: 'light',
  },
})

export interface ReviewTestimonial {
  id: number | string
  name: string
  company: string
  text: string
  rating: number
  poster: string
}

interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  maxRating?: number
}

interface CardStickyProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
  VariantProps<typeof cardVariants> {
  arrayLength: number
  index: number
  incrementY?: number
  incrementZ?: number
  incrementRotation?: number
  children?: React.ReactNode
}

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (context === undefined) {
    throw new Error('useContainerScrollContext must be used within a ContainerScrollContextProvider')
  }
  return context
}

export const ContainerScroll: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    scrollOffset?: NonNullable<Parameters<typeof useScroll>[0]>['offset']
  }
> = ({ children, style, className, scrollOffset, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    /** Default: full pass through viewport — see `ClientReviewsScroll` override. */
    offset: scrollOffset ?? (['start end', 'end start'] as const),
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn('relative min-h-svh w-full', className)}
        style={{ perspective: '1000px', ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}
ContainerScroll.displayName = 'ContainerScroll'

export const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  style,
  ...props
}) => {
  return (
    <div className={cn('relative', className)} style={{ perspective: '1000px', ...style }} {...props}>
      {children}
    </div>
  )
}
CardsContainer.displayName = 'CardsContainer'

export const CardTransformed = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      arrayLength,
      index,
      incrementY = 10,
      incrementZ = 10,
      incrementRotation = -index + 90,
      className,
      variant,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { scrollYProgress } = useContainerScrollContext()
    const resolvedVariant = variant ?? 'light'
    const slots = Math.max(2, arrayLength + 1)

    /**
     * Systaliko / 21st.dev “Animated Cards Stack” timing (not equal 1/n slices):
     * - Each card gets a window `index/(n+1)…(index+1)/(n+1)` for vertical peel.
     * - Rotation uses a wider `rotateRange` so the front card stays nearly upright at rest
     *   while deeper cards read as a soft fan — avoids the “every card at ~90°” look.
     */
    const start = index / slots
    const end = (index + 1) / slots
    const range = React.useMemo(() => [start, end] as [number, number], [start, end])
    /**
     * Card 0: do not extend rotate input below 0 — at scrollYProgress === 0 that put the rotation
     * mid-lerp (~12°) instead of the full fan (`incrementRotation`), and paired badly with the Y peel.
     * Deeper cards keep the wider backward window for the soft fan.
     */
    const rotateRange = React.useMemo((): [number, number] => {
      if (index === 0) {
        return [range[0], range[1] / 1.5]
      }
      return [range[0] - 1.5, range[1] / 1.5]
    }, [index, range])

    const yPx = useTransform(scrollYProgress, range, [0, -680])
    const rotate = useTransform(scrollYProgress, rotateRange, [incrementRotation, 0])

    const dx = useTransform(scrollYProgress, rotateRange, [4, 0])
    const dy = useTransform(scrollYProgress, rotateRange, [4, 12])
    const blur = useTransform(scrollYProgress, rotateRange, [2, 24])
    const alpha = useTransform(scrollYProgress, rotateRange, [0.15, 0.2])
    const filterMotion = useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`

    const cardStyle = {
      ...style,
      top: index * incrementY,
      left: 0,
      right: 0,
      width: '100%',
      y: yPx,
      z: index * incrementZ,
      rotate,
      transformOrigin: '50% 100%',
      backfaceVisibility: 'hidden' as const,
      zIndex: (arrayLength - index) * incrementZ,
      filter: resolvedVariant === 'light' ? filterMotion : 'none',
    }

    return (
      <motion.div
        ref={ref}
        style={cardStyle}
        className={cn(cardVariants({ variant: resolvedVariant, className }))}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)
CardTransformed.displayName = 'CardTransformed'

export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewProps>(
  ({ rating, maxRating = 5, className, ...props }, ref) => {
    const gid = React.useId().replace(/:/g, '')
    const filledStars = Math.floor(rating)
    const fractionalPart = rating - filledStars
    const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0)
    const gradId = `half-${gid}`

    return (
      <div className={cn('flex items-center gap-2', className)} ref={ref} {...props}>
        <div className="flex items-center">
          {[...Array(filledStars)].map((_, i) => (
            <svg
              key={`filled-${i}`}
              className="size-4 text-inherit"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
          {fractionalPart > 0 && (
            <svg className="size-4 text-inherit" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <defs>
                <linearGradient id={gradId}>
                  <stop offset={`${fractionalPart * 100}%`} stopColor="currentColor" />
                  <stop offset={`${fractionalPart * 100}%`} stopColor="rgb(209 213 219)" />
                </linearGradient>
              </defs>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
                fill={`url(#${gradId})`}
              />
            </svg>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="size-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
        <p className="sr-only">
          {rating} out of {maxRating}
        </p>
      </div>
    )
  },
)
ReviewStars.displayName = 'ReviewStars'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function ClientReviewsScroll({
  items,
  header,
}: {
  items: ReviewTestimonial[]
  /** Rendered inside the scroll target (before sticky cards) so scroll progress stays at “rest” until the section actually starts. */
  header?: React.ReactNode
}) {
  const list = React.useMemo(() => items.slice(0, 8), [items])
  const n = list.length
  /**
   * Tall track; `start end` → `end start` maps progress across the full viewport pass.
   * The scroll `target` must include the section heading (via `header`) so progress is still ~0
   * when the user first reads “Client Reviews” — otherwise the first card looks pre-scrolled.
   */
  const scrollVh = React.useMemo(() => {
    if (n <= 0) return 0
    if (n === 1) return 230
    return Math.min(300, Math.max(210, (n + 1) * 58))
  }, [n])

  if (n === 0) return null

  return (
    <div className="client-reviews-stack">
      <ContainerScroll
        scrollOffset={['start end', 'end start']}
        className="mx-auto w-full max-w-5xl"
        style={{ minHeight: `${scrollVh}vh` }}
      >
        {header}
        <div className="sticky left-0 top-0 flex h-svh w-full items-center justify-center overflow-x-hidden pt-2 pb-0 md:pt-3">
          <CardsContainer className="relative mx-auto h-[min(450px,72vh)] w-[min(350px,92vw)] shrink-0">
            {list.map((t, index) => (
              <CardTransformed
                key={t.id}
                arrayLength={n}
                index={index}
                incrementY={10}
                incrementZ={10}
                variant="light"
                className="border border-orange-500/50 text-white backdrop-blur-2xl shadow-[0_0_80px_rgba(234,88,12,0.25)] transition-all duration-500"
                style={{
                  background: 'rgba(234, 88, 12, 0.25)',
                }}
                aria-labelledby={`review-${t.id}-name`}
                aria-describedby={`review-${t.id}-quote`}
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                      x: ['-25%', '25%', '-25%'],
                      y: ['-25%', '25%', '-25%'],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-[50%] bg-[radial-gradient(circle_at_center,_rgba(234,88,12,0.5)_0%,_transparent_70%)] blur-[100px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-900/10" />
                </div>

                <div className="relative z-10 flex size-full min-h-0 flex-col justify-between gap-5">
                  <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-5 text-center">
                    <ReviewStars rating={t.rating} className="justify-center text-orange-500 drop-shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
                    <blockquote
                      id={`review-${t.id}-quote`}
                      className="mx-auto line-clamp-6 w-[88%] text-base leading-relaxed text-white/90 md:text-lg font-medium italic"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                    >
                      "{t.text}"
                    </blockquote>
                  </div>
                  <div className="flex w-full items-center gap-4 border-t border-orange-500/30 pt-5">
                    <Avatar className="size-12 shrink-0 border-2 border-orange-500/50 shadow-[0_0_15px_rgba(234,88,12,0.3)]">
                      <AvatarImage src={t.poster} alt={`Portrait of ${t.name}`} />
                      <AvatarFallback className="bg-orange-500/20 text-sm font-semibold text-orange-300">
                        {initials(t.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 text-left">
                      <span
                        id={`review-${t.id}-name`}
                        className="block truncate text-lg font-bold tracking-tight text-white md:text-xl"
                      >
                        {t.name}
                      </span>
                      <span className="block truncate text-sm font-medium text-orange-400/90 tracking-wide uppercase">{t.company}</span>
                    </div>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </div>
  )
}
