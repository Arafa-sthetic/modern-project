"use client"

import { motion } from "framer-motion"

export default function Overlays() {
  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Vignette effect */}
      <div className="vignette" />
      
      {/* Fog layers */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        {/* Top fog */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/3 fog-layer"
          style={{
            background: 'linear-gradient(to bottom, rgba(50, 50, 50, 0.3) 0%, transparent 100%)',
            filter: 'blur(50px)',
          }}
        />
        
        {/* Bottom fog */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/3 fog-layer"
          style={{
            background: 'linear-gradient(to top, rgba(30, 30, 30, 0.4) 0%, transparent 100%)',
            filter: 'blur(50px)',
            animationDelay: '5s',
          }}
        />
        
        {/* Side fogs */}
        <div 
          className="absolute top-0 left-0 w-1/4 h-full fog-layer"
          style={{
            background: 'linear-gradient(to right, rgba(20, 20, 20, 0.5) 0%, transparent 100%)',
            filter: 'blur(40px)',
            animationDelay: '2s',
          }}
        />
        <div 
          className="absolute top-0 right-0 w-1/4 h-full fog-layer"
          style={{
            background: 'linear-gradient(to left, rgba(20, 20, 20, 0.5) 0%, transparent 100%)',
            filter: 'blur(40px)',
            animationDelay: '7s',
          }}
        />
      </motion.div>
      
      {/* Subtle bloom/glow in center */}
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full pointer-events-none z-5 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          filter: 'blur(60px)',
        }}
      />
    </>
  )
}
