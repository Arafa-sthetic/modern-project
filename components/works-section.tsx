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
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    category: "Web Application",
    description:
      "A futuristic analytics dashboard with real-time data visualization and AI-powered insights",
    tags: ["React", "Three.js", "WebGL"],
    stylePoints: "+87",
    year: "2024",
    color: "#6366f1",
    image: "/images/nebula.png",
  },
  {
    id: 2,
    title: "Aurora Commerce",
    category: "E-Commerce",
    description:
      "Premium shopping experience with immersive product showcases and AR try-on features",
    tags: ["Next.js", "Stripe", "Prisma"],
    stylePoints: "+92",
    year: "2024",
    color: "#8b5cf6",
    image: "/images/aurora.jpg",
  },
  {
    id: 3,
    title: "Cipher Protocol",
    category: "Web3",
    description:
      "Decentralized platform with cutting-edge blockchain integration and smart contracts",
    tags: ["Solidity", "Ethers.js", "IPFS"],
    stylePoints: "+78",
    year: "2023",
    color: "#06b6d4",
    image: "/images/cipher.jpg",
  },
  {
    id: 4,
    title: "Pulse Creative",
    category: "Portfolio",
    description:
      "Award-winning creative agency showcase with micro-interactions and immersive storytelling",
    tags: ["GSAP", "Framer", "Lenis"],
    stylePoints: "+95",
    year: "2023",
    color: "#f43f5e",
    image: "/images/pulse.jpg",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(cardRef, {
    once: true,
    margin: "-50px",
  })

  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, {
    stiffness: 300,
    damping: 30,
  })

  const mouseYSpring = useSpring(y, {
    stiffness: 300,
    damping: 30,
  })

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["12deg", "-12deg"]
  )

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-12deg", "12deg"]
  )

  const glareX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["0%", "100%"]
  )

  const glareY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["0%", "100%"]
  )

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
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
      initial={{
        opacity: 0,
        y: 100,
        rotateX: 15,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
            }
          : {}
      }
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
    >
      <motion.div
        className="
          relative
          aspect-4/3
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-black/30
          transition-all
          duration-700
        "
        style={{
          transform: "translateZ(75px)",
        }}
        whileHover={{
          scale: 1.02,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-black/40" />

        <div
          className="
            absolute
            inset-0
            bg-[#ff4fd8]/10
            mix-blend-overlay
          "
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        <div
          className="
            absolute
            inset-0
            opacity-30
            transition-opacity
            duration-500
            group-hover:opacity-50
          "
          style={{
            background: `radial-gradient(
              ellipse at 30% 0%,
              ${project.color}40 0%,
              transparent 50%
            )`,
          }}
        />

        <motion.div
          animate={{
            backgroundPosition: isHovered
              ? ["0% 0%", "100% 100%"]
              : "0% 0%",
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-0
            opacity-[0.02]
          "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          style={{
            x: glareX,
            y: glareY,
          }}
          className="
            pointer-events-none
            absolute
            -inset-px
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <div
            className="
              absolute
              h-[200%]
              w-[200%]
              -translate-x-1/2
              -translate-y-1/2
            "
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
        </motion.div>

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
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255, 79, 216, 0.02) 2px,
                      rgba(255, 79, 216, 0.02) 4px
                    )
                  `,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="
            absolute
            left-4
            top-4
            z-20
            rounded-full
            border
            border-white/20
            bg-black/60
            px-3
            py-1
            font-mono
            text-[10px]
            uppercase
            tracking-wider
            backdrop-blur-md
          "
        >
          {project.year}
        </div>

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            justify-end
            p-6
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-linear-to-t
              from-black
              via-black/50
              to-transparent
            "
          />

          <div className="relative z-10">
            <span
              className="
                mb-2
                inline-block
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
              "
              style={{
                color: project.color,
              }}
            >
              {project.category}
            </span>

            <h3
              className="
                mb-3
                text-2xl
                font-bold
                tracking-tight
                md:text-3xl
              "
            >
              {project.title}
            </h3>

            <p
              className="
                mb-4
                line-clamp-2
                text-sm
                text-white/70
              "
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border
                    border-white/20
                    bg-black/40
                    px-2.5
                    py-1
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-wider
                    backdrop-blur-md
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function WorksSection() {
  return (
    <section
      id="works"
      className="
        relative
        min-h-screen
        px-6
        py-32
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* ABOUT SECTION */}
        <section
          className="
            relative
            mb-32
            grid
            items-center
            gap-14
            md:grid-cols-2
          "
        >
          {/* IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
              "
            >
              <img
                src="/images/me-about.jpeg"
                alt="About"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/20" />

              <div
                className="
                  absolute
                  inset-0
                  bg-[#ff4fd8]/10
                  mix-blend-overlay
                "
              />
            </div>

            <div
              className="
                absolute
                -inset-2
                -z-10
                rounded-3xl
                blur-2xl
                opacity-40
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(255,79,216,0.4), transparent 70%)",
              }}
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
          >
            <span
              className="
                font-mono
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#ff4fd8]
              "
            >
              About Me
            </span>

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                uppercase
                leading-tight
                md:text-6xl
              "
            >
              Creative Developer <br />
              & Visual Designer
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                text-white/70
                leading-relaxed
              "
            >
              I create immersive digital experiences with
              modern UI, cinematic animations and futuristic
              aesthetics.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Next.js",
                "Framer Motion",
                "Tailwind",
                "UI/UX",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2
                    text-sm
                    backdrop-blur-md
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* HEADER */}
        <div className="mb-20">
          <span
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.3em]
              text-white/50
            "
          >
            Selected Works
          </span>

          <h2
            className="
              mt-6
              text-5xl
              font-bold
              uppercase
              md:text-7xl
            "
          >
            Projects that{" "}
            <span className="text-[#ff4fd8]">
              hit different
            </span>
          </h2>
        </div>

        {/* PROJECT GRID */}
        <div
          className="
            grid
            gap-8
            md:grid-cols-2
          "
          style={{
            perspective: "1500px",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}