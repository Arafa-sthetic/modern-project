"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const techStack = [
  {
    name: "WebGL",
    description: "Low-level graphics API for rendering 2D and 3D content in browsers without plugins.",
    icon: "◈",
  },
  {
    name: "GSAP",
    description: "Professional-grade animation library with timeline control and physics-based motion.",
    icon: "◇",
  },
  {
    name: "Shaders",
    description: "GPU programs that manipulate vertices and pixels for custom visual effects.",
    icon: "◆",
  },
  {
    name: "THREE.js",
    description: "3D library that makes WebGL accessible with scene graphs and built-in primitives.",
    icon: "◉",
  },
];

const reasons = [
  {
    code: "document.createElement('div')",
    reason: "doesn't make things spin in 3D space.",
  },
  {
    code: "setTimeout()",
    reason: "isn't smooth enough for 60fps buttery animations.",
  },
  {
    code: "CSS transforms",
    reason: "can't bend reality like vertex shaders do.",
  },
  {
    code: "innerHTML",
    reason: "won't render 100,000 particles without melting your CPU.",
  },
];

export default function TechPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen px-6 py-24 lg:px-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-6xl"
      >
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            {t("tech.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-mono text-sm tracking-wide text-muted-foreground md:text-base"
          >
            {t("tech.subtitle")}
          </motion.p>
        </div>

        {/* Tech Stack Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16 lg:mb-24"
        >
          <div className="mb-8 font-mono text-lg text-muted-foreground md:text-xl">
            {"{ "}
            {techStack.map((tech, index) => (
              <span key={tech.name}>
                <span className="text-accent">{tech.name}</span>
                {index < techStack.length - 1 && ", "}
              </span>
            ))}
            {" }"}
          </div>
        </motion.div>

        {/* Tech Grid */}
        <div className="mb-24 grid gap-6 md:grid-cols-2">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index + 0.6 }}
              className="group relative border border-border bg-card/30 p-6 transition-all duration-500 hover:border-accent/50 hover:bg-card/50 lg:p-8"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="text-2xl text-accent">{tech.icon}</span>
                <h3 className="font-mono text-xl tracking-wide text-foreground">
                  {tech.name}
                </h3>
              </div>
              <p className="font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
                {tech.description}
              </p>
              
              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Why Plain JS Doesn't Cut It */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="mb-8 font-mono text-lg text-foreground md:text-xl">
            {t("tech.why")}
          </h2>
          
          <div className="space-y-6">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 1.2 }}
                className="flex flex-col gap-2 border-l-2 border-border py-2 pl-6 transition-all duration-300 hover:border-accent sm:flex-row sm:items-center sm:gap-4"
              >
                <code className="font-mono text-sm text-accent">
                  {item.code}
                </code>
                <span className="font-mono text-xs text-muted-foreground md:text-sm">
                  {item.reason}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Terminal Style Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-24 border border-border bg-card/20 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/50" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <span className="h-3 w-3 rounded-full bg-green-500/50" />
          </div>
          <pre className="overflow-x-auto font-mono text-xs text-muted-foreground md:text-sm">
            <code>
              <span className="text-accent">$</span> npm run build-something-crazy
              {"\n"}
              <span className="text-muted-foreground/50"># Compiling shaders...</span>
              {"\n"}
              <span className="text-muted-foreground/50"># Optimizing WebGL context...</span>
              {"\n"}
              <span className="text-green-500">✓ Ready to blow minds</span>
            </code>
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
}
