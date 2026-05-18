"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: i * 0.15,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const textLeftX = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const textRightX = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 79, 216, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 79, 216, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)",
          }}
        />
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[15%] top-[20%] h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff4fd8 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute bottom-[20%] right-[10%] h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00ffff 0%, transparent 70%)" }}
      />

      {/* Fixed background text - Left with parallax */}
      <motion.div
        style={{ x: textLeftX }}
        className="pointer-events-none absolute left-0 top-0 h-full w-24 overflow-hidden md:w-40"
      >
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-7xl font-black uppercase tracking-tighter text-foreground/3 md:text-9xl"
          style={{ transformOrigin: "center center" }}
        >
          I BUILT IT
        </div>
      </motion.div>

      {/* Fixed background text - Right with parallax */}
      <motion.div
        style={{ x: textRightX }}
        className="pointer-events-none absolute right-0 top-0 h-full w-24 overflow-hidden md:w-40"
      >
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-7xl font-black uppercase tracking-tighter text-foreground/3 md:text-9xl"
          style={{ transformOrigin: "center center" }}
        >
          NO CAP
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ opacity, scale, y }} className="relative z-10 px-6 text-center">
        {/* Badge with glow */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants as any}
          className="mb-6 flex justify-center"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "#ff4fd8" }}
            />
            Available for work
          </span>
        </motion.div>

        {/* Main headline with text reveal */}
        <div className="mb-8 overflow-hidden">
          <h1 className="text-5xl font-bold uppercase tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
            {["Crafting", "Digital", "Experiences"].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants as any}
                  className="inline-block"
                  style={i === 1 ? { color: "#ff4fd8" } : undefined}
                >
                  {i === 1 ? (
                    <span className="relative">
                      {word}
                      <motion.span
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute -bottom-2 left-0 h-1 rounded-full"
                        style={{ backgroundColor: "#ff4fd8" }}
                      />
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants as any}
          className="mx-auto mb-12 max-w-lg text-base text-muted-foreground md:text-lg lg:text-xl"
        >
          Building pixel-perfect interfaces with obsessive attention to detail
          and buttery smooth animations.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants as any}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <a
            href="#works"
            className="group relative overflow-hidden rounded-full px-10 py-4 font-mono text-sm uppercase tracking-wider transition-all duration-500"
            style={{
              backgroundColor: "#ff4fd8",
              boxShadow: "0 0 40px rgba(255, 79, 216, 0.4)",
            }}
            data-magnetic="true"
          >
            <span className="relative z-10 flex items-center gap-2 text-background transition-transform duration-300 group-hover:translate-x-1">
              View Works
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &rarr;
              </motion.span>
            </span>
            <motion.span
              className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-500 group-hover:translate-x-0"
            />
          </a>
          <a
            href="#contact"
            className="group relative font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            data-magnetic="true"
          >
            <span className="relative">
              Get in Touch
              <span
                className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "#ff4fd8" }}
              />
            </span>
          </a>
        </motion.div>

        {/* Tech stack marquee */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants as any}
          className="mt-20"
        >
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Tech I work with
          </span>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  className="rounded-full border border-border/30 bg-secondary/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <div className="relative h-14 w-0.5 overflow-hidden rounded-full bg-border/30">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-x-0 h-1/2 rounded-full"
              style={{ backgroundColor: "#ff4fd8" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
