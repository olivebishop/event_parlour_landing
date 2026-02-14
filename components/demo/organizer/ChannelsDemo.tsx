"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Globe, CheckCircle2, Plus } from "lucide-react"
import { mockChannels } from "../mockData"

const getInitials = (name: string): string => {
  if (!name) return ""
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
  return ""
}

export default function ChannelsDemo() {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Channels</h3>
              <p className="text-sm text-muted-foreground">
                Discover and join communities. Get updates, announcements, and connect with event organizers.
              </p>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Channel
            </Button>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="flex-1 overflow-y-auto">
          {mockChannels.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">No channels yet</h3>
                <p className="text-sm text-muted-foreground">
                  Create your first channel to start engaging with your community.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mockChannels.map((channel) => {
                const channelInitials = getInitials(channel.name)
                return (
                  <Card key={channel.id} className="h-full flex flex-col overflow-hidden p-0">
                    <CardContent className="p-0 flex flex-col flex-1">
                      {/* Channel Banner */}
                      <div
                        className="relative h-32 w-full overflow-hidden"
                        style={{ backgroundColor: "#312722" }}
                      />

                      {/* Channel Logo/Avatar - Overlapping banner */}
                      <div className="relative -mt-12 ml-4 mb-4">
                        <div className="w-16 h-16 rounded-lg bg-background border-2 border-background shadow-lg flex items-center justify-center overflow-hidden">
                          {channel.imageUrl ? (
                            <img
                              src={channel.imageUrl}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-foreground flex items-center justify-center">
                              <span className="text-background text-xl font-semibold">
                                {channelInitials || "C"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-4 pb-4 flex flex-col flex-1">
                        {/* Title */}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base line-clamp-2 text-foreground flex-1">
                            {channel.name}
                          </h3>
                          {channel.isVerified && (
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </div>

                        {/* Description */}
                        {channel.bio && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                            {channel.bio}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <Globe className="w-4 h-4 flex-shrink-0" />
                          <span>Community</span>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>{channel.memberCount}</span>
                          </div>
                        </div>

                        {/* Continue Button */}
                        <div className="mt-auto flex justify-end">
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-foreground text-background px-3 py-2 text-xs font-medium transition-colors hover:bg-foreground/90">
                            Continue
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
