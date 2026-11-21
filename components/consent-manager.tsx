import { ConsentManagerDialog, ConsentManagerProvider } from "@c15t/react"

/**
 * c15t consent manager (ported from the Next.js `app/consent-manager.tsx`).
 *
 * Same options as before: offline mode, necessary + marketing categories,
 * cookie banner disabled, preferences dialog mounted. Rendered as its own
 * island, so it no longer wraps the page.
 */
export function ConsentManager() {
  return (
    <ConsentManagerProvider
      options={{
        mode: "offline",
        consentCategories: ["necessary", "marketing"],
      }}
    >
      {/* Cookie banner disabled per request */}
      {/* <CookieBanner /> */}
      <ConsentManagerDialog />
    </ConsentManagerProvider>
  )
}
