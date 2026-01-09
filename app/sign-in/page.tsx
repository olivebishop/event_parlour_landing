import type { Metadata } from "next";
import React from 'react'
import { LaunchingSoon } from '@/components/shared/launchingSoon/launching-soon'

const siteUrl = "https://www.eventparlour.com";

export const metadata: Metadata = {
  title: "Sign In - Event Parlour",
  description: "Sign in to Event Parlour to manage your events and accommodations.",
  alternates: {
    canonical: `${siteUrl}/sign-in`,
  },
};

// meta view point
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

function Page() {
  return (
    <div>
      <LaunchingSoon/>
    </div>
  )
}

export default Page