"use client";

import { useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import VideoPreloader from "@/components/VideoPreloader";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor"; // 👈 ১. কাস্টম কার্সার কম্পোনেন্ট ইমপোর্ট করলেন
import dynamic from "next/dynamic";

const SakuraCanvas = dynamic(() => import("@/components/SakuraCanvas"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      {isLoading && <VideoPreloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <CustomCursor /> {/* 👈 ২. এখানে কাস্টম কার্সার বসিয়ে দেওয়া হলো */}
          <SakuraCanvas />
          <Navigation />
          <main className="relative z-20">{children}</main>
        </>
      )}
    </LanguageProvider>
  );
}