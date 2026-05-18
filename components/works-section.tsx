"use client"

import { useRef, useState } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion"

interface Project {
  id: number
  title: string
  category: string
  description: string
  tags: string[]
  stylePoints: string
  year: string
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    category: "Web Application",
    description: "A futuristic analytics dashboard with real-time data visualization and AI-powered insights",
    tags: ["React", "Three.js", "WebGL"],
    stylePoints: "+87",
    year: "2024",
    color: "#6366f1",
  },
  {
    id: 2,
    title: "Aurora Commerce",
    category: "E-Commerce",
    description: "Premium shopping experience with immersive product showcases and AR try-on features",
    tags: ["Next.js", "Stripe", "Prisma"],
    stylePoints: "+92",
    year: "2024",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Cipher Protocol",
    category: "Web3",
    description: "Decentralized platform with cutting-edge blockchain integration and smart contracts",
    tags: ["Solidity", "Ethers.js", "IPFS"],
    stylePoints: "+78",
    year: "2023",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "Pulse Creative",
    category: "Portfolio",
    description: "Award-winning creative agency showcase with micro-interactions and immersive storytelling",
    tags: ["GSAP", "Framer", "Lenis"],
    stylePoints: "+95",
    year: "2023",
    color: "#f43f5e",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
      data-magnetic="true"
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30 bg-secondary/30 backdrop-blur-sm transition-all duration-700"
        style={{ transform: "translateZ(75px)" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
          style={{
            background: `radial-gradient(ellipse at 30% 0%, ${project.color}40 0%, transparent 50%)`,
          }}
        />

        {/* Animated noise texture */}
        <motion.div
          animate={{ backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Glare effect */}
        <motion.div
          style={{ x: glareX, y: glareY }}
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div
            className="absolute h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
        </motion.div>

        {/* RGB Glitch scanlines */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 79, 216, 0.02) 2px,
                    rgba(255, 79, 216, 0.02) 4px
                  )`,
                }}
              />
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-20 bg-linear-to-b from-transparent via-white/5 to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.15 }}
          className="absolute left-4 top-4 z-20 rounded-full border border-border/50 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm"
        >
          {project.year}
        </motion.div>

        {/* Style points badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
            rotate: isHovered ? 0 : -10,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute right-4 top-4 z-20 rounded-full px-3 py-1.5 font-mono text-xs font-bold text-background"
          style={{
            backgroundColor: "#ff4fd8",
            boxShadow: "0 0 20px rgba(255, 79, 216, 0.5)",
          }}
        >
          {project.stylePoints} style
        </motion.div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
          />

          <div className="relative z-10">
            {/* Category */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15 }}
              className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: project.color }}
            >
              {project.category}
            </motion.span>

            {/* Title with animated underline */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.15 }}
              className="group/title mb-3 text-2xl font-bold tracking-tight md:text-3xl"
            >
              <span className="relative inline-block">
                {project.title}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-1 left-0 h-0.5 w-full origin-left"
                  style={{ backgroundColor: "#ff4fd8" }}
                />
              </span>
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 0.7, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.15 }}
              className="mb-4 line-clamp-2 text-sm text-muted-foreground"
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 + index * 0.15 }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.15 + tagIndex * 0.05 }}
                  className="rounded-full border border-border/50 bg-secondary/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm transition-colors duration-300 hover:border-[#ff4fd8]/50"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Hover border glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: `0 0 40px ${project.color}30, inset 0 0 40px ${project.color}10`,
          }}
        />
      </motion.div>

      {/* Floating reflection */}
      <motion.div
        style={{ rotateX: "180deg", scaleY: 0.3 }}
        className="pointer-events-none absolute -bottom-4 left-0 right-0 h-full opacity-20 blur-sm"
      >
        <div
          className="h-full w-full rounded-2xl"
          style={{
            background: `linear-gradient(to top, ${project.color}20, transparent 50%)`,
            maskImage: "linear-gradient(to top, black, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="works" ref={sectionRef} className="relative min-h-screen px-6 py-32">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #ff4fd8 0%, transparent 70%)" }}
        />
      </div>

      {/* Section header */}
      <div className="mx-auto mb-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Label */}
          <div className="mb-6 flex items-center gap-4">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[1px]"
              style={{ backgroundColor: "#ff4fd8" }}
            />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Selected Works
            </span>
          </div>

          {/* Title with stagger */}
          <h2 className="text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-7xl">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                Projects that
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                style={{ color: "#ff4fd8" }}
              >
                hit different
              </motion.span>
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Projects grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2" style={{ perspective: "1500px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* View all CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-20 text-center"
      >
        <a
          href="#"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-border/50 px-8 py-4 font-mono text-sm uppercase tracking-wider transition-all duration-500 hover:border-transparent"
          data-magnetic="true"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
            View All Projects
          </span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative z-10 transition-colors duration-300 group-hover:text-background"
          >
            &rarr;
          </motion.span>
          <span
            className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0"
            style={{ backgroundColor: "#ff4fd8" }}
          />
        </a>
      </motion.div>
    </section>
  )
}
