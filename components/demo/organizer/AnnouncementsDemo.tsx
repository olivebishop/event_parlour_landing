"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Mail, Megaphone, MousePointerClick, Send, Users } from "lucide-react"

const stats = [
  { label: "Sent", value: "12", detail: "2 scheduled", icon: Send },
  { label: "Recipients reached", value: "1,840", detail: "Across delivered updates", icon: Users },
  { label: "Email opens", value: "966", detail: "52.5% open rate", icon: Eye },
  { label: "Email clicks", value: "214", detail: "11.6% click-through", icon: MousePointerClick },
]

const history = [
  {
    title: "Doors open at 6",
    event: "Nairobi Tech Summit 2025",
    status: "Sent",
    when: "Sent Feb 10, 2025, 9:00 AM",
    body: "Gates open an hour early. Bring the ticket on your phone.",
  },
  {
    title: "Lineup drop",
    event: "Music Festival Weekend",
    status: "Scheduled",
    when: "Scheduled Apr 1, 2025, 10:00 AM",
    body: "The weekend lineup goes out to everyone registered for the festival.",
  },
]

export default function AnnouncementsDemo() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-5">
        <header className="space-y-1">
          <h3 className="text-2xl font-bold tracking-tight">Announcements</h3>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Send updates to everyone registered for Tech Nairobi&apos;s events.
            Attendees get an email, the update posts on the event page, and
            logged-in users see it in the app.
          </p>
        </header>

        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="border border-border bg-card p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <Icon className="size-3.5 text-muted-foreground" aria-hidden />
                </div>
                <p className="mt-1 text-lg font-semibold tabular-nums">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.detail}</p>
              </div>
            )
          })}
        </div>

        <section className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Megaphone className="size-4" aria-hidden />
            <div>
              <p className="text-sm font-medium">New announcement</p>
              <p className="text-xs text-muted-foreground">
                Email everyone registered for this event or hangout.
              </p>
            </div>
          </div>
          <div className="space-y-3 p-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="demo-announcement-event">
                Event or hangout
              </label>
              <div
                id="demo-announcement-event"
                className="flex h-10 items-center border border-border bg-background px-3 text-sm"
              >
                Nairobi Tech Summit 2025
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="demo-announcement-subject">
                Subject
              </label>
              <div
                id="demo-announcement-subject"
                className="flex h-10 items-center border border-border bg-background px-3 text-sm text-muted-foreground"
              >
                Write a subject
              </div>
            </div>
            <Button type="button" size="sm" className="gap-2">
              <Mail className="size-4" aria-hidden />
              Send
            </Button>
          </div>
        </section>

        <ul className="divide-y divide-border border-t border-border">
          {history.map((item) => (
            <li key={item.title} className="space-y-1.5 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <Badge variant={item.status === "Sent" ? "secondary" : "outline"}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.event}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">{item.when}</p>
              </div>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
