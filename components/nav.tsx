"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const blur = useTransform(scrollYProgress, [0, 0.05], [0, 12])

  const navItems = [
    { name: "Works", href: "#works" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["works", "about", "contact"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        style={{
          opacity,
          backdropFilter: `blur(${blur}px)`,
        }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-border/30 bg-background/70"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo with animation */}
          <motion.a
            href="#"
            className="group relative font-mono text-lg font-bold uppercase tracking-wider"
            data-magnetic="true"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">
              Portfolio
              <motion.span
                style={{ color: "#ff4fd8" }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                .
              </motion.span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative px-4 py-2"
                data-magnetic="true"
              >
                <span
                  className={`relative z-10 font-mono text-xs uppercase tracking-wider transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-[#ff4fd8]"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {item.name}
                </span>
                {/* Active/hover indicator */}
                <motion.span
                  className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                  style={{ backgroundColor: "#ff4fd8" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.href.slice(1) ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}

            {/* CTA Button */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="group relative ml-4 overflow-hidden rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider"
              style={{ backgroundColor: "#ff4fd8" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 79, 216, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              data-magnetic="true"
            >
              <span className="relative z-10 text-background transition-colors group-hover:text-background">
                Hire Me
              </span>
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

        </nav>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{
            backgroundColor: "#ff4fd8",
            scaleX: scrollYProgress,
            boxShadow: "0 0 10px rgba(255, 79, 216, 0.5)",
          }}
        />
      </motion.header>

    </>
  )
}
