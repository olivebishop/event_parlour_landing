import React from "react"
import { 
  Calendar, 
  Users, 
  BarChart3, 
  CreditCard, 
  Mic2, 
  Settings,
  Ticket, 
  MapPin, 
  Globe,
  Bell,
  LayoutDashboard,
  UserPlus,
  Image as ImageIcon,
  TrendingUp,
  Search,
} from "lucide-react"

export type CategoryKey = "organizers" | "attendees"

export interface Feature {
  icon: React.ReactNode
  label: string
  title: string
  description: string
  capabilities: string[]
  image: string
}

export interface Category {
  id: CategoryKey
  label: string
  icon: React.ReactNode
  features: Feature[]
}

export const categories: Category[] = [
  {
    id: "organizers",
    label: "For Organizers",
    icon: <Settings className="w-4 h-4" />,
    features: [
      {
        icon: <TrendingUp className="w-5 h-5" />,
        label: "REACH YOUR AUDIENCE",
        title: "Get discovered by thousands of event-goers.",
        description: "Your events appear in our marketplace where active attendees search by category and location. No marketing needed—we bring the audience to you.",
        capabilities: [
          "Marketplace visibility",
          "Category-based discovery",
          "Location targeting",
          "Active attendee base"
        ],
        image: "/images/workspace.png"
      },
      {
        icon: <Search className="w-5 h-5" />,
        label: "GET FOUND BY THE RIGHT PEOPLE",
        title: "Events that match attendee interests.",
        description: "When someone in Nairobi searches for tech events or music festivals, your event shows up. We connect organizers with people actively looking for experiences.",
        capabilities: [
          "Smart matching",
          "Interest-based discovery",
          "Local search optimization",
          "Trending events boost"
        ],
        image: "/images/analytics.svg"
      },
      {
        icon: <Calendar className="w-5 h-5" />,
        label: "END-TO-END EVENTS",
        title: "Create events that sell out.",
        description: "From creation to check-in, manage every aspect of your events.",
        capabilities: [
          "Event creation wizard",
          "Venue management",
          "Agenda builder",
          "Multi-ticket tiers"
        ],
        image: "/images/org.svg"
      },
      {
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: "CENTRALIZED CONTROL",
        title: "Manage everything from one dashboard.",
        description: "Your events, team, and resources—all in one powerful workspace.",
        capabilities: [
          "Multi-event management",
          "Team collaboration & roles",
          "Custom branding",
          "Activity logs"
        ],
        image: "/images/workspace.png"
      },
      {
        icon: <Mic2 className="w-5 h-5" />,
        label: "BOOK TOP TALENT",
        title: "Find and manage keynote speakers.",
        description: "Search, book, and coordinate speakers for your tech and music events.",
        capabilities: [
          "Speaker directory",
          "Booking & scheduling",
          "Contract management",
          "Session planning"
        ],
        image: "/images/speaker.svg"
      },
      {
        icon: <Calendar className="w-5 h-5" />,
        label: "END-TO-END EVENTS",
        title: "Create events that sell out.",
        description: "From creation to check-in, manage every aspect of your events.",
        capabilities: [
          "Event creation wizard",
          "Venue management",
          "Agenda builder",
          "Multi-ticket tiers"
        ],
        image: "/images/org.svg"
      },
      {
        icon: <BarChart3 className="w-5 h-5" />,
        label: "DATA-DRIVEN DECISIONS",
        title: "Analytics that drive growth.",
        description: "Real-time insights to understand your audience and optimize performance.",
        capabilities: [
          "Sales dashboard",
          "Demographics",
          "Revenue tracking",
          "Custom reports"
        ],
        image: "/images/analytics.svg"
      },
      {
        icon: <CreditCard className="w-5 h-5" />,
        label: "SEAMLESS PAYMENTS",
        title: "Track every sale, automate payouts.",
        description: "Complete financial oversight with integrated payment processing.",
        capabilities: [
          "Real-time tracking",
          "Multiple gateways",
          "Automated payouts",
          "Invoice generation"
        ],
        image: "/images/revenue.svg"
      },
      {
        icon: <ImageIcon className="w-5 h-5" />,
        label: "POST-EVENT MAGIC",
        title: "Keep the memories alive.",
        description: "Engage attendees with recap links, photos, and memorable moments.",
        capabilities: [
          "Recap emails",
          "Photo galleries",
          "Shareable links",
          "Feedback surveys"
        ],
        image: "/images/storage.svg"
      }
    ]
  },
  {
    id: "attendees",
    label: "For Attendees",
    icon: <Users className="w-4 h-4" />,
    features: [
      {
        icon: <Globe className="w-5 h-5" />,
        label: "DISCOVER WHAT'S HOT",
        title: "Find events you'll love.",
        description: "Personalized recommendations based on your interests and location.",
        capabilities: [
          "Smart recommendations",
          "Location search",
          "Genre filters",
          "Calendar sync"
        ],
        image: "/images/attendee.svg"
      },
      {
        icon: <MapPin className="w-5 h-5" />,
        label: "LOCAL & LIVE",
        title: "Events happening near you.",
        description: "Never miss local events with smart location-based discovery.",
        capabilities: [
          "GPS finder",
          "Distance filters",
          "Trending events",
          "Map exploration"
        ],
        image: "/images/near.svg"
      },
      {
        icon: <Ticket className="w-5 h-5" />,
        label: "YOUR TICKETS, SIMPLIFIED",
        title: "All your tickets in one place.",
        description: "Easy access, quick transfers, and seamless entry with QR codes.",
        capabilities: [
          "Digital wallet",
          "QR code entry",
          "Ticket transfers",
          "Purchase history"
        ],
        image: "/images/tickets.svg"
      },
      {
        icon: <UserPlus className="w-5 h-5" />,
        label: "BUILD YOUR NETWORK",
        title: "Connect with fellow fans.",
        description: "Meet like-minded attendees and grow your event network.",
        capabilities: [
          "Attendee profiles",
          "In-event messaging",
          "Group coordination",
          "Contact exchange"
        ],
        image: "/images/connect.svg"
      },
      {
        icon: <Bell className="w-5 h-5" />,
        label: "NEVER MISS OUT",
        title: "Smart alerts for events you care about.",
        description: "Get notified about new events, price drops, and check-in reminders.",
        capabilities: [
          "Event reminders",
          "Price alerts",
          "New event notifications",
          "Check-in prompts"
        ],
        image: "/images/alerts.svg"
      }
    ]
  }
]
