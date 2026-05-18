"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  const socials = [
    { name: "GitHub", url: "#", icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )},
    { name: "Twitter", url: "#", icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )},
    { name: "LinkedIn", url: "#", icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )},
    { name: "Dribbble", url: "#", icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
      </svg>
    )},
  ]

  const inputFields = [
    { name: "name", label: "Your Name", type: "text" },
    { name: "email", label: "Your Email", type: "email" },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen overflow-hidden px-6 py-32">
      {/* Animated background text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <motion.span
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap font-mono text-[15vw] font-black uppercase tracking-tighter text-foreground/2]"
        >
          {"LET'S TALK • LET'S TALK • LET'S TALK •"}
        </motion.span>
      </motion.div>

      {/* Floating gradient orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff4fd8 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ y: [0, 40, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00ffff 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#ff4fd8]/30 bg-[#ff4fd8]/10"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ✉
            </motion.span>
          </motion.div>

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Get In Touch
          </span>

          <h2 className="mt-4 text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-7xl">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {"Let's Create"}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                style={{ color: "#ff4fd8" }}
              >
                Something Epic
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-lg text-muted-foreground"
          >
            Have a project in mind? {"I'd"} love to hear about it. Drop me a line
            and {"let's"} bring your vision to life.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {inputFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group relative"
              >
                <motion.label
                  animate={{
                    y: focusedField === field.name || formData[field.name as keyof typeof formData] ? -28 : 0,
                    scale: focusedField === field.name || formData[field.name as keyof typeof formData] ? 0.8 : 1,
                    color: focusedField === field.name ? "#ff4fd8" : "rgb(161 161 170)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none absolute left-0 top-4 origin-left font-mono text-sm uppercase tracking-wider"
                >
                  {field.label}
                </motion.label>
                <input
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className="w-full border-b-2 border-border bg-transparent py-4 text-lg outline-none transition-all duration-300 focus:border-[#ff4fd8]"
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                  style={{ backgroundColor: "#ff4fd8" }}
                />
              </motion.div>
            ))}

            {/* Message field */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group relative"
            >
              <motion.label
                animate={{
                  y: focusedField === "message" || formData.message ? -28 : 0,
                  scale: focusedField === "message" || formData.message ? 0.8 : 1,
                  color: focusedField === "message" ? "#ff4fd8" : "rgb(161 161 170)",
                }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute left-0 top-4 origin-left font-mono text-sm uppercase tracking-wider"
              >
                Your Message
              </motion.label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="w-full resize-none border-b-2 border-border bg-transparent py-4 text-lg outline-none transition-all duration-300 focus:border-[#ff4fd8]"
              />
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                style={{ backgroundColor: "#ff4fd8" }}
              />
            </motion.div>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden rounded-full px-12 py-4 font-mono text-sm uppercase tracking-wider"
                style={{
                  backgroundColor: "#ff4fd8",
                  boxShadow: "0 0 40px rgba(255, 79, 216, 0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(255, 79, 216, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                data-magnetic="true"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative z-10 flex items-center gap-2 text-background"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-background border-t-transparent"
                      />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative z-10 flex items-center gap-2 text-background transition-transform group-hover:translate-x-1"
                    >
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.span
                  className="absolute inset-0 bg-foreground"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Right side - Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* Email CTA with hover effect */}
            <div className="rounded-2xl border border-border/30 bg-secondary/10 p-8 backdrop-blur-sm">
              <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Drop me an email
              </span>
              <motion.a
                href="mailto:hello@example.com"
                className="group relative inline-block text-2xl font-bold md:text-3xl"
                whileHover={{ x: 5 }}
                data-magnetic="true"
              >
                <span className="relative">
                  hello@example.com
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: "#ff4fd8" }}
                  />
                </span>
              </motion.a>

              <div className="mt-6 border-t border-border/30 pt-6">
                <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Or give me a call
                </span>
                <motion.a
                  href="tel:+1234567890"
                  className="text-lg font-medium transition-colors hover:text-[#ff4fd8]"
                  data-magnetic="true"
                >
                  +1 (234) 567-890
                </motion.a>
              </div>
            </div>

            {/* Social links with staggered animation */}
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Follow me
              </span>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-border/50 px-5 py-3 transition-all duration-300 hover:border-[#ff4fd8]/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-magnetic="true"
                  >
                    <motion.span
                      className="text-muted-foreground transition-colors group-hover:text-[#ff4fd8]"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {social.icon}
                    </motion.span>
                    <span className="font-mono text-sm uppercase tracking-wider transition-colors group-hover:text-[#ff4fd8]">
                      {social.name}
                    </span>
                    <motion.div
                      className="absolute inset-0 -z-10 bg-[#ff4fd8]/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Location info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center gap-4 rounded-xl border border-border/30 bg-secondary/10 p-4 backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4fd8]/10">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📍
                </motion.span>
              </div>
              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Based in
                </span>
                <span className="font-medium">San Francisco, CA</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
