"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const themes = [
  {
    key: "light" as const,
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark" as const,
    icon: Moon,
    label: "Dark theme",
  },
];

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = resolvedTheme === "dark" ? "dark" : "light";

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex rounded-none border border-border bg-background",
          className,
        )}
        aria-hidden
      >
        {themes.map(({ key }) => (
          <div key={key} className="h-8 w-8" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex rounded-none border border-border bg-background",
        className,
      )}
      role="group"
      aria-label="Theme"
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = activeTheme === key;

        return (
          <button
            aria-label={label}
            aria-pressed={isActive}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            key={key}
            onClick={() => setTheme(key)}
            type="button"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        );
      })}
    </div>
  );
};
