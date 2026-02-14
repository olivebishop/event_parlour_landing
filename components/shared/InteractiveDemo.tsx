"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import ScrollReveal from "@/components/shared/animations/scroll-reveal"
import { useTranslations } from "@/lib/i18n/translations"
import {
  Calendar,
  Ticket,
  TrendingUp,
  CalendarCheck,
  Plus,
  ArrowRight,
  Users,
  MapPin,
  LayoutDashboard,
  BarChart3,
  Settings,
  Search,
  MessageSquare,
  HelpCircle,
  Mic,
  ShieldCheck,
  ChevronDown,
  Bell,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
// Import demo components
import EventsDemoOrganizer from "@/components/demo/organizer/EventsDemo"
import KYCDemo from "@/components/demo/organizer/KYCDemo"
import ChannelsDemoOrganizer from "@/components/demo/organizer/ChannelsDemo"
import SpeakersDemo from "@/components/demo/organizer/SpeakersDemo"
import TicketsDemoOrganizer from "@/components/demo/organizer/TicketsDemo"
import AnalyticsDemoOrganizer from "@/components/demo/organizer/AnalyticsDemo"
import SettingsDemoOrganizer from "@/components/demo/organizer/SettingsDemo"
import SupportDemoOrganizer from "@/components/demo/organizer/SupportDemo"
import EventsDemoAttendee from "@/components/demo/attendee/EventsDemo"
import ChannelsDemoAttendee from "@/components/demo/attendee/ChannelsDemo"
import TicketsDemoAttendee from "@/components/demo/attendee/TicketsDemo"
import AnalyticsDemoAttendee from "@/components/demo/attendee/AnalyticsDemo"
import SettingsDemoAttendee from "@/components/demo/attendee/SettingsDemo"
import SupportDemoAttendee from "@/components/demo/attendee/SupportDemo"
import { mockRecentActivity, mockUpcomingEvents } from "@/components/demo/mockData"
import { format } from "date-fns"

// Mock data for demo
const mockEvents = [
  {
    id: 1,
    title: "Nairobi Tech Summit 2025",
    date: "Mar 15, 2025",
    location: "Nairobi, Kenya",
    attendees: 450,
    status: "active",
    revenue: "KES 2.4M",
  },
  {
    id: 2,
    title: "Music Festival Weekend",
    date: "Apr 20, 2025",
    location: "Mombasa, Kenya",
    attendees: 1200,
    status: "active",
    revenue: "KES 5.8M",
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "Feb 28, 2025",
    location: "Nairobi, Kenya",
    attendees: 180,
    status: "draft",
    revenue: "KES 0",
  },
]

const mockAttendeeEvents = [
  {
    id: 1,
    title: "Nairobi Tech Summit 2025",
    date: "Mar 15, 2025",
    tickets: 2,
    status: "confirmed",
  },
  {
    id: 2,
    title: "Music Festival Weekend",
    date: "Apr 20, 2025",
    tickets: 1,
    status: "confirmed",
  },
]

type DemoMode = "organizer" | "attendee"

// Workspace Default Avatar SVG (Netflix-style)
function WorkspaceDefaultAvatarSvg() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Workspace default avatar</title>
      <g id="Page-1" fill="none" fillRule="evenodd">
        <g id="Never-Users-Own-Profile" fill="currentColor">
          <g id="profile3" transform="translate(31 50)">
            <circle id="left-eye" cx="12" cy="12" r="12" />
            <circle id="right-eye" cx="123" cy="12" r="12" />
            <path
              d="M89.5 66.67c13.55 0 27.1-5.93 40.66-17.78 1.3-.53 2.58-.2 3.87 1 1.3 1.17 1.3 2.7 0 4.54C119.5 67.48 104.67 74 89.5 74c-15.17 0-30-6.52-44.53-19.56-1.3-1.85-1.3-3.37 0-4.55 1.3-1.2 2.58-1.53 3.87-1C62.4 60.73 75.94 66.66 89.5 66.66z"
              id="smile"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

// Team Dropdown Component (simplified for demo)
function TeamDropdown({ isExpanded }: { isExpanded: boolean }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="w-full relative">
      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className="w-full flex items-center justify-center p-2 rounded transition-colors hover:bg-accent"
      >
        <div className="h-8 w-8 shrink-0 border border-border bg-black text-white dark:bg-white dark:text-black overflow-hidden rounded flex items-center justify-center">
          <WorkspaceDefaultAvatarSvg />
        </div>
      </button>
    </div>
  )
}

