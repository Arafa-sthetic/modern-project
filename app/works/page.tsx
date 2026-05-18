"use client";

import { useState } from "react";
import { MagneticCursor } from "@/components/magnetic-cursor";
import { Navigation } from "@/components/nav";
import { HeroSection } from "@/components/hero-section";
import { WorksSection } from "@/components/works-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // 🛑 পুরো বডি বা রুটকে পিওর ব্ল্যাক রাখার জন্য bg-black এবং টেক্সট সাদা করা হয়েছে
    <div className="min-h-screen bg-black text-white selection:bg-pink-500 selection:text-black">
      
      <MagneticCursor />
      <Navigation />
      <main className="relative overflow-hidden bg-black">
        <HeroSection />
        <WorksSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}