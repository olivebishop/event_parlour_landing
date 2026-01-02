"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar, 
  Users, 
  BarChart3, 
  CreditCard, 
  Mic2, 
  Settings, 
  Ticket, 
  MapPin, 
  Share2, 
  Home,
  Store,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Link2,
  Clock,
  Globe,
  Bell,
  Wallet,
  LayoutDashboard,
  UserPlus,
  CalendarDays,
  FileText,
  Mail
} from "lucide-react"
import ScrollReveal from "@/components/shared/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Feature categories
type CategoryKey = "organizers" | "attendees" | "vendors"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  capabilities: string[]
  comingSoon?: boolean
  image?: string
}

interface Category {
  id: CategoryKey
  label: string
  icon: React.ReactNode
  tagline: string
  description: string
  features: Feature[]
}

const categories: Category[] = [
  {
    id: "organizers",
    label: "For Organizers",
    icon: <Settings className="w-4 h-4" />,
    tagline: "Everything you need to run successful events",
    description: "Powerful tools to manage your events from start to finish. Track sales, manage speakers, analyze performance, and create lasting memories for your attendees.",
    features: [
      {
        icon: <LayoutDashboard className="w-6 h-6" />,
        title: "Workspace Management",
        description: "Centralized dashboard to manage all your events, team members, and resources in one place.",
        capabilities: [
          "Multi-event management",
          "Team collaboration & roles",
          "Custom branding per workspace",
          "Resource allocation",
          "Activity logs & audit trails"
        ]
      },
      {
        icon: <Mic2 className="w-6 h-6" />,
        title: "Keynote Speaker Management",
        description: "Find, book, and manage keynote speakers for your tech and music events with ease.",
        capabilities: [
          "Speaker directory & search",
          "Booking & scheduling",
          "Contract management",
          "Speaker travel & logistics",
          "Session planning & agenda"
        ]
      },
      {
        icon: <Calendar className="w-6 h-6" />,
        title: "Event Management",
        description: "Create, customize, and manage every aspect of your events from a single powerful interface.",
        capabilities: [
          "Event creation wizard",
          "Venue management",
          "Agenda & schedule builder",
          "Attendee capacity control",
          "Multi-ticket types & tiers"
        ]
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Analytics & Insights",
        description: "Real-time analytics to understand your audience and optimize your event performance.",
        capabilities: [
          "Ticket sales dashboard",
          "Attendee demographics",
          "Revenue tracking",
          "Conversion funnels",
          "Custom reports & exports"
        ]
      },
      {
        icon: <CreditCard className="w-6 h-6" />,
        title: "Track Sales & Payments",
        description: "Complete financial oversight with integrated payment processing and revenue tracking.",
        capabilities: [
          "Real-time sales tracking",
          "Multiple payment gateways",
          "Automated payouts",
          "Refund management",
          "Tax & invoice generation"
        ]
      },
      {
        icon: <ImageIcon className="w-6 h-6" />,
        title: "Post-Event Memories",
        description: "Keep attendees engaged after the event with recap links, photos, and memorable moments.",
        capabilities: [
          "Event recap emails",
          "Photo & video galleries",
          "Shareable memory links",
          "Attendee feedback surveys",
          "Event highlights compilation"
        ]
      }
    ]
  },
  {
    id: "attendees",
    label: "For Attendees",
    icon: <Users className="w-4 h-4" />,
    tagline: "Discover, attend, and connect",
    description: "Discover and attend events, manage your tickets, and connect with other attendees. Transfer tickets easily and build your event network.",
    features: [
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Discover Events",
        description: "Find exciting events happening around you based on your interests and location.",
        capabilities: [
          "Personalized recommendations",
          "Location-based search",
          "Category & genre filters",
          "Event calendar sync",
          "Save & bookmark events"
        ]
      },
      {
        icon: <MapPin className="w-6 h-6" />,
        title: "Events Near You",
        description: "Never miss local events with smart location-based discovery and notifications.",
        capabilities: [
          "GPS-based event finder",
          "Radius & distance filters",
          "Local trending events",
          "Neighborhood alerts",
          "Map view exploration"
        ]
      },
      {
        icon: <Ticket className="w-6 h-6" />,
        title: "Ticket Management",
        description: "All your tickets in one place with easy access and transfer capabilities.",
        capabilities: [
          "Digital ticket wallet",
          "QR code entry",
          "Ticket transfers",
          "Purchase history",
          "Refund requests"
        ]
      },
      {
        icon: <UserPlus className="w-6 h-6" />,
        title: "Connect & Network",
        description: "Build your event network and connect with like-minded attendees.",
        capabilities: [
          "Attendee profiles",
          "In-event messaging",
          "Social connections",
          "Group coordination",
          "Contact exchange"
        ]
      },
      {
        icon: <Home className="w-6 h-6" />,
        title: "Event Stays",
        description: "Book accommodation based on event location for a seamless experience.",
        capabilities: [
          "Nearby accommodations",
          "Event-based booking",
          "Group lodging options",
          "Verified listings",
          "Integrated checkout"
        ],
        comingSoon: true
      },
      {
        icon: <Bell className="w-6 h-6" />,
        title: "Smart Notifications",
        description: "Stay updated with personalized alerts for events you care about.",
        capabilities: [
          "Event reminders",
          "Price drop alerts",
          "New event notifications",
          "Check-in prompts",
          "Post-event updates"
        ]
      }
    ]
  },
  {
    id: "vendors",
    label: "For Vendors",
    icon: <Store className="w-4 h-4" />,
    tagline: "Join our event vendor network",
    description: "Join our event vendor network to start offering your services for exciting events and create unforgettable experiences.",
    features: [
      {
        icon: <FileText className="w-6 h-6" />,
        title: "Service Listings",
        description: "Showcase your services with rich profiles and portfolios to attract event organizers.",
        capabilities: [
          "Custom service profiles",
          "Portfolio showcase",
          "Pricing packages",
          "Availability calendar",
          "Reviews & ratings"
        ],
        comingSoon: true
      },
      {
        icon: <CalendarDays className="w-6 h-6" />,
        title: "Booking Management",
        description: "Manage all your event bookings, schedules, and client communications in one place.",
        capabilities: [
          "Booking calendar",
          "Request management",
          "Client communication",
          "Contract templates",
          "Booking confirmations"
        ],
        comingSoon: true
      },
      {
        icon: <Wallet className="w-6 h-6" />,
        title: "Payment Processing",
        description: "Secure payment handling with multiple payout options and financial tracking.",
        capabilities: [
          "Secure payments",
          "Multiple payout methods",
          "Invoice generation",
          "Payment tracking",
          "Earning reports"
        ],
        comingSoon: true
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Vendor Analytics",
        description: "Track your performance, bookings, and revenue with detailed analytics.",
        capabilities: [
          "Booking statistics",
          "Revenue tracking",
          "Performance metrics",
          "Client insights",
          "Growth reports"
        ],
        comingSoon: true
      },
      {
        icon: <Mail className="w-6 h-6" />,
        title: "Event Applications",
        description: "Apply to participate in events and get discovered by organizers looking for vendors.",
        capabilities: [
          "Browse event opportunities",
          "One-click applications",
          "Application tracking",
          "Direct organizer contact",
          "Event matching"
        ],
        comingSoon: true
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Vendor Network",
        description: "Connect with other vendors, collaborate on events, and grow your network.",
        capabilities: [
          "Vendor community",
          "Collaboration opportunities",
          "Referral program",
          "Industry insights",
          "Networking events"
        ],
        comingSoon: true
      }
    ]
  }
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300",
        feature.comingSoon && "opacity-80"
      )}
    >
      {/* Coming Soon Badge */}
      {feature.comingSoon && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30 text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Coming Soon
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-4 group-hover:from-white/15 group-hover:to-white/10 transition-colors">
        <div className="text-white">
          {feature.icon}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{feature.description}</p>

      {/* Capabilities */}
      <ul className="space-y-2">
        {feature.capabilities.map((capability, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>{capability}</span>
          </li>
        ))}
      </ul>
    </motion.div>
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
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
        isActive 
          ? "bg-white text-black shadow-lg shadow-white/10" 
          : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-700/50"
      )}
    >
      {category.icon}
      <span>{category.label}</span>
    </button>
  )
}

export default function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("organizers")
  
  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0]

  return (
    <section className="py-16 sm:py-20 lg:py-28 dark">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 bg-zinc-800 text-zinc-300 border-zinc-700">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              From event creation to post-event memories. All the tools you need to create, 
              manage, and attend unforgettable events.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal direction="up" delay={0.1} duration={0.7} threshold={0.2}>
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 sm:gap-3 p-1.5 bg-zinc-900/50 rounded-full border border-zinc-800 overflow-x-auto no-scrollbar">
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Header */}
            <div className="text-center mb-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                {currentCategory.tagline}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                {currentCategory.description}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory.features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>

            {/* Vendor CTA for coming soon */}
            {activeCategory === "vendors" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 rounded-2xl border border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Vendor Portal Coming Soon</p>
                      <p className="text-sm text-zinc-400">Be the first to know when we launch</p>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2">
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Attendee Airbnb CTA */}
            {activeCategory === "attendees" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 rounded-2xl border border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Home className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Airbnb for Events</p>
                      <p className="text-sm text-zinc-400">Book stays based on event locations - Coming Soon</p>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2">
                    Get Notified
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
