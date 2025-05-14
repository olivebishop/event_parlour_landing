"use client"

import { Suspense, useEffect, useState, useMemo } from "react"
import { Search, MapPin, List, MapIcon, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EventCard from "@/components/shared/eventCard"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import NoEvents from "@/components/shared/no-events"
import Pagination from "@/components/shared/pagination"
import Loading from "./loading"
import ErrorState from "@/components/shared/error-state"
import { useDebounce } from "@/hooks/use-debounce"

// Dynamically import the map component with SSR disabled
const EventMapNoSSR = dynamic(() => import("@/components/shared/map/eventmap"), { ssr: false })

const categories = ["All", "Music", "Food & Drink", "Arts", "Sports", "Networking", "Business"]
const countries = ["All Countries", "Kenya", "United States", "United Kingdom", "South Africa", "Nigeria"]
const counties = ["All Counties", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Nyeri"]

// Sample event data
const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    image: "/images/dummy/one.jpg",
    date: "Sat, Aug 12 • 2:00 PM",
    location: "Central Park",
    coordinates: [-1.286389, 36.817223] as [number, number],
    distance: "0.8 miles away",
    price: "Ksh 700",
    category: "Music",
    country: "Kenya",
    county: "Nairobi",
  },
  {
    id: 2,
    title: "Food Truck Rally",
    image: "/images/dummy/five.jpg",
    date: "Sun, Aug 13 • 11:00 AM",
    location: "Downtown Square",
    coordinates: [-1.292066, 36.821945] as [number, number],
    distance: "1.2 miles away",
    price: "Free",
    category: "Food & Drink",
    country: "Kenya",
    county: "Nairobi",
  },
  {
    id: 3,
    title: "Art Gallery Opening",
    image: "/images/dummy/four.jpg",
    date: "Fri, Aug 18 • 7:00 PM",
    location: "Modern Art Museum",
    coordinates: [-1.3, 36.83] as [number, number],
    distance: "2.5 miles away",
    price: "Ksh 2890",
    category: "Arts",
    country: "Kenya",
    county: "Nairobi",
  },
  {
    id: 4,
    title: "Yoga in the Park",
    image: "/images/dummy/three.jpg",
    date: "Every Sunday • 9:00 AM",
    location: "Riverside Park",
    coordinates: [-4.04374, 39.658871] as [number, number],
    distance: "0.5 miles away",
    price: "Ksh 2300",
    category: "Sports",
    country: "Kenya",
    county: "Mombasa",
  },
  {
    id: 5,
    title: "Tech Networking Mixer",
    image: "/images/dummy/four.jpg",
    date: "Thu, Aug 17 • 6:30 PM",
    location: "Innovation Hub",
    coordinates: [-0.10249, 34.751661] as [number, number],
    distance: "3.1 miles away",
    price: "Ksh 5000",
    category: "Business",
    country: "Kenya",
    county: "Kisumu",
  },
  {
    id: 6,
    title: "Farmers Market",
    image: "/images/dummy/three.jpg",
    date: "Sat, Aug 12 • 8:00 AM",
    location: "Community Center",
    coordinates: [-0.303099, 36.080025] as [number, number],
    distance: "1.7 miles away",
    price: "Free",
    category: "Food & Drink",
    country: "Kenya",
    county: "Nakuru",
  },
]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedCounty, setSelectedCounty] = useState("All Counties")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [mapExpanded, setMapExpanded] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [activeView, setActiveView] = useState<"list" | "map">("list")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const eventsPerPage = 6
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Filter events
  useEffect(() => {
    setIsLoading(true)
    try {
      let filtered = events

      if (selectedCategory !== "All") {
        filtered = filtered.filter((event) => event.category.includes(selectedCategory))
      }

      if (selectedCountry !== "All Countries") {
        filtered = filtered.filter((event) => event.country === selectedCountry)
      }

      if (selectedCounty !== "All Counties") {
        filtered = filtered.filter((event) => event.county === selectedCounty)
      }

      if (debouncedSearchQuery) {
        filtered = filtered.filter((event) =>
          event.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      }

      setFilteredEvents(filtered)
      setCurrentPage(1)
    } catch (err: unknown) {
      console.error("Error filtering events:", err);
      setError("Failed to filter events. Please try again.")
    } finally {
      setTimeout(() => setIsLoading(false), 300) // Simulate async delay
    }
  }, [selectedCategory, selectedCountry, selectedCounty, debouncedSearchQuery])

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(eventId)
    if (isMobile) {
      setActiveView("map")
    }
  }

  const handleMarkerClick = (eventId: number) => {
    setSelectedEvent(eventId)
    if (isMobile) {
      setActiveView("list")
    }
  }

  const toggleMapExpanded = () => {
    setMapExpanded(!mapExpanded)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut",
      },
    },
  }

  // Map resize effect
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 300)
    return () => clearTimeout(timer)
  }, [mapExpanded])

  // Memoized map component
  const memoizedMap = useMemo(() => (
    <EventMapNoSSR
      events={filteredEvents}
      selectedEventId={selectedEvent}
      onMarkerClick={handleMarkerClick}
      height="100%"
      width="100%"
    />
  ), [filteredEvents, selectedEvent])

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />
  }

  if (isMobile) {
    return (
      <div className="bg-gradient-to-b from-black via-[#171717] to-black text-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <motion.header
            className="mt-16"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            role="banner"
          >
            <motion.h1 className="text-xl font-bold mb-1 mt-6" variants={headerVariants}>
              Events Near You
            </motion.h1>
            <motion.p className="text-muted-foreground mb-3 text-sm" variants={headerVariants}>
              Discover exciting events happening in your area
            </motion.p>
          </motion.header>

          {/* Search bar */}
          <motion.div
            className="relative mb-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 rounded-full bg-[#171717] border-gray-800 focus:border-gray-600 transition-all duration-300"
              aria-label="Search events"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <div className="absolute right-1 top-1">
              <Button
                className="rounded-full bg-black text-gray-100 border border-[#171717] hover:bg-[#171717] h-8 text-xs"
                disabled={isLoading}
                aria-label={isLoading ? "Searching" : "Search events"}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </motion.div>

          {/* Mobile Tabs */}
          <Tabs
            defaultValue="list"
            value={activeView}
            onValueChange={(value) => setActiveView(value as "list" | "map")}
            className="relative"
          >
            <div className="flex items-center justify-between mb-3">
              <TabsList className="bg-[#171717] text-slate-50 border border-gray-800">
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-black data-[state=active]:text-slate-50"
                  aria-label="View events as list"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:bg-black data-[state=active]:text-slate-50"
                  aria-label="View events on map"
                >
                  <MapIcon className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
              </TabsList>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black border-gray-800 text-white h-8 text-xs"
                    aria-label="Open filter drawer"
                  >
                    <Filter className="h-3.5 w-3.5 mr-2" />
                    Filter
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-[#171717] text-white border-t border-gray-800">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-semibold text-lg">Filters</h2>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs border border-white"
                          onClick={() => {
                            setSelectedCategory("All")
                            setSelectedCountry("All Countries")
                            setSelectedCounty("All Counties")
                            setSearchQuery("")
                          }}
                          aria-label="Reset filters"
                        >
                          Reset
                        </Button>
                        <DrawerClose asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs border border-white"
                            aria-label="Close filter drawer"
                          >
                            Close
                          </Button>
                        </DrawerClose>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block" htmlFor="location-input">
                        Location
                      </label>
                      <div className="relative">
                        <Input
                          id="location-input"
                          placeholder="Current location"
                          className="pl-8 h-10"
                          aria-label="Enter location"
                        />
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block" htmlFor="date-select">
                        Date
                      </label>
                      <Select defaultValue="any">
                        <SelectTrigger id="date-select" className="h-10">
                          <SelectValue placeholder="Select date" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#171717] text-gray-100">
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="tomorrow">Tomorrow</SelectItem>
                          <SelectItem value="week">This week</SelectItem>
                          <SelectItem value="weekend">This weekend</SelectItem>
                          <SelectItem value="month">This month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block" htmlFor="category-select">
                        Category
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger id="category-select" className="h-10">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#171717] text-gray-100">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block" htmlFor="country-select">
                        Country
                      </label>
                      <Select
                        value={selectedCountry}
                        onValueChange={setSelectedCountry}
                      >
                        <SelectTrigger id="country-select" className="h-10">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#171717] text-gray-100">
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedCountry === "Kenya" && (
                      <div>
                        <label className="text-sm font-medium mb-1 block" htmlFor="county-select">
                          County
                        </label>
                        <Select
                          value={selectedCounty}
                          onValueChange={setSelectedCounty}
                        >
                          <SelectTrigger id="county-select" className="h-10">
                            <SelectValue placeholder="Select county" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#171717] text-gray-100">
                            {counties.map((county) => (
                              <SelectItem key={county} value={county}>
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium mb-1 block">Price</label>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 flex-1 text-white border-gray-700 bg-black/50 hover:bg-black"
                          aria-label="Filter by free events"
                        >
                          Free
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 flex-1 text-white border-gray-700 bg-black/50 hover:bg-black"
                          aria-label="Filter by paid events"
                        >
                          Paid
                        </Button>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Category quick filters */}
            <motion.div
              className="flex overflow-x-auto pb-2 mb-3 hide-scrollbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              {categories.map((category) => (
                <div key={category} className="mr-2">
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 cursor-pointer text-gray-100 border-gray-800 whitespace-nowrap text-xs ${
                      selectedCategory === category ? "bg-white/10" : "bg-black/30"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    role="button"
                    aria-label={`Filter by ${category}`}
                  >
                    {category}
                  </Badge>
                </div>
              ))}
            </motion.div>

            <TabsContent value="list" className="mt-0">
              <Suspense fallback={<Loading />}>
                <div className="grid grid-cols-1 gap-3">
                  <AnimatePresence>
                    {isLoading ? (
                      <Loading />
                    ) : currentEvents.length > 0 ? (
                      currentEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                          onClick={() => handleEventClick(event.id)}
                          className={selectedEvent === event.id ? "ring-2 ring-white/20 rounded-lg" : ""}
                        >
                          <EventCard
                            id={event.id}
                            title={event.title}
                            image={event.image}
                            date={event.date}
                            location={event.location}
                            distance={event.distance}
                            price={event.price}
                            category={event.category}
                            selected={selectedEvent === event.id}
                          />
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-1 flex justify-center">
                        <NoEvents />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </Suspense>

              {filteredEvents.length > eventsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <Suspense fallback={<Loading />}>
                <div className="h-[60vh] rounded-lg overflow-hidden border border-gray-800 relative">
                  {memoizedMap}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-black/70 backdrop-blur-sm border-gray-700"
                      aria-label="Zoom in"
                    >
                      +
                    </Button>
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-black/70 backdrop-blur-sm border-gray-700"
                      aria-label="Zoom out"
                    >
                      -
                    </Button>
                  </div>
                </div>
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // Tablet and Desktop layout
  return (
    <div className="bg-gradient-to-b from-black via-[#171717] to-black text-gray-50 min-h-screen">
      <div className="container mx-auto px-7 py-6">
        <motion.header
          className="lg:mt-24 mt-10"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          role="banner"
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-2 mt-8"
            variants={headerVariants}
          >
            Events Near You
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-4"
            variants={headerVariants}
          >
            Discover exciting events happening in your area
          </motion.p>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filters sidebar */}
          <motion.div
            className={`w-full lg:w-56 shrink-0 ${mapExpanded ? "lg:hidden" : ""}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            <div className="bg-[#171717] rounded-lg border border-gray-800 p-3 sticky top-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-sm">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs border border-white"
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedCountry("All Countries")
                    setSelectedCounty("All Counties")
                    setSearchQuery("")
                  }}
                  aria-label="Reset filters"
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium mb-1 block" htmlFor="location-input">
                    Location
                  </label>
                  <div className="relative">
                    <Input
                      id="location-input"
                      placeholder="Current location"
                      className="pl-7 h-8 text-xs"
                      aria-label="Enter location"
                    />
                    <MapPin className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1 block" htmlFor="date-select">
                    Date
                  </label>
                  <Select defaultValue="any">
                    <SelectTrigger id="date-select" className="h-8 text-xs">
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#171717] text-gray-100">
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="weekend">This weekend</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1 block" htmlFor="category-select">
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category-select" className="h-8 text-xs">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#171717] text-gray-100">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1 block" htmlFor="country-select">
                    Country
                  </label>
                  <Select
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                  >
                    <SelectTrigger id="country-select" className="h-8 text-xs">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#171717] text-gray-100">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCountry === "Kenya" && (
                  <div>
                    <label className="text-xs font-medium mb-1 block" htmlFor="county-select">
                      County
                    </label>
                    <Select
                      value={selectedCounty}
                      onValueChange={setSelectedCounty}
                    >
                      <SelectTrigger id="county-select" className="h-8 text-xs">
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#171717] text-gray-100">
                        {counties.map((county) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium mb-1 block">Price</label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 w-full text-white border-gray-700 bg-black/50 hover:bg-black"
                      aria-label="Filter by free events"
                    >
                      Free
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 w-full text-white border-gray-700 bg-black/50 hover:bg-black"
                      aria-label="Filter by paid events"
                    >
                      Paid
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <div className={`flex-1 ${mapExpanded ? "w-full" : ""}`}>
            {/* Search bar */}
            <motion.div
              className="relative mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 rounded-full bg-[#171717] border-gray-800 focus:border-gray-600 transition-all duration-300"
                aria-label="Search events"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <div className="absolute right-1 top-1">
                <Button
                  className="rounded-full bg-black text-gray-100 border border-[#171717] hover:bg-[#171717] h-8 text-xs"
                  disabled={isLoading}
                  aria-label={isLoading ? "Searching" : "Search events"}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </motion.div>

            {/* Category quick filters */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            >
              {categories.map((category) => (
                <div key={category}>
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 cursor-pointer text-gray-100 border-gray-800 text-xs ${
                      selectedCategory === category ? "bg-white/10" : "bg-black/30"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    role="button"
                    aria-label={`Filter by ${category}`}
                  >
                    {category}
                  </Badge>
                </div>
              ))}
            </motion.div>

            {/* Flexible layout */}
            <Suspense fallback={<Loading />}>
              <div className={`flex ${isTablet ? "flex-col" : "flex-row"} gap-4`}>
                {/* Events list */}
                <div
                  className={`${mapExpanded ? "hidden lg:block lg:w-1/3" : isTablet ? "w-full" : "w-1/2"} transition-all duration-300`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-sm">Event Listings</h2>
                    {!isTablet && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleMapExpanded}
                        className="bg-black border-gray-800 text-white h-7 text-xs"
                        aria-label={mapExpanded ? "Show event list" : "Expand map"}
                      >
                        {mapExpanded ? (
                          <>
                            <ChevronLeft className="h-3 w-3 mr-1" />
                            Show List
                          </>
                        ) : (
                          <>
                            Expand Map
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div
                    className={`grid grid-cols-1 ${!mapExpanded && !isTablet ? "md:grid-cols-2 lg:grid-cols-2" : "lg:grid-cols-1"} gap-3 overflow-y-auto pr-2`}
                    style={{ maxHeight: isTablet ? "auto" : "65vh" }}
                  >
                    <AnimatePresence>
                      {isLoading ? (
                        <Loading />
                      ) : currentEvents.length > 0 ? (
                        currentEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                            onClick={() => handleEventClick(event.id)}
                            className={selectedEvent === event.id ? "ring-2 ring-white/20 rounded-lg" : ""}
                          >
                            <EventCard
                              id={event.id}
                              title={event.title}
                              image={event.image}
                              date={event.date}
                              location={event.location}
                              distance={event.distance}
                              price={event.price}
                              category={event.category}
                              selected={selectedEvent === event.id}
                            />
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full flex justify-center">
                          <NoEvents />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {filteredEvents.length > eventsPerPage && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>

                {/* Map */}
                <div
                  className={`${mapExpanded ? "w-full lg:w-2/3" : isTablet ? "w-full" : "w-1/2"} transition-all duration-300`}
                >
                  {isTablet && !mapExpanded && (
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="font-semibold text-sm">Event Map</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleMapExpanded}
                        className="bg-black border-gray-800 text-white h-7 text-xs"
                        aria-label={mapExpanded ? "Show event list" : "Expand map"}
                      >
                        {mapExpanded ? (
                          <>
                            <ChevronLeft className="h-3 w-3 mr-1" />
                            Show List
                          </>
                        ) : (
                          <>
                            Expand Map
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  <div className="h-[65vh] rounded-lg overflow-hidden border border-gray-800 relative w-full">
                    {memoizedMap}
                    {mapExpanded && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleMapExpanded}
                        className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-sm border-gray-700 text-white h-8 text-xs"
                        aria-label="Show event list"
                      >
                        <ChevronLeft className="h-3 w-3 mr-1" />
                        Show List
                      </Button>
                    )}
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-black/70 backdrop-blur-sm border-gray-700"
                        aria-label="Zoom in"
                      >
                        +
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-black/70 backdrop-blur-sm border-gray-700"
                        aria-label="Zoom out"
                      >
                        -
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}