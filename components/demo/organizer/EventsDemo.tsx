"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Plus, Filter, Search } from "lucide-react"
import { mockEvents } from "../mockData"
import { motion } from "framer-motion"

export default function EventsDemo() {
  const [selectedTab, setSelectedTab] = useState<"all" | "past" | "create">("all")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Events</h3>
              <p className="text-sm text-muted-foreground">Manage and track your events</p>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setSelectedTab("all")}
              className={selectedTab === "all" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedTab("past")}
              className={selectedTab === "past" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              Past Events
            </button>
            <button
              onClick={() => setSelectedTab("create")}
              className={selectedTab === "create" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              Create Event
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {selectedTab === "create" ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Create New Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Event Name</label>
                  <input
                    type="text"
                    placeholder="Enter event name"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <Button className="w-full">Create Event</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 overflow-y-auto h-full pr-2">
              {mockEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className={selectedEvent === event.id ? "p-4 border-2 border-primary rounded-lg bg-primary/5" : "p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-all"}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <Badge variant={event.status === "active" ? "default" : "secondary"} className="text-xs">
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.attendees} attendees
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">{event.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
