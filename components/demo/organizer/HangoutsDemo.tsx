"use client"

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const hangouts = [
  {
    title: "Ngong Hills sunrise",
    activity: "Hike",
    when: "Sat, Nov 8 · 5:30 AM",
    place: "Ngong",
    cover: "linear-gradient(145deg, #3d5c45 0%, #0a0a0a 55%, #1d3a28 100%)",
  },
  {
    title: "Hell's Gate camping",
    activity: "Camping",
    when: "Fri, Nov 14 · 2:00 PM",
    place: "Naivasha",
    cover: "linear-gradient(145deg, #6b4a2a 0%, #0a0a0a 55%, #3a2414 100%)",
  },
  {
    title: "Park morning ride",
    activity: "Ride",
    when: "Sun, Nov 16 · 6:00 AM",
    place: "Nairobi National Park",
    cover: "linear-gradient(145deg, #2a4a62 0%, #0a0a0a 55%, #163044 100%)",
  },
]

export default function HangoutsDemo() {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="flex h-full flex-col gap-4">
        <div className="flex shrink-0 items-end justify-between gap-3">
          <div>
            <h3 className="mb-2 text-3xl font-bold text-foreground">
              All hangouts
            </h3>
            <p className="text-sm text-muted-foreground">
              Hikes, camping, safaris, and rides from this workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm">
              Manage hangouts
            </Button>
            <Button type="button" size="sm">
              Create hangout
            </Button>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3">
          <div className="flex gap-2">
            <span className="inline-flex h-9 items-center border border-border bg-background px-3 text-sm">
              Upcoming
            </span>
            <span className="inline-flex h-9 items-center border border-border bg-background px-3 text-sm text-muted-foreground">
              All activities
            </span>
          </div>
          <p className="text-sm text-muted-foreground">3 hangouts</p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
            {hangouts.map((hangout) => (
              <article
                key={hangout.title}
                className="overflow-hidden border border-border bg-card"
              >
                <div
                  className="relative h-28"
                  style={{ background: hangout.cover }}
                >
                  <span className="absolute left-2 top-2 bg-background px-2 py-0.5 text-[11px] font-medium">
                    {hangout.activity}
                  </span>
                  <span className="absolute right-2 top-2 bg-background px-2 py-0.5 text-[11px] font-medium">
                    Upcoming
                  </span>
                </div>
                <div className="space-y-1 p-3">
                  <h4 className="truncate text-sm font-semibold">
                    {hangout.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{hangout.when}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <MapPin className="size-3 shrink-0" aria-hidden />
                    {hangout.place}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
