"use client"

import { motion } from "framer-motion"

const tickerItems = [
  "CREATIVE DEVELOPER",
  "•",
  "VISUAL IDENTITY",
  "•",
  "UI/UX DESIGN",
  "•",
  "MOTION GRAPHICS",
  "•",
  "EXPERIMENTAL WEB",
  "•",
  "AWWWARDS WINNER",
  "•",
  "CSSDA RECOGNIZED",
  "•",
  "3D EXPERIENCES",
  "•",
]

export default function Ticker() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-8 md:h-10 bg-black/80 backdrop-blur-sm border-t border-white/10 z-40 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <div className="h-full flex items-center">
        <div className="ticker-content flex items-center gap-8 whitespace-nowrap">
          {/* Duplicate items for seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={index}
              className={`text-xs md:text-sm tracking-[0.2em] ${
                item === "•" 
                  ? "text-white/30" 
                  : "text-white/60 font-medium"
              }`}
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
