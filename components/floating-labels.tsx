"use client"

import { motion } from "framer-motion"

export default function FloatingLabels() {
  return (
    <>
      {/* Top left status */}
      <motion.div
        className="fixed top-20 left-6 md:top-24 md:left-10 z-30 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span className="text-[10px] text-white/40 tracking-[0.2em] font-mono">ONLINE</span>
      </motion.div>
      
      {/* Coordinates style label */}
      <motion.div
        className="fixed top-20 right-6 md:top-40 md:right-10 z-30 text-right hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <span className="text-[10px] text-white/30 tracking-[0.15em] font-mono block">
          LAT 23.0225° N
        </span>
        <span className="text-[10px] text-white/30 tracking-[0.15em] font-mono block">
          LNG 72.5714° E
        </span>
      </motion.div>
      
      {/* Version label */}
      <motion.div
        className="fixed bottom-16 left-6 md:bottom-20 md:left-10 z-30 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
      >
        <span className="text-[10px] text-white/30 tracking-[0.2em] font-mono">
          V.2024.01
        </span>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-[10px] text-white/40 tracking-[0.2em] font-mono">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-linear-to-b from-white/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </>
  )
}
