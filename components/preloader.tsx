"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(onComplete, 800)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background"
        >
          {/* Background text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.03, scale: 1 }}
              transition={{ duration: 1 }}
              className="whitespace-nowrap font-mono text-[20vw] font-black uppercase tracking-tighter text-foreground"
            >
              LOADING
            </motion.span>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Wait Bro
              </h1>
              <p className="text-xs text-muted-foreground/60">
                Loading experience...
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="relative h-0.5 w-48 overflow-hidden bg-muted">
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{ backgroundColor: '#ff4fd8' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress number */}
            <motion.span
              className="font-mono text-4xl font-bold tabular-nums"
              style={{ color: '#ff4fd8' }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </div>

          {/* Animated corners */}
          <div className="absolute left-8 top-8 h-12 w-12">
            <motion.div
              className="absolute left-0 top-0 h-0.5 w-full origin-left"
              style={{ backgroundColor: '#ff4fd8' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <motion.div
              className="absolute left-0 top-0 h-full w-0.5 origin-top"
              style={{ backgroundColor: '#ff4fd8' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          <div className="absolute bottom-8 right-8 h-12 w-12">
            <motion.div
              className="absolute bottom-0 right-0 h-0.5 w-full origin-right"
              style={{ backgroundColor: '#ff4fd8' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 h-full w-0.5 origin-bottom"
              style={{ backgroundColor: '#ff4fd8' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
