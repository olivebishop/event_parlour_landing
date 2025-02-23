"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import NoBeds from "@/components/shared/no-house"

interface Bed {
  id: number
  title: string
  image: string
  location: string
  price: number
  guests: number
  dates: string
}

const beds: Bed[] = [
  {
    id: 1,
    title: "Cozy Studio Near Event Venue",
    image: "/images/dummy/a.jpg",
    location: "Downtown, 0.5 miles from venue",
    price: 9800,
    guests: 2,
    dates: "Mar 15 - Mar 18",
  },
  {
    id: 2,
    title: "Spacious 2BR Apartment",
    image: "/images/dummy/b.jpg",
    location: "Midtown, 1 mile from venue",
    price: 14700,
    guests: 4,
    dates: "Mar 14 - Mar 19",
  },
  {
    id: 3,
    title: "Luxury Penthouse with City View",
    image: "/images/dummy/c.jpg",
    location: "City Center, 0.2 miles from venue",
    price: 30500,
    guests: 6,
    dates: "Mar 13 - Mar 20",
  },
]

const categories = ["All", "Near Venue", "Budget", "Luxury", "Group-friendly"] as const

export default function BedsSection() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filterBeds = (category: typeof categories[number]) => {
    switch (category) {
      case "All":
        return beds
      case "Near Venue":
        return beds.filter((bed) => parseFloat(bed.location.split(" ")[1]) <= 0.5)
      case "Budget":
        return beds.filter((bed) => bed.price <= 12000)
      case "Luxury":
        return beds.filter((bed) => bed.price > 25000)
      case "Group-friendly":
        return beds.filter((bed) => bed.guests >= 4)
      default:
        return beds
    }
  }

  const renderContent = (category: typeof categories[number]) => {
    const filteredBeds = filterBeds(category)

    if (loading) {
      return (
        <motion.div
          key="skeleton-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <BedSkeleton />
              </motion.div>
            ))}
        </motion.div>
      )
    }

    return filteredBeds.length > 0 ? (
      <motion.div
        key={`${category}-beds`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {filteredBeds.map((bed, index) => (
          <motion.div
            key={bed.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BedCard bed={bed} />
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <motion.div
        key="no-beds"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <NoBeds />
      </motion.div>
    )
  }

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mr-4">Event Accommodations</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-gray-50 to-white"></div>
        </motion.div>

        <Tabs defaultValue="All">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="overflow-x-auto pb-4 mb-8 -mx-4 px-4"
          >
            <TabsList className="flex flex-nowrap min-w-max bg-transparent">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <TabsTrigger
                    value={category}
                    className="px-5 py-2.5 text-sm font-medium mt-2 rounded-lg mr-3 border-[#171717] border bg-black text-white backdrop-blur-sm 
                             hover:bg-[#171717] transition-all duration-200
                             data-[state=active]:bg-gray-100 data-[state=active]:from-black data-[state=active]:to-[#171717] 
                             data-[state=active]:text-black data-[state=active]:shadow-lg"
                  >
                    {category}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <AnimatePresence mode="wait">{renderContent(category)}</AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  )
}

interface BedCardProps {
  bed: Bed
}

function BedCard({ bed }: BedCardProps) {
  return (
    <div className="bed-card relative rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-2xl transition-all duration-300 transform perspective-1000">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
          <Image
            src={bed.image || "/placeholder.svg"}
            alt={bed.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-all duration-500 rounded-t-[2.5rem]"
          />
        </motion.div>
      </div>

      <div className="p-5 bg-gradient-to-b from-black to-[#171717] text-white relative z-20">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-bold mb-3 group-hover:text-gray-100 transition-colors"
        >
          {bed.title}
        </motion.h3>

        <div className="space-y-2 text-sm">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center text-gray-300"
          >
            <MapPin className="h-4 w-4 mr-2 text-white" />
            <span>{bed.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center text-gray-300"
          >
            <Calendar className="h-4 w-4 mr-2 text-white" />
            <span>{bed.dates}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex items-center text-gray-300"
          >
            <Users className="h-4 w-4 mr-2 text-white" />
            <span>{bed.guests} guests</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center"
        >
          <div className="text-xs text-gray-400">
            <span className="text-white text-lg font-medium capitalize font-sans">KES {bed.price.toLocaleString()}</span> / night
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/sign-in">
              <Button className="bg-black hover:bg-[#171717] text-gray-100 hover:text-white rounded-full px-4 py-1 text-sm">
                Book Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#171717] to-[#171717]"></div>
    </div>
  )
}

function BedSkeleton() {
  return (
    <div className="bed-card relative rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-xl">
      <Skeleton className="h-64 w-full rounded-t-[2.5rem]" />
      <div className="p-5 bg-gray-800">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 to-gray-600"></div>
    </div>
  )
}