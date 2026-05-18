"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useWillChange,
} from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const [isMounted, setIsMounted] = useState(false);

  // Smooth animation optimization
  const willChange = useWillChange();

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll indicator fade
  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    [1, 0]
  );

  // Cinematic text animations
  const opacity1 = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.45],
    [0, 1, 0]
  );

  const opacity2 = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.75],
    [0, 1, 0]
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0.75, 0.88, 0.98],
    [0, 1, 0]
  );

  return (
    <div className="relative z-10 min-h-[400vh] bg-transparent text-white">

      {/* HERO SECTION */}
      <section className="sticky top-0 z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 lg:px-24">

        {/* Scroll Indicator */}
        {isMounted && (
          <motion.div
            style={{
              opacity: indicatorOpacity,
              willChange,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 z-20 flex flex-col items-center gap-4"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-white-400 drop-shadow-[0_0_10px_#ff4fd8] animate-pulse">
  {t("home.scroll")}
</span>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="h-12 w-px bg-linear-to-b from-transparent via-muted-foreground/50 to-transparent"
            />
          </motion.div>
        )}
      </section>

      {/* CINEMATIC TEXT 1 */}
      {isMounted && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
          <motion.p
            style={{
              opacity: opacity1,
              willChange,
            }}
            className="
              max-w-3xl
              px-6
              text-center
              font-mono
              text-2xl
              leading-relaxed
              tracking-wide
              text-white
              drop-shadow-[0_0_15px_rgba(255,183,197,0.3)]
              transform-gpu
              md:text-4xl
            "
          >
            {t("home.cinematic1")}
          </motion.p>
        </div>
      )}

      {/* CINEMATIC TEXT 2 */}
      {isMounted && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
          <motion.p
            style={{
              opacity: opacity2,
              willChange,
            }}
            className="
              max-w-3xl
              px-6
              text-center
              font-mono
              text-2xl
              leading-relaxed
              tracking-wide
              text-pink-400
              drop-shadow-[0_0_25px_rgba(255,105,180,0.5)]
              transform-gpu
              md:text-4xl
            "
          >
            {t("home.cinematic2")}
          </motion.p>
        </div>
      )}

      {/* CINEMATIC TEXT 3 */}
      {isMounted && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
          <motion.p
            style={{
              opacity: opacity3,
              willChange,
            }}
            className="
              max-w-3xl
              px-6
              text-center
              font-mono
              text-2xl
              leading-relaxed
              tracking-wide
              text-white
              drop-shadow-[0_0_15px_rgba(255,183,197,0.3)]
              transform-gpu
              md:text-4xl
            "
          >
            {t("home.cinematic3")}
          </motion.p>
        </div>
      )}

      {/* SCROLL SPACERS */}
      <section className="h-screen" />
      <section className="h-screen" />
      <section className="h-screen" />
    </div>
  );
}