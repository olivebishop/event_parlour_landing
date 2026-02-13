"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock, FaWhatsapp, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { toast } from "sonner"
import { useTranslations } from "@/lib/i18n/translations"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
  const t = useTranslations('ContactUsSection')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const responseText = await response.text()
      
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

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      })
      
      setIsSubmitted(true)
      
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
    <section className="py-12 xs:py-16 sm:py-20 md:py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20" variants={itemVariants}>
            <motion.p 
              className="text-[10px] xs:text-xs font-medium tracking-widest text-muted-foreground mb-2 xs:mb-3 sm:mb-4"
              variants={itemVariants}
            >
              {t('sectionLabel')}
            </motion.p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 xs:mb-5 sm:mb-6">
              {t('title')}
            </h2>
            <p className="text-muted-foreground text-sm xs:text-base sm:text-lg max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto px-2">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-5 gap-4 xs:gap-6 sm:gap-8 lg:gap-12" variants={containerVariants}>
            {/* Contact info section */}
            <motion.div className="lg:col-span-2 space-y-4 xs:space-y-6" variants={itemVariants}>
              <div className="bg-muted border border-border p-4 xs:p-5 sm:p-6 md:p-8">
                <h3 className="text-lg xs:text-xl font-semibold text-foreground mb-4 xs:mb-5 sm:mb-6">{t('contactInfo')}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 xs:mb-8 text-sm xs:text-base">
                  <span className="font-bold text-foreground">Event Parlour</span> - {t('companyIntro')}
                </p>

                <div className="space-y-2 xs:space-y-3">
                  {[
                    { icon: FaMapMarkerAlt, text: t('location'), link: null },
                    { icon: FaEnvelope, text: t('email'), link: `mailto:${t('email')}` },
                    { icon: FaPhone, text: t('phone'), link: `tel:${t('phone').replace(/\s/g, '')}` },
                    { icon: FaClock, text: t('hours'), link: null },
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link || undefined}
                      className={`group flex items-center space-x-3 xs:space-x-4 p-3 xs:p-4 bg-background border border-border ${item.link ? "cursor-pointer" : ""}`}
                      whileHover={{ 
                        backgroundColor: "hsl(var(--muted))",
                        borderColor: "hsl(var(--foreground))"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-foreground group-hover:bg-background flex items-center justify-center flex-shrink-0 transition-colors">
                        <item.icon className="text-background group-hover:text-foreground transition-colors" size={14} />
                      </div>
                      <span className="text-xs xs:text-sm text-muted-foreground group-hover:text-foreground transition-colors break-all">
                        {item.text}
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* Social media icons */}
                <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-border">
                  <h4 className="text-xs xs:text-sm font-medium tracking-wider text-muted-foreground mb-3 xs:mb-4">{t('connectWithUs')}</h4>
                  <div className="flex flex-wrap gap-1.5 xs:gap-2">
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
                        className="w-8 h-8 xs:w-10 xs:h-10 flex justify-center items-center bg-background border border-border text-muted-foreground"
                        whileHover={{ 
                          backgroundColor: "hsl(var(--foreground))",
                          borderColor: "hsl(var(--foreground))",
                          color: "hsl(var(--background))"
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <social.icon size={14} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form section */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <div className="bg-muted border border-border p-4 xs:p-5 sm:p-6 md:p-8 h-full">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      className="flex flex-col items-center justify-center h-full text-center py-10 xs:py-12 sm:py-16"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-primary flex items-center justify-center mb-4 xs:mb-5 sm:mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                      >
                        <svg
                          className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-primary-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-xl xs:text-2xl font-bold text-foreground mb-2">{t('messageSent')}</h3>
                      <p className="text-muted-foreground text-sm xs:text-base">{t('successMessage')}</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-lg xs:text-xl font-semibold text-foreground mb-4 xs:mb-5 sm:mb-6">{t('formTitle')}</h2>
                      
                      <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                          {[
                            { name: "name", label: t('fullName'), type: "text", placeholder: t('namePlaceholder') },
                            { name: "email", label: t('emailAddress'), type: "email", placeholder: t('emailPlaceholder') },
                          ].map((field) => (
                            <div key={field.name}>
                              <label className="block text-xs xs:text-sm font-medium text-muted-foreground mb-1.5 xs:mb-2">
                                {field.label} <span className="text-foreground">*</span>
                              </label>
                              <input
                                type={field.type}
                                name={field.name}
                                value={formState[field.name as keyof typeof formState]}
                                onChange={handleInputChange}
                                className="w-full p-3 xs:p-3.5 sm:p-4 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm xs:text-base"
                                placeholder={field.placeholder}
                                required
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className="block text-xs xs:text-sm font-medium text-muted-foreground mb-1.5 xs:mb-2">
                            {t('subject')} <span className="text-foreground">*</span>
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                            className="w-full p-3 xs:p-3.5 sm:p-4 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm xs:text-base"
                            placeholder={t('subjectPlaceholder')}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs xs:text-sm font-medium text-muted-foreground mb-1.5 xs:mb-2">
                            {t('message')} <span className="text-foreground">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            className="w-full p-3 xs:p-3.5 sm:p-4 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground h-24 xs:h-28 sm:h-32 resize-none transition-colors text-sm xs:text-base"
                            placeholder={t('messagePlaceholder')}
                            required
                          />
                        </div>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 xs:px-5 sm:px-6 py-4 xs:py-5 sm:py-6 text-sm xs:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 xs:mr-3 h-4 w-4 xs:h-5 xs:w-5 text-primary-foreground"
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
                                {t('sending')}
                              </div>
                            ) : (
                              t('sendMessage')
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}