"use client"

import { mockChannels } from "../mockData"
import { CommunityCard } from "../community-card"

export default function ChannelsDemo() {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="flex h-full flex-col gap-4">
        <div className="shrink-0">
          <h3 className="mb-1.5 text-2xl font-bold text-foreground">Community</h3>
          <p className="text-sm text-muted-foreground">
            Member spaces linked to organizer storefronts. Follow for updates,
            announcements, and conversations with hosts and other attendees.
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
            {mockChannels.map((channel) => (
              <CommunityCard
                key={channel.id}
                name={channel.name}
                bio={channel.bio}
                isVerified={channel.isVerified}
                memberCount={channel.memberCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
