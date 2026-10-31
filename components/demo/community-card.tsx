import { Users } from "lucide-react"

function coverGradient(name: string) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  const from = hash % 360
  const to = (hash * 3) % 360
  return `linear-gradient(145deg, hsl(${from} 42% 32%) 0%, #0a0a0a 55%, hsl(${to} 38% 22%) 100%)`
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter((part) => part.length > 0)
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return "C"
}

export function CommunityCard({
  name,
  bio,
  isVerified,
  memberCount,
}: {
  name: string
  bio?: string | null
  isVerified?: boolean
  memberCount: number
}) {
  return (
    <article className="flex aspect-[6/5] w-full flex-col overflow-hidden rounded-[0.75rem] border border-border/70 bg-card">
      <div className="relative h-[34%] shrink-0 overflow-hidden bg-muted">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: coverGradient(name) }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-card"
        />
      </div>

      <div className="relative z-10 -mt-8 flex min-h-0 flex-1 flex-col px-3.5 pb-3.5">
        <div className="flex size-[3.25rem] shrink-0 items-center justify-center overflow-hidden rounded-[0.375rem] border-[2.5px] border-card bg-foreground shadow-sm">
          <span className="text-[11px] font-semibold text-background">
            {initials(name)}
          </span>
        </div>

        <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate text-[15px] font-semibold leading-tight tracking-tight text-foreground">
              {name}
            </h3>
            {isVerified ? (
              <span
                aria-label="Verified"
                className="size-3.5 shrink-0 rounded-full bg-emerald-500"
              />
            ) : null}
          </div>
          <p className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed text-muted-foreground">
            {bio?.trim() || "Community on Event Parlour"}
          </p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              <span className="inline-flex h-6 items-center rounded-[0.375rem] border border-emerald-500/25 bg-emerald-500/10 px-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                Community
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium tabular-nums text-foreground/80">
                <Users className="size-3.5 text-muted-foreground" aria-hidden />
                {memberCount.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              className="inline-flex h-7 items-center rounded-[0.375rem] border border-border bg-background px-2.5 text-[11px] font-medium text-foreground"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
