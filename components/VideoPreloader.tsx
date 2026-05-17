"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface VideoPreloaderProps {
  onComplete: () => void;
}

export default function VideoPreloader({
  onComplete,
}: VideoPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [showLanguageSelect, setShowLanguageSelect] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Audio state
  const [isMuted, setIsMuted] = useState(true);

  // Video ref
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (!showLanguageSelect) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);

            setTimeout(() => {
              setIsExiting(true);
              setTimeout(onComplete, 800);
            }, 500);

            return 100;
          }

          return prev + Math.random() * 15 + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [showLanguageSelect, onComplete]);

  // Toggle mute/unmute
  const toggleSound = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (isMuted) {
      video.muted = false;
      video.volume = 0.2;

      try {
        await video.play();
      } catch (err) {
        console.log(err);
      }

      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleLanguageSelect = (lang: "en" | "ja") => {
    setLanguage(lang);
    setShowLanguageSelect(false);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden bg-[#0a0a0a]"
        >
          {/* Background Video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          {/* Mute / Unmute Button */}
          <button
            onClick={toggleSound}
            className="
              absolute
              bottom-6
              right-6
              z-50
              flex
              items-center
              justify-center
              rounded-full
              border
              border-pink-400/40
              bg-black/30
              p-4
              text-pink-300
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-110
              hover:border-pink-300
              hover:text-pink-200
              hover:shadow-[0_0_20px_#ff4fd8]
            "
          >
            {isMuted ? (
              <VolumeX size={22} />
            ) : (
              <Volume2 size={22} />
            )}
          </button>

          {/* Main Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            {showLanguageSelect ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-12"
              >
                <h1 className="font-mono text-2xl tracking-[0.3em] text-muted-foreground">
                  {t("preloader.wait")}
                </h1>

                <div className="flex gap-8">
                  <button
                    onClick={() => handleLanguageSelect("en")}
                    className={`group relative px-8 py-4 font-mono text-sm tracking-wider transition-all duration-300 ${
                      language === "en"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="relative z-10">ENGLISH</span>

                    <span className="absolute inset-0 border border-border transition-all duration-300 group-hover:border-foreground" />

                    <span className="absolute inset-0 scale-95 border border-transparent transition-all duration-300 group-hover:scale-100 group-hover:border-pink-400" />
                  </button>

                  <button
                    onClick={() => handleLanguageSelect("ja")}
                    className={`group relative px-8 py-4 font-mono text-sm tracking-wider transition-all duration-300 ${
                      language === "ja"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="relative z-10">日本語</span>

                    <span className="absolute inset-0 border border-border transition-all duration-300 group-hover:border-foreground" />

                    <span className="absolute inset-0 scale-95 border border-transparent transition-all duration-300 group-hover:scale-100 group-hover:border-pink-400" />
                  </button>
                </div>

                <p className="mt-8 font-mono text-xs text-muted-foreground/50">
                  SELECT YOUR LANGUAGE
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="relative">
                  <span className="font-mono text-8xl font-light tabular-nums tracking-tighter text-foreground md:text-9xl">
                    {Math.min(Math.floor(progress), 100)}
                  </span>

                  <span className="absolute -right-8 top-0 font-mono text-2xl text-muted-foreground">
                    %
                  </span>
                </div>

                <div className="w-64">
                  <div className="h-px w-full bg-border">
                    <motion.div
                      className="h-full bg-pink-400"
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${Math.min(progress, 100)}%`,
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                  {t("preloader.loading")}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}