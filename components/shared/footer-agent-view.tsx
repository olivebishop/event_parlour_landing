"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Vercel-style footer control: icon expands to “View as agent” on hover,
 * linking to the durable Markdown agent view at `/.md`.
 */
export function FooterAgentViewLink({ className }: { className?: string }) {
  return (
    <Link
      href="/.md"
      className={cn(
        "group inline-flex min-h-9 shrink-0 items-center gap-0 rounded-none border border-transparent px-1.5 text-muted-foreground transition-[border-color,color,background-color,gap] duration-200",
        "hover:gap-2 hover:border-foreground/20 hover:bg-muted/40 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      aria-label="View as agent"
      title="View as agent"
    >
      <Bot className="size-3.5 shrink-0" aria-hidden />
      <span
        className={cn(
          "max-w-0 overflow-hidden whitespace-nowrap font-body text-[0.6875rem] tracking-wide opacity-0 transition-[max-width,opacity] duration-200",
          "group-hover:max-w-[7.5rem] group-hover:opacity-100",
          "group-focus-visible:max-w-[7.5rem] group-focus-visible:opacity-100",
        )}
      >
        View as agent
      </span>
    </Link>
  );
}
