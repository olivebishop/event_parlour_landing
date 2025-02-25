"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaFacebookF, 
  FaInstagram,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { useState, FormEvent } from "react"
import { Toaster, toast } from "sonner"
import Turnstile from "react-turnstile"
import { z } from "zod"

// Form schema with updated name validation (1-2 words)
const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/, "Name can be one or two words"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>
type Errors = Partial<Record<keyof FormData, string>>

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [turnstileToken, setTurnstileToken] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = formSchema.parse(formData)

      if (!turnstileToken) {
        toast.error("Please verify you're not a bot", { position: "bottom-right" })
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validatedData, turnstileToken }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Message sent successfully!", { position: "bottom-right" })
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTurnstileToken("")
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Errors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        const errorMessage = error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again later."
        toast.error(errorMessage, {
          position: "bottom-right",
          action: {
            label: "Retry",
            onClick: () => handleSubmit(e),
          },
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-b from-black to-zinc-900 font-sans mt-10">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_one.svg"
          alt="Event Platform Contact Background"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-20 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto bg-zinc-900/80 backdrop-blur-lg p-8 md:p-12 rounded-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-4 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-gray-100">Contact Us</h2>
            <div className="flex-grow h-px bg-gray-100"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                <span className="font-bold">Event Parlour</span> helps create unforgettable events. Contact us for seamless planning.
              </p>
              <div className="space-y-6">
                {[
                  { icon: FaMapMarkerAlt, text: "Nairobi, Kenya", link: null },
                  { icon: FaEnvelope, text: "support@eventparlour.com", link: "mailto:support@eventparlour.com" },
                  { icon: FaPhone, text: "+254 791 482 626", link: "tel:+254791482626" },
                  { icon: FaClock, text: "Open - 24 hrs", link: null }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`group flex items-center space-x-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm ${item.link ? 'cursor-pointer' : ''}`}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(24, 24, 27, 0.8)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 bg-gold-500/10 rounded-lg group-hover:bg-gold-500/20 transition-colors">
                      <item.icon className="text-gold-500" size={24} />
                    </div>
                    <span className="text-md lg:text-lg text-gray-300 group-hover:text-white transition-colors">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-4 mt-12">
                {[FaFacebookF, FaXTwitter, FaInstagram].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="p-4 bg-zinc-900 rounded-xl border border-zinc-800/50 hover:border-white text-gray-400 hover:text-gold-500 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <h2 className="text-2xl font-semibold text-gold-500 mb-6">Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email", "subject"].map((field) => (
                  <div key={field} className="group">
                    <label className="block text-base font-medium text-gray-300 mb-3 capitalize">
                      {field} *
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      className={`w-full p-4 bg-zinc-900/50 border ${errors[field as keyof FormData] ? 'border-red-500' : 'border-zinc-800/50'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-transparent group-hover:bg-zinc-900 transition-all duration-300`}
                      placeholder={`Enter your ${field}`}
                      disabled={isSubmitting}
                    />
                    {errors[field as keyof FormData] && (
                      <p className="text-red-500 text-sm mt-1">{errors[field as keyof FormData]}</p>
                    )}
                  </div>
                ))}

                <div className="group">
                  <label className="block text-base font-medium text-gray-300 mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-4 bg-zinc-900/50 border ${errors.message ? 'border-red-500' : 'border-zinc-800/50'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-transparent h-36 resize-none group-hover:bg-zinc-900 transition-all duration-300`}
                    placeholder="Tell us about your event..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                  onVerify={(token: string) => setTurnstileToken(token)}
                  theme="dark"
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-gray-100 hover:bg-[#171717] border-[#171717] border hover:text-white hover:border-white rounded-full px-6 py-6 text-lg font-semibold shadow-lg hover:shadow-gold-500/20 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  )
}