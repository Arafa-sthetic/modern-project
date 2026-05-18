import type { Metadata } from 'next'
import { Geist, Geist_Mono, Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

const oswald = Oswald({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald'
})

export const metadata: Metadata = {
  title: 'ARAF AHMED | Creative Developer & Designer',
  description: 'Award-winning creative developer and visual identity designer. CSSDA, Awwwards & Muzli recognized. Creating experimental digital experiences.',
  keywords: ['creative developer', 'web design', 'visual identity', 'awwwards', 'cssda', 'portfolio'],
  authors: [{ name: 'Araf Ahmed' }],
  openGraph: {
    title: 'ARAF AHMED | Creative Developer',
    description: 'Award-winning creative developer and visual identity designer',
    type: 'website',
  },
}

export default function TechLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // html এবং body বাদ দিয়ে আমরা একটি সাধারণ div বা fragment ব্যবহার করব
    // ফন্ট ভ্যারিয়েবলগুলো এই ডিভের ক্লাসে দিয়ে দিচ্ছি যেন ভেতরের সব পেজ এই ফন্টগুলো পায়
    <div className={`${geist.variable} ${geistMono.variable} ${oswald.variable} font-sans bg-black text-white min-h-screen relative overflow-x-hidden`}>
      {children}
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </div>
  )
}