// "use client"

"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  children: React.ReactNode
  delay?: number
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay }}>
    {children}
  </motion.div>
)

interface AnimatedNumberProps {
  number: string
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ number }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
  >
    {number}
  </motion.span>
)

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#171717] p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-black rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
        <motion.div
          className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/notfound.svg"
            alt="404 Not Found Illustration"
            width={600}
            height={600}
            className="object-cover w-full h-full filter contrast-125"
            priority
          />
        </motion.div>
        <div className="relative w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-r from-gray-100 to-white">
          <div className="space-y-6 pr-8">
            <div className="space-y-2">
              <h1 className="text-7xl lg:text-8xl font-bold tracking-tighter text-black">
                <AnimatedNumber number="e" />
                <AnimatedNumber number="r" />
                <AnimatedNumber number="r" />
                <AnimatedNumber number="o" />
                <AnimatedNumber number="r" />
              </h1>
              <motion.div
                className="h-1 w-20 bg-black"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            <div className="space-y-4">
              <AnimatedText delay={0.2}>
                <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-black uppercase">
                  Page not found!
                </h2>
              </AnimatedText>
              <AnimatedText delay={0.4}>
                <p className="text-sm text-gray-600">
                  Sorry, but the page you are looking for doesn&apos;t exist or has been removed.
                </p>
              </AnimatedText>
              <AnimatedText delay={0.6}>
                <Button
                  asChild
                  className="bg-black hover:bg-gray-800 text-white px-6 py-4 lg:px-8 lg:py-6 text-base lg:text-lg rounded-md transition-all duration-200 hover:shadow-lg"
                >
                  <Link href="/">Back to main page</Link>
                </Button>
              </AnimatedText>
            </div>
          </div>
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Decorative barcode lines */}
            <div className="h-full w-full flex flex-col justify-between py-6">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-[2px] bg-black/20"
                  initial={{ width: 0 }}
                  animate={{ width: Math.random() * 24 + 8 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.02 }}
                />
              ))}
            </div>
          </motion.div>
          {/* Additional decorative elements */}
          <motion.div
            className="absolute top-6 right-12 w-12 h-12 border-2 border-black/10 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-6 right-20 w-8 h-8 border-2 border-black/10 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          <motion.div
            className="absolute top-1/2 right-16 w-6 h-6 border-2 border-black/10 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </div>
      </div>
    </div>
  )
}