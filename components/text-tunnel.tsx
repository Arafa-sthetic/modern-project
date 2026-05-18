"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useSpring } from "framer-motion"
import gsap from "gsap"

// Award/achievement text items to display in the tunnel
const tunnelTexts = [
  "MUZLI PICKS FOR HARDIK BHANSALI",
  "CSSDA SPECIAL KUDOS AWARD FOR HYPERLINE",
  "CSSDA BEST UI/UX/INN AWARD FOR HYPERLINE",
  "MORPETRON SOTD FOR COINPLINACE",
  "AWWWARDS KUDOS AWARD FOR COINPLINACE",
  "CSSWINNER AWARD FOR COINPLINACE",
  "FWA SOTD FOR VISUAL IDENTITY",
  "AWWWARDS HONORABLE MENTION",
  "CSSDA INNOVATION AWARD",
  "MUZLI FEATURED PROJECT",
  "BEHANCE PROJECT OF THE DAY",
  "DRIBBBLE FEATURED SHOT",
]

interface TunnelItemProps {
  text: string
  index: number
  totalItems: number
  mouseX: number
  mouseY: number
  time: number
}

function TunnelItem({ text, index, totalItems, mouseX, mouseY, time }: TunnelItemProps) {
  // Calculate position in the tunnel based on time
  const spacing = 120
  const totalDistance = totalItems * spacing
  const basePosition = (time * 0.8 + index * spacing) % totalDistance
  const z = basePosition - totalDistance / 2
  
  // Scale based on depth - items closer appear larger
  const normalizedZ = (z + totalDistance / 2) / totalDistance
  const scale = 0.4 + normalizedZ * 1.2
  
  // Opacity - fade in from distance, fade out when very close
  const opacity = Math.min(1, Math.max(0, normalizedZ * 2)) * Math.min(1, (1 - normalizedZ) * 3)
  
  // Y position - items rise from bottom to top
  const yOffset = (1 - normalizedZ) * 300 - 150
  
  // Mouse influence - stronger when closer
  const mouseInfluence = normalizedZ * 0.5
  const xFromMouse = mouseX * mouseInfluence * 2
  const yFromMouse = mouseY * mouseInfluence * 1.5
  
  // Rotation effects - tilt based on position and mouse
  const rotateX = -15 + normalizedZ * 30 + mouseY * 0.1
  const rotateZ = Math.sin(normalizedZ * Math.PI) * 5 + mouseX * 0.05
  
  // Skip rendering if too transparent
  if (opacity < 0.05) return null
  
  return (
    <div
      className="absolute left-1/2 whitespace-nowrap pointer-events-none"
      style={{
        transform: `
          translateX(-50%)
          translateX(${xFromMouse}px)
          translateY(${yOffset + yFromMouse}px)
          translateZ(${z}px)
          scale(${scale})
          rotateX(${rotateX}deg)
          rotateZ(${rotateZ}deg)
        `,
        opacity,
        fontSize: 'clamp(0.8rem, 2.5vw, 1.8rem)',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        willChange: 'transform, opacity',
        fontFamily: 'var(--font-oswald), sans-serif',
        color: 'white',
        textShadow: `
          0 0 10px rgba(255, 255, 255, 0.5),
          0 0 30px rgba(255, 255, 255, 0.3),
          -2px 0 rgba(255, 50, 100, 0.7),
          2px 0 rgba(0, 255, 255, 0.7)
        `,
        filter: `blur(${(1 - normalizedZ) * 1}px)`,
      }}
    >
      {text}
    </div>
  )
}

export default function TextTunnel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const animationRef = useRef<number | null>(null)
  
  // Smooth spring values for mouse movement
  const springConfig = { damping: 30, stiffness: 120 }
  const mouseXSpring = useSpring(0, springConfig)
  const mouseYSpring = useSpring(0, springConfig)
  
  // Animation loop for continuous movement
  useEffect(() => {
    let lastTime = performance.now()
    
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime
      
      setTime(prev => prev + delta * 0.03)
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate mouse position relative to center (-1 to 1)
    const x = ((e.clientX - rect.left) - centerX) / centerX
    const y = ((e.clientY - rect.top) - centerY) / centerY
    
    mouseXSpring.set(x * 80)
    mouseYSpring.set(y * 80)
  }, [mouseXSpring, mouseYSpring])
  
  useEffect(() => {
    const unsubscribeX = mouseXSpring.on("change", (v) => {
      setMousePosition((prev) => ({ ...prev, x: v }))
    })
    const unsubscribeY = mouseYSpring.on("change", (v) => {
      setMousePosition((prev) => ({ ...prev, y: v }))
    })
    
    window.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      unsubscribeX()
      unsubscribeY()
    }
  }, [handleMouseMove, mouseXSpring, mouseYSpring])
  
  // GSAP animation for container tilt
  useEffect(() => {
    if (!containerRef.current) return
    
    gsap.to(containerRef.current, {
      rotateX: -mousePosition.y * 0.08,
      rotateY: mousePosition.x * 0.08,
      duration: 1,
      ease: "power3.out",
    })
  }, [mousePosition])
  
  return (
    <div
      ref={containerRef}
      className="tunnel-container relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* Tunnel items container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {tunnelTexts.map((text, index) => (
          <TunnelItem
            key={index}
            text={text}
            index={index}
            totalItems={tunnelTexts.length}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
            time={time}
          />
        ))}
      </motion.div>
      
      {/* Center vanishing point glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Additional depth gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  )
}
