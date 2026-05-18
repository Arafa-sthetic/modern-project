"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // 🛠️ useEffect ইম্পোর্ট করুন
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // 🛠️ শুরুতেই এরর এড়াতে ডিফল্ট false রাখুন
  const [isDesktopOpen, setIsDesktopOpen] = useState(false); 
  const [isMounted, setIsMounted] = useState(false); // 🛠️ মাউন্টেড স্টেট ট্র্যাক করুন
  
  const { t, language, setLanguage } = useLanguage();

  // 🛠️ পেজটি ব্রাউজারে লোড হওয়ার পর ডেক্সটপ মেনু ট্রু করে দিন
  useEffect(() => {
    setIsMounted(true);
    setIsDesktopOpen(true);
  }, []);

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/works", label: t("nav.works") },
    { href: "/tech", label: t("nav.tech") },
    { href: "/contact", label: t("nav.contact") },
  ];

  // 🛠️ সার্ভার রেন্ডারিং এর সময় যদি মাউন্ট না হয়, তবে হাইড্রোশন এরর ঠেকাতে শুরুতে ব্ল্যাঙ্ক রাখুন
  if (!isMounted) return null;

  return (
    <>
      {/* 🛠️ ডেক্সটপ ট্রিগার বাতন */}
      <AnimatePresence>
        {!isDesktopOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsDesktopOpen(true)}
            className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center justify-center p-3 rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors lg:flex"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 🛠️ ডেক্সটপ নেভিগেশন */}
      <motion.nav
        initial={{ x: "-150%", y: "-50%" }} // 🛠️ শুরুতে স্ক্রিনের বাইরে রাখুন
        animate={{ 
          x: isDesktopOpen ? 0 : "-150%", 
          y: "-50%" 
        }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="fixed left-8 top-1/2 z-40 hidden flex-col gap-6 lg:flex bg-[#0a0a0a]/40 backdrop-blur-md p-6 rounded-2xl border border-white/3"
      >
        <button
          onClick={() => setIsDesktopOpen(false)}
          className="self-start mb-2 p-1 rounded-md border border-white/5 bg-white/2 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          aria-label="Hide navigation"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsDesktopOpen(false)}
            className="group flex items-center gap-4"
          >
            <span
              className={`h-px transition-all duration-300 ${
                pathname === link.href
                  ? "w-8 bg-accent"
                  : "w-4 bg-muted-foreground group-hover:w-8 group-hover:bg-foreground"
              }`}
            />
            <span
              className={`font-mono text-xs tracking-wider transition-all duration-300 ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {link.label}
            </span>
          </Link>
        ))}
        
        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === "en" ? "ja" : "en")}
          className="mt-4 flex items-center gap-4 group"
        >
          <span className="h-px w-4 bg-muted-foreground transition-all duration-300 group-hover:w-8 group-hover:bg-accent" />
          <span className="font-mono text-xs tracking-wider text-muted-foreground transition-all duration-300 group-hover:text-foreground">
            {language === "en" ? "日本語" : "EN"}
          </span>
        </button>
      </motion.nav>

      {/* 📱 মোবাইল মেনু বাটন ও ড্রয়ার (অপরিবর্তিত) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-6 z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 lg:hidden"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
          className="h-px w-6 bg-foreground"
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="h-px w-6 bg-foreground"
        />
        <motion.span
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
          className="h-px w-6 bg-foreground"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-sm lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-mono text-2xl tracking-wider transition-colors duration-300 ${
                      pathname === link.href ? "text-accent" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setLanguage(language === "en" ? "ja" : "en");
                  setIsOpen(false);
                }}
                className="mt-8 font-mono text-sm tracking-wider text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {language === "en" ? "Switch to 日本語" : "Switch to English"}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
