"use client"

import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 md:py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-start justify-between">
        {/* Logo / Name */}
        <div className="flex flex-col gap-1">
          <h1 
            className="text-lg md:text-2xl font-bold tracking-[0.2em] text-white chromatic-text"
            data-text="ARAF AHMED"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            ARAF AHMED
          </h1>
        </div>
        
        {/* Right side spacer for balance */}
        <div className="w-24 md:w-32" />
      </div>
    </motion.header>
  )
}

export function FooterLeft() {
  return (
    <motion.div
      className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 flex flex-col gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <span 
        className="text-xs md:text-sm font-bold tracking-[0.15em] text-white/80"
        style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
      >
        AIGHT BRO...
      </span>
      <div className="flex items-center gap-3">
        <Linkedin className="w-5 h-5 text-white/70" />
        <a 
          href="mailto:HELLO@VISUALIDENTITY.CO.IN"
          className="text-xs md:text-sm text-white/70 hover:text-white transition-colors tracking-wider"
        >
          HELLO@VISUALIDENTITY.CO.IN
        </a>
      </div>
    </motion.div>
  )
}

export function FooterRight() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <span 
        className="text-xs md:text-sm font-bold tracking-[0.15em] text-white/80 chromatic-text"
        data-text="THATS IT"
        style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
      >
        THATS IT
      </span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/50 tracking-wider">
          CREATED IN-HOUSE VISUAL IDENTITY
        </span>
        <svg 
          className="w-5 h-5 text-white/70" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    </motion.div>
  )
}