// Attendee Profile Component (simplified for demo)
function AttendeeProfile({ isExpanded }: { isExpanded: boolean }) {
  const getInitials = (name: string): string => {
    if (!name) return "O"
    const parts = name.trim().split(/\s+/).filter((part) => part.length > 0)
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
    } else if (parts.length === 1) {
      const singleName = parts[0]
      if (singleName.length >= 2) {
        return singleName.substring(0, 2).toUpperCase()
      }
      return singleName.charAt(0).toUpperCase()
    }
    return "O"
  }

  const displayName = "Olive"
  const initials = getInitials(displayName)

  return (
    <div className="w-full flex items-center justify-center p-2 rounded transition-colors hover:bg-accent">
      <div className="h-8 w-8 shrink-0 border border-border bg-gradient-to-br from-secondary to-secondary/70 text-foreground overflow-hidden rounded-lg flex items-center justify-center">
        <span className="text-xs font-semibold">{initials}</span>
      </div>
    </div>
  )
}

// Sidebar Navigation Component
function Sidebar({ activeView, mode, onNavigate }: { activeView: string; mode: DemoMode; onNavigate: (view: string) => void }) {
  // Organizer navigation items (main items only, no sub-items)
  const organizerNavItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      id: "dashboard",
    },
    { 
      icon: Calendar, 
      label: "Events", 
      id: "events",
    },
    { 
      icon: ShieldCheck, 
      label: "KYC Verification", 
      id: "kyc",
    },
    { 
      icon: MessageSquare, 
      label: "Channels", 
      id: "channels",
    },
    { 
      icon: Mic, 
      label: "Speakers", 
      id: "speakers",
    },
    { 
      icon: Ticket, 
      label: "Tickets", 
      id: "tickets",
    },
    { 
      icon: BarChart3, 
      label: "Analytics", 
      id: "analytics",
    },
    { 
      icon: Settings, 
      label: "Settings", 
      id: "settings",
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      id: "support",
    },
  ]

  // Attendee navigation items (main items only, no sub-items)
  const attendeeNavItems = [
    { 
      icon: LayoutDashboard, 
      label: "My Dashboard", 
      id: "dashboard",
    },
    { 
      icon: Calendar, 
      label: "Events", 
      id: "events",
    },
    { 
      icon: MessageSquare, 
      label: "Channels", 
      id: "channels",
    },
    { 
      icon: Ticket, 
      label: "Tickets", 
      id: "tickets",
    },
    { 
      icon: BarChart3, 
      label: "Analytics", 
      id: "analytics",
    },
    { 
      icon: Settings, 
      label: "Settings", 
      id: "settings",
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      id: "support",
    },
  ]

  const navItems = mode === "organizer" ? organizerNavItems : attendeeNavItems

  return (
    <div className="flex flex-col w-16 bg-muted/50 border-r border-border h-full rounded-l-lg">
      <div className="p-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary dark:bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">EP</span>
        </div>
      </div>
      <nav className="flex-1 py-4 space-y-1 overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center justify-center p-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
            </button>
          )
        })}
      </nav>
      {/* Bottom section - Team Dropdown for organizer, Attendee Profile for attendee */}
      <div className="p-3 border-t border-border">
        {mode === "organizer" ? (
          <TeamDropdown isExpanded={false} />
        ) : (
          <AttendeeProfile isExpanded={false} />
        )}
      </div>
    </div>
  )
}

// Mode Toggle Component (simplified for demo)
function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="inline-flex items-center rounded-md border border-border bg-background p-1 gap-1">
        <div className="w-8 h-8 rounded-sm" />
        <div className="w-8 h-8 rounded-sm" />
      </div>
    )
  }

  return (
    <div className="inline-flex items-center rounded-md border border-border bg-background p-1 gap-1">
      <button
        type="button"
        className={cn(
          "flex items-center justify-center transition-all duration-200 w-8 h-8 rounded-sm",
          theme === "light"
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent/50"
        )}
        onClick={() => setTheme("light")}
        title="Switch to light theme"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={cn(
          "flex items-center justify-center transition-all duration-200 w-8 h-8 rounded-sm",
          theme === "dark"
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent/50"
        )}
        onClick={() => setTheme("dark")}
        title="Switch to dark theme"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  )
}

