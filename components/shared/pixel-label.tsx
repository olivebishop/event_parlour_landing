import * as React from "react";
import { cn } from "@/lib/utils";

type PixelLabelElement = "h2" | "p" | "span";

type PixelLabelProps = {
  variant?: "line" | "circle" | "square" | "plain";
  tone?: "foreground" | "soft";
  as?: PixelLabelElement;
  className?: string;
  id?: string;
  children: React.ReactNode;
};

const variantClass: Record<NonNullable<PixelLabelProps["variant"]>, string> = {
  line: "before:mr-2.5 before:inline-block before:h-px before:w-5 before:translate-y-[-0.1em] before:bg-current before:content-[''] before:align-middle",
  circle:
    "inline-flex items-center before:mr-2 before:inline-block before:size-[0.4375rem] before:rounded-full before:bg-current before:content-['']",
  square:
    "inline-flex items-center before:mr-2 before:inline-block before:size-[0.4375rem] before:bg-current before:content-['']",
  plain: "",
};

const toneClass: Record<NonNullable<PixelLabelProps["tone"]>, string> = {
  foreground: "text-foreground",
  soft: "text-foreground/65",
};

export function PixelLabel({
  variant = "plain",
  tone = "foreground",
  as: Tag = "span",
  className,
  children,
  ...rest
}: PixelLabelProps) {
  return (
    <Tag
      data-allow-radius={variant === "circle" ? "" : undefined}
      className={cn(
        "text-xs font-medium uppercase tracking-[0.12em]",
        variant === "circle" ? "font-pixel-circle" : "font-numbers",
        variantClass[variant],
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
