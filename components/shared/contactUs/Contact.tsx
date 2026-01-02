"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock, FaWhatsapp, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { toast } from "sonner"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function ContactUs() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send data to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      // Get response text first
      const responseText = await response.text()
      
      // Then try to parse as JSON if possible
      let data
      try {
        data = responseText ? JSON.parse(responseText) : {}
      } catch (jsonError) {
        console.error("Error parsing response as JSON:", jsonError, "Response was:", responseText)
        throw new Error("Invalid server response")
      }

      if (!response.ok) {
        throw new Error(data?.error || `Request failed with status: ${response.status}`)
      }

      // Handle success
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      })
      
      setIsSubmitted(true)
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    } catch (err) {
      console.error("Form submission error:", err)
      toast.error("Failed to send message", { 
        description: err instanceof Error ? err.message : 'An unexpected error occurred'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black font-sans overflow-hidden">
      {/* Parallax background with concert image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          className="h-full w-full"
        >
          <Image
            src="/images/contact-us.png"
            alt="Concert Stage at Sunset"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
            quality={100}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="flex flex-col items-center text-center mb-12 md:mb-16" variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl lg:mt-8 lg:text-6xl font-bold bg-gradient-to-r from-gray-200 via-gray-100 to-white bg-clip-text text-transparent mb-4">
              Get In Touch
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg md:text-xl">
              Let us help you create an unforgettable event experience
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12" variants={containerVariants}>
            {/* Contact info section */}
            <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
              <div className="bg-zinc-900/60 backdrop-blur-md p-6 md:p-8 border border-zinc-800/50 shadow-xl">
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  <span className="font-bold text-gray-200">Event Parlour</span> - event platform for everyone.
                  Contact our dedicated support team for inquiries regarding our services.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: FaMapMarkerAlt, text: "Nairobi, Kenya", link: null },
                    { icon: FaEnvelope, text: "hello@eventparlour.com", link: "mailto:hello@eventparlour.com" },
                    { icon: FaPhone, text: "+254 791 482 626", link: "tel:+254791482626" },
                    { icon: FaClock, text: "Open - 24 hrs", link: null },
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link || undefined}
                      className={`group flex items-center space-x-4 p-4 bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm ${item.link ? "cursor-pointer" : ""}`}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 bg-black transition-colors">
                        <item.icon className="text-gray-50" size={24} />
                      </div>
                      <span className="text-md text-gray-300 group-hover:text-white transition-colors">
                        {item.text}
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* Fixed and responsive social media icons section */}
                <div className="mt-10">
                  <h4 className="text-lg font-mono font-bold text-gray-200 mb-4">Connect With Us</h4>
                  <div className="grid grid-cols-5 xs:grid-cols-5 sm:flex sm:flex-wrap gap-2 sm:gap-3 md:gap-4">
                    {[
                      { icon: FaWhatsapp, url: "https://www.whatsapp.com/channel/0029ValLxITAO7RActotOX3R", label: "WhatsApp" },
                      { icon: FaXTwitter, url: "https://x.com/EventsPalour", label: "Twitter" },
                      { icon: FaInstagram, url: "https://www.instagram.com/event.parlour", label: "Instagram" },
                      { icon: FaTiktok, url: "https://www.tiktok.com/@eventparlour", label: "TikTok" },
                      { icon: FaLinkedin, url: "https://www.linkedin.com/company/eventparlour", label: "LinkedIn" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        title={social.label}
                        className="flex justify-center items-center aspect-square p-2 xs:p-3 sm:p-3 md:p-4 bg-zinc-800/50 border border-zinc-700/30 text-gray-400 hover:text-white hover:border-white transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <social.icon size={16} className="xs:text-base sm:text-lg md:text-xl" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form section */}
            <motion.div className="lg:col-span-3 relative" variants={itemVariants}>
              <div className="bg-zinc-900/60 backdrop-blur-md p-6 md:p-8 border border-zinc-800/50 shadow-xl h-full">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      className="flex flex-col items-center justify-center h-full text-center py-16"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-green-500/20 flex items-center justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <svg
                          className="w-10 h-10 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-300">We&apos;ll get back to you as soon as possible.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-2xl font-semibold text-gray-50 mb-6">Send Us a Message</h2>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { name: "name", label: "Full Name", type: "text", placeholder: "Enter your name" },
                            { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
                          ].map((field) => (
                            <motion.div key={field.name} className="group" whileHover={{ y: -2 }}>
                              <label className="block text-base font-medium text-gray-300 mb-2">
                                {field.label} <span className="text-gray-50">*</span>
                              </label>
                              <input
                                type={field.type}
                                name={field.name}
                                value={formState[field.name as keyof typeof formState]}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                                placeholder={field.placeholder}
                                required
                              />
                            </motion.div>
                          ))}
                        </div>

                        <motion.div className="group" whileHover={{ y: -2 }}>
                          <label className="block text-base font-medium text-gray-300 mb-2">
                            Subject <span className="text-gray-50">*</span>
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                            placeholder="What's your event about?"
                            required
                          />
                        </motion.div>

                        <motion.div className="group" whileHover={{ y: -2 }}>
                          <label className="block text-base font-medium text-gray-300 mb-2">
                            Message <span className="text-gray-50">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent h-40 resize-none transition-all duration-300"
                            placeholder="Tell us about your event requirements..."
                            required
                          />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            className="w-full bg-white hover:text-white hover:bg-zinc-900 hover:border text-black font-bold px-6 py-6 text-lg shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 dark:text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Sending...
                              </div>
                            ) : (
                              "Send Message"
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-white blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 2,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles for ambient effect */}
      <Particles />
    </div>
  )
}

// Decorative floating particles component
function Particles() {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -300, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}