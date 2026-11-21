import { useCallback, useSyncExternalStore } from "react"

/**
 * Light/dark/system theme shared across every Astro island.
 *
 * The first paint is handled by the inline script in `src/layouts/BaseLayout.astro`
 * (same storage key), so there is no flash. Islands stay in sync through a
 * window event, and other tabs through the `storage` event.
 */
export type Theme = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

export const THEME_STORAGE_KEY = "theme"
const CHANGE_EVENT = "ep:themechange"
const DARK_QUERY = "(prefers-color-scheme: dark)"

function readTheme(): Theme {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    if (value === "light" || value === "dark" || value === "system") return value
  } catch {
    // Storage blocked (private mode, etc.) — fall back to system.
  }
  return "system"
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme !== "system") return theme
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme)
  const root = document.documentElement

  // Suppress transitions for one frame so colors swap instantly.
  const style = document.createElement("style")
  style.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.appendChild(style)

  root.classList.toggle("dark", resolved === "dark")
  root.style.colorScheme = resolved

  window.getComputedStyle(document.body)
  requestAnimationFrame(() => style.remove())
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore
  }
  applyTheme(theme)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY)
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return
    applyTheme(readTheme())
    onChange()
  }
  const onSystem = () => {
    if (readTheme() === "system") applyTheme("system")
    onChange()
  }

  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener("storage", onStorage)
  media.addEventListener("change", onSystem)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onStorage)
    media.removeEventListener("change", onSystem)
  }
}

/** Drop-in for the subset of `next-themes`' `useTheme` this site uses. */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | undefined>(
    subscribe,
    readTheme,
    () => undefined,
  )
  const resolvedTheme = useSyncExternalStore<ResolvedTheme | undefined>(
    subscribe,
    () => resolveTheme(readTheme()),
    () => undefined,
  )
  const set = useCallback((value: string) => setTheme(value as Theme), [])

  return { theme, resolvedTheme, setTheme: set }
}