// Top Header Component
function TopHeader({ onSwitch, mode }: { onSwitch: () => void; mode: DemoMode }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [showSignOutDialog, setShowSignOutDialog] = useState(false)

  const formatDate = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return now.toLocaleDateString("en-US", options)
  }

  const getInitials = (name: string): string => {
    if (!name) return "O"
    const parts = name.trim().split(/\s+/).filter((part) => part.length > 0)
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
    } else if (parts.length === 1) {
      const singleName = parts[0]
      if (singleName.length >= 2) {
        return singleName.substring(0, 2).toUpperCase()
      }
      return singleName.charAt(0).toUpperCase()
    }
    return "O"
  }

  const displayName = "Olive"
  const initials = getInitials(displayName)
  const unreadCount = 3 // Mock unread notifications

  return (
    <>
      <div className="h-14 md:h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 md:px-6 rounded-tr-lg">
        {/* Left side - Search button */}
        <div className="flex-1 flex justify-start ml-4 md:ml-0 mr-4 max-w-none">
          <div className="w-full max-w-sm flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full max-w-sm justify-start text-muted-foreground"
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Search...</span>
            </Button>
          </div>
        </div>
        {/* Right side - Date, Notifications, View switch, Profile */}
        <div className="flex items-center space-x-2 ml-auto">
          <div className="flex items-center space-x-1.5">
            <div className="hidden sm:flex items-center text-xs text-muted-foreground font-normal whitespace-nowrap">
              {formatDate()}
            </div>
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              {/* Notification Panel */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">New event created</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">Ticket purchase confirmed</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <p className="text-sm font-medium">Event reminder</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSwitch}
              className="text-xs"
            >
              {mode === "organizer" ? "View as Attendee" : "View as Organizer"}
            </Button>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="rounded-full p-0 bg-transparent border-0 outline-none"
              >
                <div className="rounded-full w-8 h-8 cursor-pointer border-2 border-border overflow-hidden flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/70">
                  <span className="text-xs font-semibold text-foreground">{initials}</span>
                </div>
              </button>
              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-[240px] bg-popover border border-border rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border-2 border-border overflow-hidden flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/70">
                        <span className="text-sm font-semibold text-foreground">{initials}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="truncate text-sm font-medium">{displayName}</span>
                        <span className="truncate text-xs text-muted-foreground font-normal">
                          olive@example.com
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-1">
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent text-sm cursor-pointer"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Account
                    </button>
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent text-sm cursor-pointer"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent text-sm cursor-pointer"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      Support
                    </button>
                  </div>
                  <div className="border-t border-border p-1">
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-destructive/10 text-sm cursor-pointer text-destructive"
                      onClick={() => {
                        setShowSignOutDialog(true)
                        setIsProfileOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                  <div className="border-t border-border p-2">
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-sm">Theme</p>
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sign Out Dialog */}
      {showSignOutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-popover border border-border rounded-lg shadow-lg w-full max-w-[425px] mx-4">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <LogOut className="h-5 w-5 text-destructive" />
                <h2 className="text-lg font-semibold">Sign Out</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to sign out? You'll need to sign in again to access your account.
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSignOutDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowSignOutDialog(false)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Click outside to close */}
      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsNotificationOpen(false)
            setIsProfileOpen(false)
          }}
        />
      )}
    </>
  )
}

// Organizer Dashboard Wrapper
function OrganizerDashboardWrapper({ onSwitch, activeView, setActiveView }: { onSwitch: () => void; activeView: string; setActiveView: (view: string) => void }) {
  return (
    <div className="flex h-[600px] bg-[#ffffff] dark:bg-background overflow-hidden rounded-lg border border-border">
      <Sidebar activeView={activeView} mode="organizer" onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader onSwitch={onSwitch} mode="organizer" />
        <OrganizerDashboardContent activeView={activeView} />
      </div>
    </div>
  )
}

