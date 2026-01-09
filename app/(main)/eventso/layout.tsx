import type { Metadata } from "next";
import type React from "react";

const siteUrl = "https://www.eventparlour.com";

export const metadata: Metadata = {
  title: "Events Near You - Discover Local Events | Event Parlour",
  description: "Discover exciting events happening in your area. Browse concerts, festivals, conferences, and more. Find events that match your interests.",
  alternates: {
    canonical: `${siteUrl}/eventso`,
  },
};

export default function EventsoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

