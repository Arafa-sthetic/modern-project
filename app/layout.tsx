import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import ClientLayout from "@/components/ClientLayout";
import BackgroundVideo from "@/components/BackgroundVideo";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Araf Ahmed | Creative Developer",
  description:
    "Where Front-End Gets Real. The 1% of Population who actually makes crazy WebGL experiences.",
  keywords: ["WebGL", "Creative Developer", "Three.js", "GSAP", "Front-End"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#0a0a0a]">
      <body className="font-sans antialiased overflow-x-hidden">
        
        {/* Global Background Video */}
        <BackgroundVideo />

        {/* Main App */}
        <ClientLayout>{children}</ClientLayout>

        {/* Analytics */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}