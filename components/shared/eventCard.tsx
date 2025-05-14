"use client"

import { MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

interface EventCardProps {
  id: number
  title: string
  image: string
  date: string
  location: string
  distance: string
  price: string
  category: string
  selected?: boolean
}

export default function EventCard({
  id,
  title,
  image,
  date,
  location,
  price,
  category,
  selected = false,
}: EventCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      role="article"
      aria-labelledby={`event-title-${id}`}
    >
      <Card
        className={`overflow-hidden bg-[#171717] text-white border-[#171717] border hover:border-gray-700 transition-colors duration-200 ${selected ? "border-gray-500" : ""}`}
      >
        <div className="relative h-40 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-black/70 text-white backdrop-blur-sm hover:bg-black hover:text-gray-100 text-xs py-0.5">
              {category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 id={`event-title-${id}`} className="font-semibold text-base mb-2 line-clamp-1">
            {title}
          </h3>

          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-start gap-2 text-gray-200">
              <Calendar className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{date}</span>
            </div>

            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
              <div>{location}</div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-medium text-sm">{price}</div>
          <Button
            size="sm"
            className="bg-black text-white hover:bg-gray-900 transition-colors duration-200 text-xs px-4"
            aria-label={`Get tickets for ${title}`}
          >
            Get Tickets
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}