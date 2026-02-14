"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Plus, Mail, Link as LinkIcon } from "lucide-react"
import { mockSpeakers } from "../mockData"

export default function SpeakersDemo() {
  const [selectedTab, setSelectedTab] = useState<"all" | "invite" | "links">("all")

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Speakers</h3>
              <p className="text-sm text-muted-foreground">Manage speakers for your events</p>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Invite Speaker
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setSelectedTab("all")}
              className={selectedTab === "all" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              All Speakers
            </button>
            <button
              onClick={() => setSelectedTab("invite")}
              className={selectedTab === "invite" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              Invite Speaker
            </button>
            <button
              onClick={() => setSelectedTab("links")}
              className={selectedTab === "links" ? "border-b-2 border-primary pb-2 px-4 text-sm font-medium" : "pb-2 px-4 text-sm text-muted-foreground hover:text-foreground"}
            >
              Application Links
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {selectedTab === "invite" ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Invite Speaker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="speaker@example.com"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Event</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                    <option>Nairobi Tech Summit 2025</option>
                    <option>Music Festival Weekend</option>
                  </select>
                </div>
                <Button className="w-full gap-2">
                  <Mail className="h-4 w-4" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>
          ) : selectedTab === "links" ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Application Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Tech Summit Speaker Application</span>
                    <Button size="sm" variant="outline" className="gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">https://eventparlour.com/speakers/apply/abc123</p>
                </div>
                <Button className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Link
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 overflow-y-auto h-full pr-2">
              {mockSpeakers.map((speaker) => (
                <Card key={speaker.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mic className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{speaker.name}</h4>
                          <p className="text-sm text-muted-foreground">{speaker.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{speaker.expertise}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={speaker.status === "confirmed" ? "default" : "secondary"} className="mb-2">
                          {speaker.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{speaker.events} events</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
