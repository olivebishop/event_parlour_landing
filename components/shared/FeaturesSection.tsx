"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ScrollReveal from "@/components/shared/animations/scroll-reveal"
import { cn } from "@/lib/utils"
import { categories, type CategoryKey, type Feature, type Category } from "@/lib/data/features"
import { useTranslations } from "@/lib/i18n/translations"

// Shotgun-style feature block with images
function FeatureBlock({ feature, index, isReversed, includesText, activeText }: { feature: Feature; index: number; isReversed: boolean; includesText: string; activeText: string }) {
  
  return (
    <div className="py-10 xs:py-14 sm:py-16 md:py-20 lg:py-32">
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center",
        isReversed && "lg:[direction:rtl]"
      )}>
        {/* Content Side */}
        <motion.div 
          className="space-y-4 xs:space-y-5 sm:space-y-6 lg:[direction:ltr]"
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
            <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
              <div className="text-black text-xs xs:text-sm sm:text-base">{feature.icon}</div>
            </div>
            <span className="text-[10px] xs:text-xs font-medium tracking-widest text-zinc-500">
              {feature.label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-zinc-400 text-sm xs:text-base sm:text-lg leading-relaxed max-w-xs xs:max-w-sm md:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {feature.description}
          </motion.p>

          {/* Capabilities */}
          <motion.div 
            className="flex flex-wrap gap-1.5 xs:gap-2 pt-1 xs:pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {feature.capabilities.map((capability, idx) => (
              <motion.span 
                key={idx}
                className="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-zinc-900 border border-zinc-800 text-xs xs:text-sm text-zinc-400"
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
          className="relative lg:[direction:ltr] mt-4 xs:mt-6 lg:mt-0"
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
                className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-5 md:p-6 bg-gradient-to-t from-zinc-950 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 xs:gap-3">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
                      <div className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-black">{feature.icon}</div>
                    </div>
                    <span className="text-xs xs:text-sm font-medium text-white line-clamp-1">{feature.title.split('.')[0]}</span>
                  </div>
                  <motion.div 
                    className="flex items-center gap-1.5 xs:gap-2 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm"
                    whileHover={{ backgroundColor: "rgb(255 255 255)", color: "rgb(0 0 0)" }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-white"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[10px] xs:text-xs text-white">{activeText}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating capability cards - WHITE BOX (only on large screens to avoid covering text on smaller devices) */}
            <motion.div 
              className="hidden lg:block absolute -bottom-3 -right-2 sm:-bottom-5 sm:-right-4 md:-bottom-6 md:-right-6 bg-white p-2.5 xs:p-3 sm:p-3.5 md:p-4 max-w-[140px] xs:max-w-[150px] sm:max-w-[160px] md:max-w-[180px] shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-zinc-500 mb-1.5 xs:mb-2">{includesText}</p>
              <div className="space-y-1 xs:space-y-1.5">
                {feature.capabilities.slice(0, 3).map((cap, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-1.5 xs:gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.3 }}
                  >
                    <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 bg-black flex-shrink-0" />
                    <span className="text-[9px] xs:text-[10px] sm:text-xs text-zinc-700 leading-tight">{cap}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating label */}
            <motion.div 
              className="absolute -top-2 -left-2 xs:-top-3 xs:-left-3 sm:-top-4 sm:-left-4 bg-zinc-900 border border-zinc-800 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-medium tracking-wider text-zinc-400">{feature.label}</span>
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
  onClick,
  translatedLabel
}: { 
  category: Category; 
  isActive: boolean; 
  onClick: () => void;
  translatedLabel: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-5 md:px-8 py-2 xs:py-2.5 sm:py-3 md:py-4 text-xs xs:text-sm font-medium transition-all duration-300 whitespace-nowrap",
        isActive 
          ? "bg-white text-black" 
          : "bg-transparent text-zinc-500 hover:text-white"
      )}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Hide icon on small devices to avoid confusion; show text label instead */}
      <span className="hidden sm:inline text-sm sm:text-base">
        {category.icon}
      </span>
      <span className="text-xs xs:text-sm sm:text-base">
        {translatedLabel}
      </span>
    </motion.button>
  )
}

export default function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("organizers")
  const t = useTranslations('FeaturesSection')
  
  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0]
  
  // Get translated features for the current category
  const getTranslatedFeatures = (): Feature[] => {
    try {
      const categoryKey = activeCategory
      const featuresData = t(`${categoryKey}`)
      if (featuresData && featuresData !== categoryKey && featuresData.startsWith('{')) {
        const parsed = JSON.parse(featuresData)
        // Map the translated data back to the features with icons from original
        return currentCategory.features.map((feature, index) => {
          const featureKeys = ['reach', 'discovery', 'events', 'dashboard', 'speakers', 'analytics', 'payments', 'postEvent']
          const attendeeKeys = ['discover', 'local', 'tickets', 'network', 'alerts']
          const keys = categoryKey === 'organizers' ? featureKeys : attendeeKeys
          const translatedFeature = parsed[keys[index]]
          if (translatedFeature) {
            return {
              ...feature,
              label: translatedFeature.label || feature.label,
              title: translatedFeature.title || feature.title,
              description: translatedFeature.description || feature.description,
              capabilities: translatedFeature.capabilities || feature.capabilities,
            }
          }
          return feature
        })
      }
    } catch {
      // Return original features if parsing fails
    }
    return currentCategory.features
  }
  
  const translatedFeatures = getTranslatedFeatures()

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-28 lg:py-36 dark overflow-hidden">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
          <div className="text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20">
            <motion.p 
              className="text-[10px] xs:text-xs font-medium tracking-widest text-zinc-500 mb-3 xs:mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('sectionLabel')}
            </motion.p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 xs:mb-5 sm:mb-6">
              {t('title')}
            </h2>
            <p className="text-zinc-400 text-sm xs:text-base sm:text-lg max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto px-2">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal direction="up" delay={0.1} duration={0.7} threshold={0.2}>
          <div className="flex justify-center mb-10 xs:mb-12 sm:mb-16">
            <div className="inline-flex border border-zinc-800">
              {categories.map((category) => (
                <CategoryTab
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  translatedLabel={t(`tabs.${category.id}`)}
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
              {translatedFeatures.map((feature, index) => (
                <FeatureBlock 
                  key={feature.title} 
                  feature={feature} 
                  index={index}
                  isReversed={index % 2 === 1}
                  includesText={t('includes')}
                  activeText={t('active')}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
