// Your original file (e.g., EventSection.jsx)
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"
import { events } from "@/lib/data/event"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import NoEvents from "@/components/shared/no-events" // Import the new component

const categories = ["All", "Tech", "Conference", "Hangouts", "Festivals", "Concerts"]

export default function EventSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  const filteredEvents = events.filter((event) => selectedCategory === "All" || event.category === selectedCategory)
  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="pt-8 pb-16 bg-gradient-to-b from-black via-[#171717] to-black">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mr-4">Featured Events</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-gray-50 to-white"></div>
        </motion.div>

        <Tabs defaultValue="All" onValueChange={(value) => setSelectedCategory(value)}>
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
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
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
                          <TicketSkeleton />
                        </motion.div>
                      ))}
                  </motion.div>
                ) : filteredEvents.length === 0 ? (
                  <motion.div
                    key="no-events"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <NoEvents />
                  </motion.div>
                ) : (
                  <motion.div
                    key={category + (showAll ? 'all' : 'some')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  >
                    {displayedEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <TicketCard event={event} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        {!loading && filteredEvents.length > 6 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="bg-black text-gray-100 hover:bg-[#171717] border-[#171717] border hover:text-white px-8 py-6 hover:opacity-90 transition-all duration-300 rounded-full font-medium"
              >
                {showAll ? "Show Less" : "View All Events"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

interface Event {
  id: string | number;
  category: string;
  image: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  price: number;
}

function TicketCard({ event }: { event: Event }) {
  const eventTime = event.time || "7:00 PM"
  const formattedPrice = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(event.price)
  
  return (
    <Link href="/sign-in" className="group block relative">
      <div className="ticket-card relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
        <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-0 right-0 bg-black text-white px-2 py-1 rounded-bl-lg z-10"
          >
            {event.category}
          </motion.div>
        </div>
        
        <div className="flex justify-between items-center px-0">
          <div className="w-5 h-5 rounded-full bg-gray-600 -ml-2.5 mt-0.5"></div>
          <div className="flex-1 border-dashed border-t-2 border-gray-600 mx-1"></div>
          <div className="w-5 h-5 rounded-full bg-gray-600 -mr-2.5 mt-0.5"></div>
        </div>
        
        <div className="p-5 bg-gradient-to-b from-black to-[#171717] text-white">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-bold mb-3 group-hover:text-gray-100 transition-colors"
          >
            {event.title}
          </motion.h3>
          
          <div className="space-y-2 text-sm">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center text-gray-300"
            >
              <Calendar className="h-4 w-4 mr-2 text-white" />
              <span>{event.date}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center text-gray-300"
            >
              <Clock className="h-4 w-4 mr-2 text-white" />
              <span>{eventTime}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center text-gray-300"
            >
              <MapPin className="h-4 w-4 mr-2 text-white" />
              <span>{event.location}</span>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center"
          >
            <div className="text-xs text-gray-400">
              <span className="text-white text-lg font-medium capitalize font-sans">{formattedPrice}</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-black hover:bg-[#171717] text-gray-100 hover:text-white rounded-full px-4 py-1 text-sm">
                Get Tickets
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#171717] to-[#171717]"></div>
      </div>
    </Link>
  )
}

function TicketSkeleton() {
  return (
    <div className="ticket-card relative rounded-2xl overflow-hidden shadow-xl">
      <Skeleton className="h-48 w-full" />
      
      <div className="flex justify-between items-center px-0">
        <div className="w-5 h-5 rounded-full bg-gray-900 -ml-2.5 mt-0.5"></div>
        <div className="flex-1 border-dashed border-t-2 border-gray-700 mx-1"></div>
        <div className="w-5 h-5 rounded-full bg-gray-900 -mr-2.5 mt-0.5"></div>
      </div>
      
      <div className="p-5 bg-gray-800">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 to-gray-600"></div>
    </div>
  )
}