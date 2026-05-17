"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Click sound ref
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load sound from public folder
    clickSound.current = new Audio("/sounds/click.mp3");

    // Optional volume
    clickSound.current.volume = 1;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseDown = () => {
      setClicked(true);

      // Play click sound
      if (clickSound.current) {
        clickSound.current.currentTime = 0;
        clickSound.current.play();
      }
    };

    const handleMouseUp = () => setClicked(false);

    const handleHide = () => setVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleHide);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleHide);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>
        {`* { cursor: none; }`}
      </style>

      {/* Cursor Container */}
      <div
        className={`fixed top-0 left-0 z-9999 pointer-events-none transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-transform duration-150 ease-out ${
            clicked ? "scale-75" : "scale-100"
          }`}
        >
          {/* Neon Glow */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-pink-500/60 scale-125 animate-pulse" />

          {/* SVG Cursor */}
          <img
            src="/cherry-blossom.svg"
            alt="cursor"
            draggable={false}
            className="relative w-12 h-12 select-none animate-spin filter drop-shadow-[0_0_18px_#ff4fd8]"
            style={{
              animationDuration: "6s",
            }}
          />
        </div>
      </div>
    </>
  );
}