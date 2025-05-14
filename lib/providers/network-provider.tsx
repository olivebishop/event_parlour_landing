"use client"

import { useNetworkStatus } from "@/hooks/use-network-status"
import { NoInternet } from "@/components/shared/no-internet"
import type { ReactNode } from "react"

interface NetworkProviderProps {
  children: ReactNode
}

export function NetworkProvider({ children }: NetworkProviderProps) {
  const isOnline = useNetworkStatus()

  if (!isOnline) {
    return <NoInternet />
  }

  return <>{children}</>
}

