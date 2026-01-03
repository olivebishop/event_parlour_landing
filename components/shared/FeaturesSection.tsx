"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ScrollReveal from "@/components/shared/animations/scroll-reveal"
import { cn } from "@/lib/utils"
import { categories, type CategoryKey, type Feature, type Category } from "@/lib/data/features"

// Shotgun-style feature block with images
function FeatureBlock({ feature, index, isReversed }: { feature: Feature; index: number; isReversed: boolean }) {
  
  return (
    <div className="py-20 lg:py-32">
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
        isReversed && "lg:[direction:rtl]"
      )}>
        {/* Content Side */}
        <motion.div 
          className="space-y-6 lg:[direction:ltr]"
          initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <div className="text-black">{feature.icon}</div>
            </div>
            <span className="text-xs font-medium tracking-widest text-zinc-500">
              {feature.label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-zinc-400 text-lg leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {feature.description}
          </motion.p>

          {/* Capabilities */}
          <motion.div 
            className="flex flex-wrap gap-2 pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {feature.capabilities.map((capability, idx) => (
              <motion.span 
                key={idx}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-sm text-zinc-400"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.05, duration: 0.4 }}
                whileHover={{ 
                  backgroundColor: "rgb(255 255 255)",
                  color: "rgb(0 0 0)",
                  borderColor: "rgb(255 255 255)"
                }}
              >
                {capability}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual Side - Shotgun-style image display */}
        <motion.div 
          className="relative lg:[direction:ltr]"
          initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Main image container */}
            <motion.div 
              className="relative bg-zinc-950 border border-zinc-800 overflow-hidden"
              whileHover={{ borderColor: "rgb(63 63 70)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <motion.div
                className="relative aspect-[4/3] w-full"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              </motion.div>

              {/* Bottom info bar */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-zinc-950 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                      <div className="w-4 h-4 text-black">{feature.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-white">{feature.title.split('.')[0]}</span>
                  </div>
                  <motion.div 
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm"
                    whileHover={{ backgroundColor: "rgb(255 255 255)", color: "rgb(0 0 0)" }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-white"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-white">Active</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating capability cards */}
            <motion.div 
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 max-w-[180px]"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs font-medium text-zinc-500 mb-2">Includes</p>
              <div className="space-y-1.5">
                {feature.capabilities.slice(0, 3).map((cap, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.3 }}
                  >
                    <div className="w-1.5 h-1.5 bg-black" />
                    <span className="text-xs text-zinc-700">{cap}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating label */}
            <motion.div 
              className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-zinc-900 border border-zinc-800 px-3 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="text-xs font-medium tracking-wider text-zinc-400">{feature.label}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function CategoryTab({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: Category; 
  isActive: boolean; 
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap",
        isActive 
          ? "bg-white text-black" 
          : "bg-transparent text-zinc-500 hover:text-white"
      )}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {category.icon}
      <span>{category.label}</span>
    </motion.button>
  )
}

export default function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("organizers")
  
  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0]

  return (
    <section className="py-20 sm:py-28 lg:py-36 dark overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
          <div className="text-center mb-16 sm:mb-20">
            <motion.p 
              className="text-xs font-medium tracking-widest text-zinc-500 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              BUILT FOR GROWTH
            </motion.p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Everything you need
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
              From event creation to lasting memories. All the tools to create, 
              manage, and attend unforgettable events.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal direction="up" delay={0.1} duration={0.7} threshold={0.2}>
          <div className="flex justify-center mb-16">
            <div className="inline-flex border border-zinc-800">
              {categories.map((category) => (
                <CategoryTab
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Category Content */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <div className="max-w-7xl mx-auto">
              {currentCategory.features.map((feature, index) => (
                <FeatureBlock 
                  key={feature.title} 
                  feature={feature} 
                  index={index}
                  isReversed={index % 2 === 1}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
