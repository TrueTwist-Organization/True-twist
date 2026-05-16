import * as React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface InsightDialogItem {
  id: number
  url: { src: string }
  title: string
  description: string
  tags: string[]
  blogHref?: string
}

export interface InsightsDialogGridProps {
  items: InsightDialogItem[]
}

const InsightCardContent = ({ item, isHoverable = true }: { item: InsightDialogItem, isHoverable?: boolean }) => {
  const href = item.blogHref ?? `/blog/${item.id}`
  return (
    <Link
      to={href}
      className={cn(
        'insight-card-premium group flex w-full h-[420px] flex-col overflow-hidden transition-all duration-500 rounded-3xl border border-white/10 bg-[#101012]/80 backdrop-blur-2xl shadow-2xl',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
        isHoverable && 'hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(234,88,12,0.3)]'
      )}
    >
      <div className="relative h-1/2 overflow-hidden">
        <img
          src={item.url.src}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {item.tags.map((tag: string) => (
            <span key={tag} className="rounded-full bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-md ring-1 ring-orange-500/30">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative flex flex-grow flex-col justify-between p-6">
        <div className="text-left">
          <h3 className="text-lg md:text-xl font-bold text-white transition-colors group-hover:text-orange-400 line-clamp-2">{item.title}</h3>
          <p className="mt-3 line-clamp-3 text-xs md:text-sm leading-relaxed text-stone-400 group-hover:text-stone-300">{item.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-xs font-bold text-orange-500/80 uppercase tracking-widest">Read Article</span>
          <Plus className="h-5 w-5 text-orange-400" />
        </div>
      </div>

      {/* Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />
    </Link>
  )
}

export const InsightsDialogGrid = React.forwardRef<HTMLDivElement, InsightsDialogGridProps>(
  ({ items }, ref) => {
    // We expect 3 items for this layout.
    const leftItem = items[0];
    const middleItem = items[1];
    const rightItem = items[2];

    const springConfig = { type: "spring" as const, stiffness: 20, damping: 15, mass: 1 };

    const SplitCard = ({ item, isMobile = false }: { item: InsightDialogItem, isMobile?: boolean }) => {
      if (isMobile) {
        return (
          <motion.div
            variants={{
              hidden: { scale: 0, rotate: 180, opacity: 0 },
              visible: { scale: 1, rotate: 0, opacity: 1, transition: springConfig }
            }}
          >
            <InsightCardContent item={item} />
          </motion.div>
        );
      }

      return (
        <div className="relative z-10">
          <div className="invisible">
            <InsightCardContent item={item} isHoverable={false} />
          </div>
          <motion.div
            variants={{
              hidden: { x: 800, rotate: 360, opacity: 0 },
              visible: { x: 0, rotate: 0, opacity: 1, transition: springConfig }
            }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <InsightCardContent item={item} isHoverable={false} />
          </motion.div>
          <motion.div
            variants={{
              hidden: { x: -800, rotate: -360, opacity: 0 },
              visible: { x: 0, rotate: 0, opacity: 1, transition: springConfig }
            }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ clipPath: 'inset(0 0 0 50%)' }}
          >
            <InsightCardContent item={item} isHoverable={false} />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 1.5, duration: 0.5 } }
            }}
            className="absolute inset-0 z-20"
          >
            <InsightCardContent item={item} />
          </motion.div>
        </div>
      );
    };

    return (
      <div ref={ref} className="w-full max-w-7xl mx-auto px-4 py-10 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {leftItem && (
            <div className="z-20">
              <div className="hidden md:block">
                <SplitCard item={leftItem} />
              </div>
              <div className="md:hidden">
                <SplitCard item={leftItem} isMobile />
              </div>
            </div>
          )}
          {middleItem && (
            <div className="z-10">
              <div className="hidden md:block">
                <SplitCard item={middleItem} />
              </div>
              <div className="md:hidden">
                <SplitCard item={middleItem} isMobile />
              </div>
            </div>
          )}
          {rightItem && (
            <div className="z-20">
              <div className="hidden md:block">
                <SplitCard item={rightItem} />
              </div>
              <div className="md:hidden">
                <SplitCard item={rightItem} isMobile />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    )
  }
)
InsightsDialogGrid.displayName = 'InsightsDialogGrid'

