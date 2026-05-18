"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.volume = 0.25;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log(err);
      }
    };

    playVideo();

    // MOBILE BLACK FLASH FIX
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        video.play().catch(() => {});
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  const toggleMute = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (isMuted) {
        video.muted = false;
        video.volume = 0.25;

        await video.play();

        setIsMuted(false);
      } else {
        video.muted = true;

        setIsMuted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="
          fixed
          top-0
          left-0
          z-0
          h-screen
          w-screen
          object-cover
          pointer-events-none
        "
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
        }}
      >
        <source src="/videos/bg-tree.mp4" type="video/mp4" />
      </video>

      {/* SOUND BUTTON */}
      <button
        onClick={toggleMute}
        className="
          fixed
          bottom-6
          right-6
          z-[999999]
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-pink-500/40
          bg-black/40
          text-pink-300
          backdrop-blur-md
          transition-all
          duration-300
          hover:scale-110
          hover:border-pink-400
          hover:text-pink-200
        "
      >
        {isMuted ? <VolumeX size={26} /> : <Volume2 size={26} />}
      </button>
    </>
  );
}