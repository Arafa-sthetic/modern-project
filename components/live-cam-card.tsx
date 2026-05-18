"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function LiveCamCard() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPermission, setHasPermission] = useState(false)
  const [time, setTime] = useState("")
  
  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    // Request camera access
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 160 },
            height: { ideal: 120 },
            facingMode: 'user'
          } 
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasPermission(true)
        }
      } catch {
        console.log("Camera access denied or not available")
        setHasPermission(false)
      }
    }
    
    initCamera()
    
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])
  
  return (
    <motion.div
      className="fixed top-6 right-6 md:top-10 md:right-10 z-50"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="live-cam-card rounded-lg overflow-hidden shadow-2xl">
        {/* Video container */}
        <div className="relative w-28 h-20 md:w-36 md:h-28 bg-black/50">
          {hasPermission ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : (
            // Placeholder image when no camera
            <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Recording indicator */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-white/80 font-mono tracking-wider">REC</span>
          </div>
          
          {/* Scan lines overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
            }}
          />
        </div>
        
        {/* Label */}
        <div className="px-2 py-1.5 bg-black/60 flex items-center justify-between">
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-white/90"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            MY-LIVE-CAM
          </span>
          <span className="text-[10px] text-white/50 font-mono">{time}</span>
        </div>
      </div>
    </motion.div>
  )
}
