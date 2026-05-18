"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            data-magnetic="true"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
                backgroundColor: isMenuOpen ? "#ff4fd8" : "currentColor",
              }}
              transition={{ duration: 0.3 }}
              className="h-0.5 w-6"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scaleX: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="h-0.5 w-6 bg-current"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
                backgroundColor: isMenuOpen ? "#ff4fd8" : "currentColor",
              }}
              transition={{ duration: 0.3 }}
              className="h-0.5 w-6"
            />
          </motion.button>
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

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            />

            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, #ff4fd8 0%, transparent 70%)" }}
            />

            {/* Nav items */}
            <div className="relative flex h-full flex-col items-center justify-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative overflow-hidden"
                >
                  <span className="text-4xl font-bold uppercase tracking-tight transition-colors hover:text-[#ff4fd8] md:text-5xl">
                    {item.name}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.75 w-full origin-left"
                    style={{ backgroundColor: "#ff4fd8" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}

              {/* CTA */}
              <motion.a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 rounded-full px-10 py-4 font-mono text-sm uppercase tracking-wider text-background"
                style={{
                  backgroundColor: "#ff4fd8",
                  boxShadow: "0 0 40px rgba(255, 79, 216, 0.4)",
                }}
              >
                Hire Me
              </motion.a>

              {/* Social links in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex gap-6"
              >
                {["GH", "TW", "LI"].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 font-mono text-xs transition-all hover:border-[#ff4fd8] hover:text-[#ff4fd8]"
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
