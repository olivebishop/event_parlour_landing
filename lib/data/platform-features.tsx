import {
  BarChart3,
  CreditCard,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  TrendingUp,
} from "lucide-react"
import type { Feature } from "@/lib/data/features"
import { platformFeatureCatalog } from "@/lib/platform-feature-catalog"

const baseBySlug: Record<
  string,
  Omit<Feature, "label" | "title" | "description" | "capabilities">
> = {
  distribution: {
    icon: <TrendingUp className="h-5 w-5" />,
    image: "/images/workspace.png",
  },
  workspace: {
    icon: <LayoutGrid className="h-5 w-5" />,
    image: "/images/org.svg",
  },
  pricing: {
    icon: <CreditCard className="h-5 w-5" />,
    image: "/images/revenue.svg",
  },
  "tickets-and-channels": {
    icon: <MessageSquare className="h-5 w-5" />,
    image: "/images/tickets.svg",
  },
  community: {
    icon: <Megaphone className="h-5 w-5" />,
    image: "/images/connect.svg",
  },
  analytics: {
    icon: <BarChart3 className="h-5 w-5" />,
    image: "/images/analytics.svg",
  },
}

export function getPlatformFeatureBase(slug: string) {
  return baseBySlug[slug]
}

export function listPlatformFeatureSlugsInOrder() {
  return platformFeatureCatalog.map((entry) => entry.slug)
}
