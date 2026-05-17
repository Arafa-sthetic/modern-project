"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

interface Project {
  id: number;
  titleKey: string;
  hoverKey: string;
  description: string;
  tech: string[];
  year: string;
  image?: string; // Optional: To match cinematic image layout
}

// আপনার ডাটা স্ট্রাকচার (রুট পেজে থাকার কথা, এখানে কপি করে আনবেন)
const projects: Project[] = [
  {
    id: 1,
    titleKey: "works.cosmos",
    hoverKey: "works.hover1",
    description: "Immersive 3D space exploration experience with particle systems and custom shaders.",
    tech: ["Three.js", "WebGL", "GSAP"],
    year: "2024",
    image: "/project-cosmos.jpg" // এখানে আপনার ভিডিও বা ইমেজের পাথ দিন
  },
  {
    id: 2,
    titleKey: "works.rejouice",
    hoverKey: "works.hover2",
    description: "Award-winning agency website clone with smooth scroll animations and video integration.",
    tech: ["React", "Locomotive Scroll", "Framer Motion"],
    year: "2024",
    image: "/project-rejouice.jpg" // এখানে আপনার ভিডিও বা ইমেজের পাথ দিন
  },
  {
    id: 3,
    titleKey: "works.trionn",
    hoverKey: "works.hover3",
    description: "Portfolio showcase with magnetic cursor effects and page transitions.",
    tech: ["Next.js", "GSAP", "Tailwind CSS"],
    year: "2023",
    image: "/project-trionn.jpg" // এখানে আপনার ভিডিও বা ইমেজের পাথ দিন
  },
  {
    id: 4,
    titleKey: "works.twogood",
    hoverKey: "works.hover4",
    description: "E-commerce experience with product parallax and micro-interactions.",
    tech: ["React", "Three.js", "Stripe"],
    year: "2023",
    image: "/project-twogood.jpg" // এখানে আপনার ভিডিও বা ইমেজের পাথ দিন
  },
];

export default function WorksSection() {
  const { t } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="works" className="relative min-h-[200vh] bg-transparent pt-32 pb-48 px-6 lg:px-24 overflow-hidden text-white">
      
      {/* 🛑 সিনেমাটিক ফিক্সড ব্যাকগ্রাউন্ড টেক্সট (রেফারেন্স অনুযায়ী) */}
      <div className="pointer-events-none fixed inset-0 z-0 h-screen flex justify-between items-end p-12 lg:p-24 pb-32">
        {/* I BUILT IT */}
        <p className="font-sans font-extrabold uppercase text-[12vw] lg:text-[10vw] leading-none text-white drop-shadow-[0_0_20px_#ff4fd8] opacity-10">
          I BUILT IT
        </p>
        
        {/* NO CAP */}
        <p className="font-sans font-extrabold uppercase text-[12vw] lg:text-[10vw] leading-none text-white drop-shadow-[0_0_20px_#ff4fd8] opacity-10">
          NO CAP
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header - Minimalist */}
        <div className="mb-24 lg:mb-32">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-4xl font-bold tracking-tighter text-pink-300 md:text-5xl lg:text-6xl drop-shadow-[0_0_10px_rgba(255,183,197,0.4)]"
          >
            {t("works.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground"
          >
            {t("works.subtitle")}
          </motion.p>
        </div>

        {/* 🛑 সিনেমাটিক কার্ড গ্রিড (রেফারেন্স অনুযায়ী ডিস্টোর্টেড লেআউট) */}
        <div className="space-y-48">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: index % 2 === 0 ? 5 : -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className="flex flex-col gap-12 lg:flex-row lg:items-end">
                {/* 🛑 Project Image - সিনেমাটিক বাঁকানো (Wavy) স্টাইল */}
                <div className="relative aspect-16/10 w-full lg:w-[45%] shrink-0 overflow-hidden transform group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(255,183,197,0.2)]">
                  {/* গ্লিচ ইফেক্ট Overlay */}
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-[url('/glitch-overlay.gif')] bg-cover mix-blend-screen" />
                  </div>
                  
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={t(project.titleKey)} 
                      className="w-full h-full object-cover rounded-lg group-hover:mix-blend-luminosity" 
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary/50 flex items-center justify-center rounded-lg border border-border">
                      <p className="font-mono text-xs text-muted-foreground/30">Missing Project Media</p>
                    </div>
                  )}
                </div>

                {/* Project Info - Minimalist Text */}
                <div className="flex-1 pb-4 lg:pb-0">
                  <div className="mb-3 flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/50">
                      {project.year}
                    </span>
                  </div>
                  
                  <h2 className="mb-4 text-3xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-pink-200 group-hover:drop-shadow-[0_0_10px_rgba(255,183,197,0.8)] md:text-4xl lg:text-5xl uppercase cursor-none">
                    {t(project.titleKey)}
                  </h2>
                  
                  <p className="mb-6 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground md:text-sm cursor-none">
                    {project.description}
                  </p>

                  {/* Tech Stack - Witty Message গ্লিচ ইফেক্টসহ */}
                  <div className="relative flex flex-wrap gap-x-6 gap-y-2 mt-4 cursor-none">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs tracking-wide text-muted-foreground/80 transition-colors duration-300 group-hover:text-pink-300"
                      >
                        {tech}
                      </span>
                    ))}
                    
                    {/* Hover State Witty Message - রেফারেন্সের পিঙ্ক সার্কেলের মতো গ্লো */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        scale: hoveredProject === project.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute -right-12 -top-16 pointer-events-none z-30"
                    >
                      <span className="rounded-full bg-pink-400 px-5 py-2.5 font-sans font-bold uppercase text-[0.6rem] tracking-wider text-pink-950 shadow-[0_0_30px_rgba(255,105,180,0.8)] cursor-none">
                        {t(project.hoverKey)}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Arrow Indicator - গ্লিচ */}
              <div className="absolute right-6 top-6 opacity-0 transition-all duration-300 group-hover:opacity-100 cursor-none drop-shadow-[0_0_10px_rgba(255,183,197,0.8)]">
                <svg
                  className="h-7 w-7 text-pink-300 group-hover:animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-48 text-center font-mono text-xs text-muted-foreground/30 uppercase tracking-[0.2em]"
        >
          {/* জাপানিজ টেক্সট matching the aesthetic */}
          未来のプロジェクトは準備中です... More projects coming soon...
        </motion.p>
      </div>
    </section>
  );
}