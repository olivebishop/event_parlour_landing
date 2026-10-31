"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const events = [
  {
    title: "Nairobi Tech Summit 2025",
    when: "Sat 15 Mar, 12:00 PM",
    place: "KICC · Nairobi",
    doors: "2 open",
    open: true,
    inn: "820 of 1,200 · 68%",
  },
  {
    title: "Music Festival Weekend",
    when: "Sun 20 Apr, 5:00 PM",
    place: "Nyali Beach · Mombasa",
    doors: "All closed",
    open: false,
    inn: "0 of 2,400 · 0%",
  },
]

export default function CheckInDemo() {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="flex h-full flex-col gap-4">
        <div className="shrink-0">
          <h3 className="text-3xl font-bold">Check-in</h3>
          <p className="text-sm text-muted-foreground">
            Live events. Who came in stays on Activity.
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Event</th>
                <th className="px-3 py-2 font-medium">When</th>
                <th className="px-3 py-2 font-medium">Place</th>
                <th className="px-3 py-2 font-medium">Doors</th>
                <th className="px-3 py-2 font-medium">In</th>
                <th className="px-3 py-2 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.title} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 font-medium">{event.title}</td>
                  <td className="px-3 py-3 text-muted-foreground">{event.when}</td>
                  <td className="px-3 py-3 text-muted-foreground">{event.place}</td>
                  <td className="px-3 py-3">
                    <Badge variant={event.open ? "default" : "outline"}>
                      {event.doors}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 tabular-nums text-muted-foreground">
                    {event.inn}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button type="button" size="sm">
                        Check in
                      </Button>
                      <Button type="button" size="sm" variant="ghost">
                        Doors
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
