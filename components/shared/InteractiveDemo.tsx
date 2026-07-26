"use client"

import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import ScrollReveal from "@/components/shared/animations/scroll-reveal"
import content from "@/lib/content"
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
import dynamic from "next/dynamic"
import { demoCardClass, demoStatValueClass } from "@/components/demo/demo-chrome"
import { brandNoiseLayerStyle } from "@/lib/brand/noise"

/** Product chrome inside the framed demo window. */
const demoShellClass = "flex h-full min-h-0 bg-background text-foreground"
const demoMetricCardClass = demoCardClass

/** Desktop canvas width — always rendered, then scaled to fit the viewport. */
const DEMO_DESIGN_WIDTH = 1100
const DEMO_DESIGN_HEIGHT = 640

function DemoPaneSkeleton() {
  return (
    <div className="m-6 min-h-[16rem] flex-1 animate-pulse bg-muted/30" />
  )
}

function DemoScaleFrame({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = outerRef.current
    if (!el) return

    const update = () => {
      const width = el.clientWidth
      if (width <= 0) return
      setScale(Math.min(1, width / DEMO_DESIGN_WIDTH))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={outerRef}
      className="relative w-full overflow-hidden"
      style={{ height: DEMO_DESIGN_HEIGHT * scale }}
    >
      <div
        className="demo-frame absolute left-0 top-0 origin-top-left will-change-transform"
        style={{
          width: DEMO_DESIGN_WIDTH,
          height: DEMO_DESIGN_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

const EventsDemoOrganizer = dynamic(
  () => import("@/components/demo/organizer/EventsDemo"),
  { loading: DemoPaneSkeleton }
)
const KYCDemo = dynamic(() => import("@/components/demo/organizer/KYCDemo"), {
  loading: DemoPaneSkeleton,
})
const ChannelsDemoOrganizer = dynamic(
  () => import("@/components/demo/organizer/ChannelsDemo"),
  { loading: DemoPaneSkeleton }
)
const SpeakersDemo = dynamic(
  () => import("@/components/demo/organizer/SpeakersDemo"),
  { loading: DemoPaneSkeleton }
)
const TicketsDemoOrganizer = dynamic(
  () => import("@/components/demo/organizer/TicketsDemo"),
  { loading: DemoPaneSkeleton }
)
const AnalyticsDemoOrganizer = dynamic(
  () => import("@/components/demo/organizer/AnalyticsDemo"),
  { loading: DemoPaneSkeleton }
)
const SettingsDemoOrganizer = dynamic(
  () => import("@/components/demo/organizer/SettingsDemo"),
  { loading: DemoPaneSkeleton }
)
const SupportDemoOrganizer = dynamic(
  () => import("@/components/demo/organizer/SupportDemo"),
  { loading: DemoPaneSkeleton }
)
const EventsDemoAttendee = dynamic(
  () => import("@/components/demo/attendee/EventsDemo"),
  { loading: DemoPaneSkeleton }
)
const ChannelsDemoAttendee = dynamic(
  () => import("@/components/demo/attendee/ChannelsDemo"),
  { loading: DemoPaneSkeleton }
)
const TicketsDemoAttendee = dynamic(
  () => import("@/components/demo/attendee/TicketsDemo"),
  { loading: DemoPaneSkeleton }
)
const AnalyticsDemoAttendee = dynamic(
  () => import("@/components/demo/attendee/AnalyticsDemo"),
  { loading: DemoPaneSkeleton }
)
const SettingsDemoAttendee = dynamic(
  () => import("@/components/demo/attendee/SettingsDemo"),
  { loading: DemoPaneSkeleton }
)
const SupportDemoAttendee = dynamic(
  () => import("@/components/demo/attendee/SupportDemo"),
  { loading: DemoPaneSkeleton }
)
import {
  mockAttendeeEvents,
  mockRecentActivity,
  mockUpcomingEvents,
} from "@/components/demo/mockData"
import { format } from "date-fns"

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
        aria-label="Switch workspace"
        onClick={() => setIsActive(!isActive)}
        className="w-full flex items-center justify-center p-2 rounded transition-colors hover:bg-accent"
      >
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded border border-border bg-primary text-primary-foreground flex items-center justify-center">
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
    <div className="flex h-full w-16 shrink-0 flex-col border-r border-border bg-muted/50 dark:bg-muted/40">
      <div className="border-b border-border p-4">
        <div className="flex h-8 w-8 items-center justify-center bg-primary dark:bg-primary">
          <span className="text-xs font-bold text-primary-foreground">EP</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-hidden py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              className={cn(
                "flex w-full items-center justify-center p-3 transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
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
        aria-label="Switch to light theme"
        title="Switch to light theme"
      >
        <Sun className="h-4 w-4" aria-hidden />
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
        aria-label="Switch to dark theme"
        title="Switch to dark theme"
      >
        <Moon className="h-4 w-4" aria-hidden />
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
      <div className="flex h-14 items-center justify-between gap-1 border-b border-border bg-background/95 px-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:gap-2 sm:px-4 md:h-16 md:px-6">
        {/* Left side - Search button */}
        <div className="mr-2 flex min-w-0 flex-1 justify-start max-w-none sm:mr-4">
          <div className="flex w-full min-w-0 max-w-none items-center gap-2 md:max-w-sm">
            <Button
              variant="outline"
              size="sm"
              className="w-full max-w-[2.5rem] justify-start px-2 text-muted-foreground sm:max-w-sm sm:px-3"
              aria-label="Search"
            >
              <Search className="h-4 w-4 sm:mr-2" aria-hidden />
              <span className="hidden sm:inline">Search...</span>
            </Button>
          </div>
        </div>
        {/* Right side - Date, Notifications, View switch, Profile */}
        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5">
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <div className="hidden items-center whitespace-nowrap text-xs font-normal text-muted-foreground lg:flex">
              {formatDate()}
            </div>
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative"
                aria-label={
                  unreadCount > 0
                    ? `Notifications, ${unreadCount} unread`
                    : "Notifications"
                }
              >
                <Bell className="h-4 w-4" aria-hidden />
                {unreadCount > 0 && (
                  <span
                    data-allow-radius
                    aria-hidden
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
                  >
                    {unreadCount}
                  </span>
                )}
              </Button>
              {/* Notification Panel */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 max-h-96 w-[min(100vw-2rem,20rem)] max-w-[calc(100vw-2rem)] overflow-y-auto border border-border bg-popover shadow-lg sm:w-80">
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
              className="px-2 text-xs sm:px-3"
              aria-label={
                mode === "organizer" ? "View as Attendee" : "View as Organizer"
              }
            >
              <Users className="h-4 w-4 lg:hidden" aria-hidden />
              <span className="hidden lg:inline">
                {mode === "organizer" ? "View as Attendee" : "View as Organizer"}
              </span>
            </Button>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-label="Open profile menu"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="border-0 bg-transparent p-0 outline-none"
              >
                <div
                  data-allow-radius
                  className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-border bg-gradient-to-br from-secondary to-secondary/70"
                >
                  <span className="text-xs font-semibold text-foreground">{initials}</span>
                </div>
              </button>
              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,15rem)] max-w-[calc(100vw-2rem)] border border-border bg-popover shadow-lg sm:w-[240px]">
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
    <div className={cn("flex flex-row", demoShellClass)}>
      <Sidebar activeView={activeView} mode="organizer" onNavigate={setActiveView} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <TopHeader onSwitch={onSwitch} mode="organizer" />
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <OrganizerDashboardContent activeView={activeView} />
        </div>
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
          <div className="h-full p-6">
            <div className="flex h-full flex-col gap-4">
              {/* Header */}
              <div className="shrink-0">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      Welcome back, Olive
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Here&apos;s what&apos;s happening with your workspace
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit text-sm">
                    Owner
                  </Badge>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid shrink-0 grid-cols-4 gap-4">
                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Total Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className={demoStatValueClass}>12</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      3 active this month
                    </p>
                  </CardContent>
                </Card>

                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Team Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className={demoStatValueClass}>8</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      Active members
                    </p>
                  </CardContent>
                </Card>

                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Tickets Sold</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className={demoStatValueClass}>2,450</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      +15 free registrations
                    </p>
                  </CardContent>
                </Card>

                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4 sm:px-6 sm:pt-6">
                    <CardTitle className="text-xs sm:text-sm font-medium">Revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className={demoStatValueClass}>KES 8.2M</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      From 245 purchases
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Content Section */}
              <div className="grid min-h-0 flex-1 grid-cols-7 gap-6">
                {/* Recent Activity */}
                <Card className={cn(demoMetricCardClass, "col-span-4 flex min-h-0 flex-col")}>
                  <CardHeader className="shrink-0 px-6 pt-6">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Recent ticket sales and registrations
                    </p>
                  </CardHeader>
                  <CardContent className="min-h-0 flex-1 px-6 pb-6">
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
                <Card className={cn(demoMetricCardClass, "col-span-3 flex min-h-0 flex-col")}>
                  <CardHeader className="shrink-0 px-6 pt-6">
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Your scheduled events
                    </p>
                  </CardHeader>
                  <CardContent className="min-h-0 flex-1 px-6 pb-6">
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
    <div className={cn("flex flex-row", demoShellClass)}>
      <Sidebar activeView={activeView} mode="attendee" onNavigate={setActiveView} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <TopHeader onSwitch={onSwitch} mode="attendee" />
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <AttendeeDashboardContent activeView={activeView} />
        </div>
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
          <div className="h-full p-6">
            <div className="flex h-full flex-col gap-4">
              <div className="shrink-0">
                <h3 className="mb-1 text-xl font-semibold text-foreground">
                  My Dashboard
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your events and tickets
                </p>
              </div>

              <div className="grid shrink-0 grid-cols-4 gap-4">
                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pb-2 pt-4">
                    <CardTitle className="text-xs font-medium">Tickets Purchased</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className={demoStatValueClass}>8</div>
                    <p className="text-xs text-muted-foreground">From 3 purchases</p>
                  </CardContent>
                </Card>

                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pb-2 pt-4">
                    <CardTitle className="text-xs font-medium">Free Registrations</CardTitle>
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className={demoStatValueClass}>5</div>
                    <p className="text-xs text-muted-foreground">Upcoming events</p>
                  </CardContent>
                </Card>

                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pb-2 pt-4">
                    <CardTitle className="text-xs font-medium">Upcoming Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className={demoStatValueClass}>7</div>
                    <p className="text-xs text-muted-foreground">In the next 30 days</p>
                  </CardContent>
                </Card>

                <Card className={demoMetricCardClass}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pb-2 pt-4">
                    <CardTitle className="text-xs font-medium">Total Spent</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className={demoStatValueClass}>KES 12.5K</div>
                    <p className="text-xs text-muted-foreground">This year</p>
                  </CardContent>
                </Card>
              </div>

              <Card className={cn(demoMetricCardClass, "flex min-h-0 flex-1 flex-col")}>
                <CardHeader className="shrink-0 px-6 pb-3 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Upcoming Events</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Events you&apos;re attending
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a
                        href="https://app.eventparlour.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Browse Events
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="min-h-0 flex-1 px-6 pb-6">
                  <div className="space-y-3">
                    {mockAttendeeEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="rounded-none border border-border p-4 transition-colors hover:border-foreground/25"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <h4 className="mb-2 truncate font-semibold text-foreground">
                              {event.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {event.date}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {event.tickets} ticket
                                {event.tickets > 1 ? "s" : ""}
                              </Badge>
                            </div>
                          </div>
                          <Badge
                            variant={
                              event.status === "confirmed" ? "default" : "secondary"
                            }
                            className="shrink-0 text-xs"
                          >
                            {event.status}
                          </Badge>
                        </div>
                      </div>
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

  // Reset active view when switching modes
  const handleModeSwitch = (newMode: DemoMode) => {
    setDemoMode(newMode)
    setActiveView("dashboard")
  }

  return (
    <div className="relative isolate overflow-hidden bg-muted/40 py-14 xs:py-16 sm:py-20 md:py-28 lg:py-32 dark:bg-[oklch(0.11_0_0)]">
      {/* Stage atmosphere — soft in light, Midday grain in dark */}
      <div
        aria-hidden
        className="absolute inset-0 dark:hidden"
        style={{
          background: [
            "radial-gradient(ellipse 90% 70% at 10% 30%, color-mix(in oklch, var(--foreground) 8%, transparent), transparent 55%)",
            "radial-gradient(ellipse 80% 60% at 90% 70%, color-mix(in oklch, var(--foreground) 6%, transparent), transparent 50%)",
            "linear-gradient(160deg, oklch(0.97 0 0) 0%, oklch(0.93 0 0) 100%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden dark:block"
        style={{
          background: [
            "radial-gradient(ellipse 85% 75% at 12% 42%, oklch(0.22 0 0) 0%, transparent 58%)",
            "radial-gradient(ellipse 95% 85% at 88% 48%, oklch(0.34 0 0) 0%, transparent 62%)",
            "linear-gradient(108deg, oklch(0.09 0 0) 0%, oklch(0.16 0 0) 42%, oklch(0.27 0 0) 100%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-multiply dark:opacity-[0.62] dark:mix-blend-overlay"
        style={{
          backgroundImage: brandNoiseLayerStyle.backgroundImage,
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 dark:opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, color-mix(in oklch, var(--background) 70%, transparent) 100%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-3 xs:px-4 sm:px-6">
        <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
          <div className="mb-8 text-center xs:mb-10 sm:mb-12 md:mb-14">
            <motion.p
              className="mb-3 font-body text-[10px] font-medium uppercase tracking-widest text-foreground/55 xs:mb-4 xs:text-xs dark:text-white/55"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              TRY IT YOURSELF
            </motion.p>
            <h2
              id="demo-heading"
              className="mb-4 px-1 font-heading text-balance text-xl font-bold text-foreground xs:mb-5 xs:text-2xl sm:mb-6 sm:text-4xl md:text-5xl dark:text-white"
            >
              See Event Parlour in Action
            </h2>
            <p className="mx-auto max-w-xs px-2 font-body text-[0.9375rem] leading-relaxed text-foreground/70 xs:max-w-sm xs:text-base sm:max-w-xl sm:text-lg md:max-w-2xl dark:text-white/65">
              Experience our platform from both perspectives. Switch between
              organizer and attendee views to see how we serve everyone.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} duration={0.7} threshold={0.2}>
          <div
            className={cn(
              "relative mx-auto w-full max-w-6xl",
              "border border-foreground/15 bg-background dark:border-white/15",
              "shadow-[0_28px_90px_-20px_rgba(0,0,0,0.18)] dark:shadow-[0_28px_90px_-20px_rgba(0,0,0,0.75)]",
              "[&_.rounded-xl]:rounded-none [&_.rounded-lg]:rounded-none [&_.rounded-md]:rounded-none",
            )}
          >
            <DemoScaleFrame>
              <AnimatePresence mode="wait">
                <motion.div
                  key={demoMode}
                  className="h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
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
            </DemoScaleFrame>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4} duration={0.7} threshold={0.2}>
          <motion.div
            className="mt-8 text-center xs:mt-10 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button asChild size="cta" className="gap-2 shadow-none">
              <a
                href="https://app.eventparlour.com/auth/sign-up"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Create your account on Event Parlour"
              >
                Create Your Account
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <p className="mt-4 font-body text-sm text-foreground/55 dark:text-white/55">
              Start creating events or discovering experiences in seconds
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  )
}