// Organizer Dashboard Content
function OrganizerDashboardContent({ activeView }: { activeView: string }) {
  const renderContent = () => {
    switch (activeView) {
      case "events":
        return <EventsDemoOrganizer />
      case "kyc":
        return <KYCDemo />
      case "channels":
        return <ChannelsDemoOrganizer />
      case "speakers":
        return <SpeakersDemo />
      case "tickets":
        return <TicketsDemoOrganizer />
      case "analytics":
        return <AnalyticsDemoOrganizer />
      case "settings":
        return <SettingsDemoOrganizer />
      case "support":
        return <SupportDemoOrganizer />
      default:
        return (
          <div className="flex-1 overflow-hidden p-6">
            <div className="h-full flex flex-col gap-4">
              {/* Header */}
              <div className="flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                      Welcome back, Olive
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                      Here&apos;s what&apos;s happening with your workspace
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs sm:text-sm">
                    Owner
                  </Badge>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 flex-shrink-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Total Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="text-xl sm:text-2xl font-bold">12</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      3 active this month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Team Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="text-xl sm:text-2xl font-bold">8</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      Active members
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Tickets Sold</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="text-xl sm:text-2xl font-bold">2,450</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      +15 free registrations
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="text-xl sm:text-2xl font-bold">KES 8.2M</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      From 245 purchases
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Content Section */}
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6 flex-1 min-h-0 overflow-hidden">
                {/* Recent Activity */}
                <Card className="lg:col-span-4 flex flex-col min-h-0 overflow-hidden">
                  <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6 flex-shrink-0">
                    <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Recent ticket sales and registrations
                    </p>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 flex-1 overflow-hidden">
                    {mockRecentActivity.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                        <div className="rounded-full bg-muted p-3 sm:p-4 mb-3 sm:mb-4">
                          <Ticket className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2">
                          No recent activity
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
                          Create your first event to see ticket sales here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mockRecentActivity.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Ticket className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.userName} • {item.eventTitle}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.type === "ticket_purchase"
                                  ? `Purchased ${item.quantity} ticket${item.quantity === 1 ? "" : "s"}`
                                  : "Registered for free event"}
                                {" • "}
                                {item.createdAt
                                  ? format(new Date(item.createdAt), "MMM d, yyyy")
                                  : ""}
                              </p>
                            </div>
                            {item.type === "ticket_purchase" && item.price > 0 && (
                              <div className="text-sm font-medium">
                                KES {item.price.toLocaleString()}
                              </div>
                            )}
                            {item.type === "free_registration" && (
                              <Badge variant="secondary" className="text-xs">
                                Free
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="lg:col-span-3 flex flex-col min-h-0 overflow-hidden">
                  <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6 flex-shrink-0">
                    <CardTitle className="text-base sm:text-lg">Upcoming Events</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Your scheduled events
                    </p>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 flex-1 overflow-hidden">
                    {mockUpcomingEvents.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="rounded-full bg-muted p-3 mb-3">
                          <Calendar className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">No upcoming events</h3>
                        <p className="text-xs text-muted-foreground max-w-xs">
                          Create an event to get started
                        </p>
                        <a
                          href="https://app.eventparlour.com/auth/sign-up"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 text-xs text-primary hover:underline"
                        >
                          Create event <ArrowRight className="inline h-3 w-3 ml-0.5" />
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {mockUpcomingEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="block p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {event.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {event.startDate
                                    ? format(new Date(event.startDate), "EEE, MMM d • h:mm a")
                                    : "Date TBD"}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {event.eventType === "online"
                                    ? "Online Event"
                                    : event.venue || event.city || "Location TBD"}
                                </p>
                              </div>
                              <Badge
                                variant={event.status === "active" ? "default" : "secondary"}
                                className="text-xs flex-shrink-0"
                              >
                                {event.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
    }
  }

  return renderContent()
}

// Attendee Dashboard Wrapper
function AttendeeDashboardWrapper({ onSwitch, activeView, setActiveView }: { onSwitch: () => void; activeView: string; setActiveView: (view: string) => void }) {
  return (
    <div className="flex h-[600px] bg-[#ffffff] dark:bg-background overflow-hidden rounded-lg border border-border">
      <Sidebar activeView={activeView} mode="attendee" onNavigate={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader onSwitch={onSwitch} mode="attendee" />
        <AttendeeDashboardContent activeView={activeView} />
      </div>
    </div>
  )
}

// Attendee Dashboard Content
function AttendeeDashboardContent({ activeView }: { activeView: string }) {
  const renderContent = () => {
    switch (activeView) {
      case "events":
        return <EventsDemoAttendee />
      case "channels":
        return <ChannelsDemoAttendee />
      case "tickets":
        return <TicketsDemoAttendee />
      case "analytics":
        return <AnalyticsDemoAttendee />
      case "settings":
        return <SettingsDemoAttendee />
      case "support":
        return <SupportDemoAttendee />
      default:
        return (
          <div className="flex-1 overflow-hidden p-6">
          <div className="h-full flex flex-col gap-4">
            {/* Header */}
            <div className="flex-shrink-0">
              <h3 className="text-2xl font-bold text-foreground mb-1">My Dashboard</h3>
              <p className="text-sm text-muted-foreground">Your events and tickets</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
        <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                <CardTitle className="text-xs font-medium">Tickets Purchased</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">From 3 purchases</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                <CardTitle className="text-xs font-medium">Free Registrations</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Upcoming events</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                <CardTitle className="text-xs font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">In the next 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                <CardTitle className="text-xs font-medium">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">KES 12.5K</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card>
          </div>

            {/* Upcoming Events */}
            <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6 flex-shrink-0 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    <p className="text-sm text-muted-foreground">Events you're attending</p>
                  </div>
                  <a
                    href="https://app.eventparlour.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Browse events on EventParlour"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      Browse Events
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 flex-1 overflow-hidden flex flex-col">
                <div className="space-y-3 flex-1">
                  {mockAttendeeEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {event.tickets} ticket{event.tickets > 1 ? "s" : ""}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          variant={event.status === "confirmed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        )
    }
  }

  return renderContent()
}

export default function InteractiveDemo() {
  const [demoMode, setDemoMode] = useState<DemoMode>("organizer")
  const [activeView, setActiveView] = useState<string>("dashboard")
  const t = useTranslations("InteractiveDemo")

  // Reset active view when switching modes
  const handleModeSwitch = (newMode: DemoMode) => {
    setDemoMode(newMode)
    setActiveView("dashboard")
  }

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden relative bg-[#ffffff] dark:bg-background">
      {/* Gradient background overlay - left to right: white to #000000 (light mode) */}
      <div 
        className="absolute inset-0 dark:hidden pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #ffffff, transparent, #000000)',
          opacity: '0.15',
        }}
      />
      {/* Gradient background overlay - left to right: dark gradient (dark mode) */}
      <div 
        className="absolute inset-0 hidden dark:block pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #000000, transparent, #0f0f0f)',
          opacity: '0.1',
        }}
      />
      
      {/* Noise texture overlay - only for this section */}
      <div 
        className="absolute inset-0 dark:hidden pointer-events-none z-[1]"
        style={{
          background: `#ffffff url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: '0.015',
        }}
      />
      <div 
        className="absolute inset-0 hidden dark:block pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: '0.03',
        }}
      />
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
          <div className="text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20">
            <motion.p
              className="text-[10px] xs:text-xs font-medium tracking-widest text-muted-foreground mb-3 xs:mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              TRY IT YOURSELF
            </motion.p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 xs:mb-5 sm:mb-6">
              See Event Parlour in Action
            </h2>
            <p className="text-muted-foreground text-sm xs:text-base sm:text-lg max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Experience our platform from both perspectives. Switch between organizer and attendee views to see how we serve everyone.
            </p>
          </div>
        </ScrollReveal>

        {/* Demo Container */}
        <ScrollReveal direction="up" delay={0.2} duration={0.7} threshold={0.2}>
          {/* Large devices - interactive */}
          <div className="hidden lg:block">
            <Card className="border-2 border-border bg-[#ffffff] dark:bg-background">
              <CardContent className="p-4 xs:p-6 sm:p-8 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={demoMode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {demoMode === "organizer" ? (
                      <OrganizerDashboardWrapper
                        onSwitch={() => handleModeSwitch("attendee")}
                        activeView={activeView}
                        setActiveView={setActiveView}
                      />
                    ) : (
                      <AttendeeDashboardWrapper
                        onSwitch={() => handleModeSwitch("organizer")}
                        activeView={activeView}
                        setActiveView={setActiveView}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
          {/* Small devices - interactive */}
          <div className="lg:hidden overflow-hidden">
            <div className="scale-50 origin-top-left w-[200%] h-[300px]">
              <Card className="border-2 border-border bg-[#ffffff] dark:bg-background">
                <CardContent className="p-4 xs:p-6 sm:p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={demoMode}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {demoMode === "organizer" ? (
                        <OrganizerDashboardWrapper
                          onSwitch={() => handleModeSwitch("attendee")}
                          activeView={activeView}
                          setActiveView={setActiveView}
                        />
                      ) : (
                        <AttendeeDashboardWrapper
                          onSwitch={() => handleModeSwitch("organizer")}
                          activeView={activeView}
                          setActiveView={setActiveView}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.4} duration={0.7} threshold={0.2}>
          <motion.div
            className="text-center mt-8 xs:mt-10 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="https://app.eventparlour.com/auth/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Create your account on EventParlour"
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg font-medium gap-2">
                Create Your Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              Start creating events or discovering experiences in seconds
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
