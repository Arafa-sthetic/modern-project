"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function SmokeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // লাইন ১৭ থেকে ১৯ এর সঠিক রূপ:
  const particlesRef = useRef<Particle[]>([]); 
  const mouseRef = useRef({ x: 0, y: 0 }); //
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    // Initialize particles
    const particleCount = 50
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 150 + 50,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3 - 0.2, // Slight upward drift
      opacity: Math.random() * 0.08 + 0.02,
    }))
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Mouse influence
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.02
          particle.speedX -= (dx / distance) * force
          particle.speedY -= (dy / distance) * force
        }
        
        // Wrap around edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size
        
        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(200, 200, 200, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, "transparent")
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ filter: "blur(30px)" }}
    />
  )
}
