/**
 * Spline lazy wrapper. In Next.js App Router, add `'use client'` at the top of this file.
 * @see https://docs.spline.design/
 */
import { Suspense, lazy } from 'react'

import Spline from '@splinetool/react-spline'
// const Spline = lazy(() => import('@splinetool/react-spline'))

export interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-zinc-900/10">
          <span
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-orange-500/30 border-t-orange-500"
            aria-hidden
          />
        </div>
      }
    >
      {scene ? <Spline scene={scene} className={className} /> : null}
    </Suspense>
  )
}
