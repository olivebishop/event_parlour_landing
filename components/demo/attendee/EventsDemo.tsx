"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowRight, Filter, Search } from "lucide-react"
import { mockEvents } from "../mockData"
import { motion } from "framer-motion"

export default function EventsDemo() {
  const [selectedTab, setSelectedTab] = useState<"all" | "past" | "near">("all")

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Events</h3>
              <p className="text-sm text-muted-foreground">Discover and explore events</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
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
              onClick={() => setSelectedTab("near")}
              className={selectedTab === "near" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              Events Near You
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer hover:border-primary/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={event.status === "active" ? "default" : "secondary"} className="text-xs">
                        {event.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{event.category}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                    <Button className="w-full gap-2" size="sm">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
