"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"

const skills = [
  { name: "React / Next.js", level: 95, icon: "⚛" },
  { name: "TypeScript", level: 90, icon: "TS" },
  { name: "Framer Motion", level: 88, icon: "◈" },
  { name: "Three.js / WebGL", level: 75, icon: "◇" },
  { name: "Node.js", level: 85, icon: "⬡" },
  { name: "UI/UX Design", level: 80, icon: "◐" },
]

const experiences = [
  { year: "2024", role: "Senior Creative Developer", company: "Studio Digital", description: "Leading creative frontend development" },
  { year: "2022", role: "Frontend Lead", company: "Tech Innovations", description: "Building scalable web applications" },
  { year: "2020", role: "UI Engineer", company: "Design Agency", description: "Crafting interactive experiences" },
]

const stats = [
  { value: "50", suffix: "+", label: "Projects Shipped" },
  { value: "5", suffix: "+", label: "Years Experience" },
  { value: "30", suffix: "+", label: "Happy Clients" },
  { value: "99", suffix: "%", label: "Code Quality" },
]

function AnimatedCounter({ value, suffix, delay }: { value: string; suffix: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)
  const numValue = parseInt(value)

  useState(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = numValue / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= numValue) {
          setDisplayValue(numValue)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {isInView ? displayValue : 0}{suffix}
    </motion.span>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen overflow-hidden px-6 py-32">
      {/* Animated background text with parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ y: backgroundY }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.02, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap text-[20vw] font-black uppercase leading-none text-foreground select-none"
        >
          CREATIVE DEV
        </motion.span>
      </motion.div>

      {/* Animated decorative lines */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/4 top-0 h-full w-px origin-top bg-linear-to-b from-transparent via-[#ff4fd8]/20 to-transparent"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-1/4 top-0 h-full w-px origin-top bg-linear-to-b from-transparent via-[#ff4fd8]/20 to-transparent"
        />
      </div>

      {/* Floating orbs */}
      {/* Floating orbs */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl"
        // 🛑 দুটো স্টাইলকে একসাথে কমা (,) দিয়ে এক জোড়া সেকেন্ড ব্র্যাকেটের ভেতর নিয়ে আসা হলো
        style={{ 
          y: parallaxY, 
          background: "radial-gradient(circle, #ff4fd8 0%, transparent 70%)" 
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header with staggered text reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-24 text-center"
        >
          {/* Animated badge */}
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block rounded-full border border-[#ff4fd8]/30 bg-[#ff4fd8]/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-[#ff4fd8]"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ff4fd8]"
            />
            About Me
          </motion.span>

          {/* Title with text reveal animation */}
          <h2 className="mt-6 text-5xl font-black uppercase tracking-tight md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%", rotateX: -80 }}
                animate={isInView ? { y: "0%", rotateX: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block origin-bottom"
              >
                Code
              </motion.span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <motion.span
                initial={{ y: "100%", rotateX: -80 }}
                animate={isInView ? { y: "0%", rotateX: 0 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 inline-block origin-bottom text-[#ff4fd8]"
              >
                Artistry
              </motion.span>
              <motion.span
                className="absolute -bottom-2 left-0 h-3 w-full bg-[#ff4fd8]/20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Left column - Bio with image */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Profile image area with advanced effects */}
              <div className="group relative mb-8 aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2">
                {/* Animated corner accents */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div
                    animate={{ pathLength: [0, 1] }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="absolute left-4 top-4 h-12 w-12 border-l-2 border-t-2 border-[#ff4fd8]/50"
                  />
                  <div className="absolute right-4 top-4 h-12 w-12 border-r-2 border-t-2 border-[#ff4fd8]/50" />
                  <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-[#ff4fd8]/50" />
                  <div className="absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-[#ff4fd8]/50" />
                </motion.div>

                {/* Gradient background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#ff4fd8]/10 via-transparent to-[#ff4fd8]/5" />
                
                {/* Animated grid pattern */}
                <motion.div
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(#ff4fd8 1px, transparent 1px), linear-gradient(90deg, #ff4fd8 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-6xl opacity-20"
                  >
                    ◇
                  </motion.span>
                </div>

                {/* Hover glitch effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#ff4fd8]/10 mix-blend-overlay"
                />

                {/* Animated scanline */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-20 bg-linear-to-b from-transparent via-white/5 to-transparent"
                />

                {/* Available badge with pulse */}
                <motion.div
                  className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-[#ff4fd8]/30 bg-background/80 px-3 py-1.5 backdrop-blur-sm"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4fd8] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff4fd8]" />
                  </span>
                  <span className="text-xs font-medium">Available</span>
                </motion.div>
              </div>

              {/* Bio text with staggered reveal */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-6 text-lg leading-relaxed text-muted-foreground"
              >
                I craft digital experiences that blur the line between art and functionality.
                With a passion for motion and interaction, I transform ideas into immersive
                web experiences that captivate and engage.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base leading-relaxed text-muted-foreground/70"
              >
                Based in the digital realm, working globally. Specializing in creative
                development, interactive installations, and premium web experiences.
              </motion.p>

              {/* CTA buttons with magnetic effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.a
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-semibold text-background transition-all"
                  style={{ backgroundColor: "#ff4fd8", boxShadow: "0 0 30px rgba(255,79,216,0.3)" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,79,216,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  data-magnetic="true"
                >
                  <span className="relative z-10">{"Let's Talk"}</span>
                  <motion.svg
                    className="relative z-10 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                  <motion.span
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 font-semibold transition-all hover:border-[#ff4fd8]/50 hover:bg-[#ff4fd8]/5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-magnetic="true"
                >
                  Download CV
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - Skills & Experience */}
          <div className="lg:col-span-7">
            {/* Skills grid with hover effects */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h3 className="mb-6 flex items-center gap-4 font-mono text-sm uppercase tracking-[0.2em] text-[#ff4fd8]">
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 40 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-px bg-[#ff4fd8]"
                />
                Skills & Tools
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                    onMouseEnter={() => setHoveredSkill(i)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/2 p-4 transition-all duration-500 hover:border-[#ff4fd8]/30 hover:bg-[#ff4fd8]/5"
                  >
                    {/* Hover glow effect */}
                    <AnimatePresence>
                      {hoveredSkill === i && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-linear-to-br from-[#ff4fd8]/10 to-transparent"
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.span
                          animate={{ rotate: hoveredSkill === i ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff4fd8]/10 font-mono text-sm text-[#ff4fd8]"
                        >
                          {skill.icon}
                        </motion.span>
                        <span className="font-medium transition-colors group-hover:text-[#ff4fd8]">{skill.name}</span>
                      </div>
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: hoveredSkill === i ? 1 : 0.5, x: 0 }}
                        className="font-mono text-sm text-muted-foreground"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="relative z-10 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: hoveredSkill === i
                            ? "#ff4fd8"
                            : "linear-gradient(90deg, #ff4fd8, #ff4fd8aa)",
                          boxShadow: hoveredSkill === i ? "0 0 20px rgba(255,79,216,0.5)" : "none",
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience timeline with advanced animations */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h3 className="mb-6 flex items-center gap-4 font-mono text-sm uppercase tracking-[0.2em] text-[#ff4fd8]">
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 40 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="h-px bg-[#ff4fd8]"
                />
                Experience
              </h3>
              <div className="relative space-y-6 pl-8">
                {/* Animated timeline line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-1.25 top-2 w-px origin-top bg-linear-to-b from-[#ff4fd8] via-[#ff4fd8]/30 to-transparent"
                />

                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9 + i * 0.15 }}
                    onMouseEnter={() => setHoveredExp(i)}
                    onMouseLeave={() => setHoveredExp(null)}
                    className="group relative"
                  >
                    {/* Animated timeline dot */}
                    <motion.div
                      className="absolute -left-8 top-3 flex h-3 w-3 items-center justify-center"
                      animate={{
                        scale: hoveredExp === i ? 1.5 : 1,
                      }}
                    >
                      <span
                        className="absolute h-3 w-3 rounded-full border-2 bg-background transition-all"
                        style={{ borderColor: "#ff4fd8" }}
                      />
                      <motion.span
                        animate={{ scale: hoveredExp === i ? 1 : 0 }}
                        className="absolute h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: "#ff4fd8" }}
                      />
                    </motion.div>

                    <motion.div
                      className="rounded-xl border border-transparent p-4 transition-all duration-300"
                      animate={{
                        borderColor: hoveredExp === i ? "rgba(255,79,216,0.3)" : "transparent",
                        backgroundColor: hoveredExp === i ? "rgba(255,79,216,0.05)" : "transparent",
                      }}
                    >
                      <span className="font-mono text-sm" style={{ color: "#ff4fd8" }}>{exp.year}</span>
                      <h4 className="mt-1 font-bold transition-colors group-hover:text-[#ff4fd8]">{exp.role}</h4>
                      <p className="text-sm text-muted-foreground">@ {exp.company}</p>
                      <p className="mt-1 text-sm text-muted-foreground/70">{exp.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/2 p-4 text-center transition-all duration-300 hover:border-[#ff4fd8]/30"
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ boxShadow: "inset 0 0 30px rgba(255,79,216,0.1)" }}
                  />
                  <div className="relative z-10 text-3xl font-black" style={{ color: "#ff4fd8" }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={1.2 + i * 0.1} />
                  </div>
                  <div className="relative z-10 mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
