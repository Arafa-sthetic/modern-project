"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import Header, { FooterLeft, FooterRight } from "@/components/header"
import Overlays from "@/components/overlays"
import FloatingLabels from "@/components/floating-labels"

// Dynamic imports for heavy components
const TextTunnel = dynamic(() => import("@/components/text-tunnel"), { 
  ssr: false,
  loading: () => <div className="w-full h-screen" />
})
const SmokeParticles = dynamic(() => import("@/components/smoke-particles"), { 
  ssr: false 
})
const LiveCamCard = dynamic(() => import("@/components/live-cam-card"), { 
  ssr: false 
})
const Ticker = dynamic(() => import("@/components/ticker"), { 
  ssr: false 
})
const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"), { 
  ssr: false 
})

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-black overflow-hidden">
        {/* Background smoke particles */}
        <Suspense fallback={null}>
          <SmokeParticles />
        </Suspense>
        
        {/* Visual overlays (noise, vignette, fog) */}
        <Overlays />
        
        {/* Header with name */}
        <Header />
        
        {/* Live cam card */}
        <Suspense fallback={null}>
          <LiveCamCard />
        </Suspense>
        
        {/* Main hero section with 3D text tunnel */}
        <section className="relative w-full h-screen flex items-center justify-center">
          <Suspense fallback={null}>
            <TextTunnel />
          </Suspense>
        </section>
        
        {/* Floating UI labels */}
        <FloatingLabels />
        
        {/* Footer elements */}
        <FooterLeft />
        <FooterRight />
        
        {/* Bottom ticker */}
        <Suspense fallback={null}>
          <Ticker />
        </Suspense>
      </main>
    </SmoothScroll>
  )
}
