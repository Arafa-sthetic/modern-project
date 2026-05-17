"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const socials = [
  { name: "LinkedIn", url: "https://linkedin.com", command: "linkedin --connect" },
  { name: "Discord", url: "https://discord.com", command: "discord --join" },
  { name: "X (Twitter)", url: "https://x.com", command: "x --follow" },
  { name: "GitHub", url: "https://github.com", command: "gh --profile" },
];

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-24 lg:px-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-full max-w-6xl"
      >
        {/* Main Headline */}
        <div className="mb-16 lg:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-2 text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl xl:text-9xl"
          >
            {t("contact.title")}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl font-bold tracking-tight text-muted-foreground md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t("contact.subtitle")}
          </motion.h2>
        </div>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 border border-border px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-xs tracking-wide text-muted-foreground">
              {t("contact.available")}
            </span>
          </div>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <a
            href="mailto:hello@ameen.dev"
            className="group inline-flex items-center gap-4 transition-all duration-300"
          >
            <span className="font-mono text-xs text-muted-foreground">
              email:
            </span>
            <span className="font-mono text-lg text-foreground underline decoration-border underline-offset-4 transition-all duration-300 group-hover:decoration-accent md:text-2xl">
              {t("contact.email")}
            </span>
          </a>
        </motion.div>

        {/* Terminal Style Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border border-border bg-card/20"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/50" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <span className="h-3 w-3 rounded-full bg-green-500/50" />
            <span className="ml-4 font-mono text-xs text-muted-foreground">
              ~/socials
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-6">
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 1 }}
                className="group mb-4 flex items-center gap-4 last:mb-0"
              >
                <span className="font-mono text-accent">$</span>
                <span className="font-mono text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {social.command}
                </span>
                <span className="font-mono text-xs text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  # opens {social.name}
                </span>
              </motion.a>
            ))}
            
            {/* Cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-6 flex items-center gap-2"
            >
              <span className="font-mono text-accent">$</span>
              <span className="h-4 w-2 animate-pulse bg-foreground" />
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 font-mono text-xs text-muted-foreground/30"
        >
          &copy; {new Date().getFullYear()} aMeeN abdUllah. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
