import type React from "react"
import { Navbar } from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

