"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import NumberFlow from "@number-flow/react"
import { useTranslations } from "@/lib/i18n/translations"
import {
  HugeiconsWhatsapp,
  HugeiconsInstagram,
  LsiconMarketplaceOutline,
  HugeiconsTicket02,
} from "./social-icons"
import { cn } from "@/lib/utils"

export default function DistributionMetrics() {
  const t = useTranslations('DistributionMetrics')
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    }
  }, [isInView])
  
  const metrics = [
    {
      icon: HugeiconsWhatsapp,
      value: t('whatsappUsers'),
      label: t('whatsappUsersLabel')
    },
    {
      icon: HugeiconsInstagram,
      value: t('instagramFollowers'),
      label: t('instagramFollowersLabel')
    },
    {
      icon: LsiconMarketplaceOutline,
      value: t('eventsHosted'),
      label: t('eventsHostedLabel')
    },
    {
      icon: HugeiconsTicket02,
      value: t('ticketsSold'),
      label: t('ticketsSoldLabel')
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="py-8 xs:py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background via-muted/30 to-background"
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 xs:mb-8 sm:mb-10"
        >
          <p className="text-muted-foreground text-sm xs:text-base sm:text-lg mb-2">
            {t('subtitle')}
          </p>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon

            // Try to derive a numeric value for animated NumberFlow.
            // If value is non-numeric (e.g. "Growing"), fall back to text.
            const numericMatch = String(metric.value).match(/-?\d[\d.,]*/)
            const numericValue = numericMatch
              ? Number(numericMatch[0].replace(/,/g, ""))
              : Number.NaN
            // Small devices: checkerboard (index 1 and 2 are white)
            // Large devices: alternating (index 0 and 2 are white)
            // Index 0: dark on small, white on large
            // Index 1: white on small, dark on large
            // Index 2: white on both
            // Index 3: dark on both
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative rounded-lg text-center p-4 xs:p-6 sm:p-8",
                  // Small devices: checkerboard pattern (0,3 dark; 1,2 light)
                  // Large devices: alternating pattern (0,2 light; 1,3 dark)
                  index === 0 && "bg-zinc-100 dark:bg-muted text-foreground lg:bg-background dark:lg:bg-background lg:border lg:border-border",
                  index === 1 && "bg-background text-foreground border border-border lg:bg-zinc-100 dark:lg:bg-muted lg:border-0",
                  index === 2 && "bg-background text-foreground border border-border lg:bg-background dark:lg:bg-background lg:border lg:border-border",
                  index === 3 && "bg-zinc-100 dark:bg-muted text-foreground lg:bg-zinc-100 dark:lg:bg-muted"
                )}
              >
                {/* Vercel-style edge borders */}
                <div className="absolute inset-0 rounded-lg">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                  <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                </div>
                {/* Mesh-like effect only on edges */}
                <div className="pointer-events-none absolute inset-0 rounded-lg overflow-hidden">
                  {/* Top edge mesh */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-zinc-800/20 to-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, rgba(113,113,122,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.3) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                      maskImage: "linear-gradient(to bottom, black, transparent)",
                    }}
                  />
                  {/* Bottom edge mesh */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-800/20 to-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, rgba(113,113,122,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.3) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                      maskImage: "linear-gradient(to top, black, transparent)",
                    }}
                  />
                  {/* Left edge mesh */}
                  <div 
                    className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-zinc-800/20 to-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, rgba(113,113,122,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.3) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                      maskImage: "linear-gradient(to right, black, transparent)",
                    }}
                  />
                  {/* Right edge mesh */}
                  <div 
                    className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-zinc-800/20 to-transparent"
                    style={{
                      backgroundImage: "linear-gradient(to right, rgba(113,113,122,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.3) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                      maskImage: "linear-gradient(to left, black, transparent)",
                    }}
                  />
                </div>
                <div className="relative">
                <div className="flex justify-center mb-3 xs:mb-4 text-foreground">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-foreground">
                  {!Number.isNaN(numericValue) ? (
                    <NumberFlow
                      value={hasAnimated ? numericValue : 0}
                      className="inline-block"
                    />
                  ) : (
                    metric.value
                  )}
                </div>
                <div className="text-xs xs:text-sm sm:text-base text-muted-foreground">
                  {metric.label}
                </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
