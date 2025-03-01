"use client"

import * as React from "react"
import { Cookie } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent")

    // If no choice has been made, show the banner
    if (cookieConsent === null) {
      // Small delay to ensure the banner appears after the page loads
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsent = (allow: boolean) => {
    // Save the user's preference to localStorage
    localStorage.setItem("cookieConsent", allow ? "allowed" : "rejected")

    // Hide the banner
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0  bg-gray-100 shadow-black text-black z-20 border-t shadow-lg animate-slide-up">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-center sm:text-left">
          <Cookie className="h-5 w-5 flex-shrink-0" />
          <p>We use cookies to enhance your browsing experience and analyze our traffic.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto ">
          <Button onClick={() => handleConsent(true)} className="w-full sm:w-auto bg-black" size="sm">
            Accept All Cookies
          </Button>
          <Button variant="outline" onClick={() => handleConsent(false)} className="w-full sm:w-auto border border-black" size="sm">
            Reject Non-Essential
          </Button>
        </div>
      </div>
    </div>
  )
}

