"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, HeartHandshake, Star, Store } from "lucide-react"

const templates = [
  {
    title: "Post-event feedback",
    description: "How was the event? Help the organizers improve next time.",
    useFor: [
      "After an event or hangout",
      "NPS, ratings, or open comments",
      "What to keep and what to change",
    ],
    cover: "linear-gradient(145deg, #5c4a1f 0%, #0a0a0a 55%, #3a2e10 100%)",
    icon: "stars" as const,
  },
  {
    title: "Call for vendors",
    description: "Apply for a booth or stall at this event.",
    useFor: [
      "Call for vendors or stall holders",
      "Booth type, power, and offering",
      "Review applications in one inbox",
    ],
    cover: "linear-gradient(145deg, #1f4a5c 0%, #0a0a0a 55%, #102e3a 100%)",
    icon: "store" as const,
  },
  {
    title: "Volunteer application",
    description: "Apply to volunteer at this event.",
    useFor: [
      "Volunteer sign-up",
      "Roles and availability",
      "Emergency contact details",
    ],
    cover: "linear-gradient(145deg, #4a1f3d 0%, #0a0a0a 55%, #2e1024 100%)",
    icon: "hands" as const,
  },
]

export default function FormsDemo() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-4">
        <header>
          <h3 className="mb-1.5 text-2xl font-bold">Forms</h3>
          <p className="text-sm text-muted-foreground">
            Start from a template for feedback, vendors, or volunteers.
          </p>
        </header>
        <div className="grid grid-cols-3 gap-3">
          {templates.map((card) => (
            <article
              key={card.title}
              className="flex flex-col overflow-hidden border border-border bg-card"
            >
              <div
                className="relative flex h-28 items-center justify-center text-white"
                style={{ background: card.cover }}
              >
                {card.icon === "stars" ? (
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="size-6"
                        fill={index < 4 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                ) : null}
                {card.icon === "store" ? <Store className="size-12" /> : null}
                {card.icon === "hands" ? (
                  <HeartHandshake className="size-12" />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <h4 className="text-base font-semibold">{card.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Use it for
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {card.useFor.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <Button type="button" className="mt-auto w-full" size="sm">
                  Start with this
                  <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
