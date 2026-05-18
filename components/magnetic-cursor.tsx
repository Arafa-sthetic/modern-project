"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MagneticCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.magnetic === "true"

      setIsHovering(!!isInteractive)
      setIsPointer(window.getComputedStyle(target).cursor === "pointer")
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9999 hidden mix-blend-difference md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            x: isHovering ? -8 : 0,
            y: isHovering ? -8 : 0,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
        />
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9998 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="rounded-full"
          style={{ backgroundColor: "#ff4fd8" }}
          animate={{
            width: isPointer ? 8 : 4,
            height: isPointer ? 8 : 4,
            x: isPointer ? 12 : 14,
            y: isPointer ? 12 : 14,
            opacity: isHovering ? 1 : 0.6,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 500 }}
        />
      </motion.div>
    </>
  )
}
