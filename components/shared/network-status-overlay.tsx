import { useNetworkStatus } from "@/hooks/use-network-status"
import { NoInternet } from "@/components/shared/no-internet"

/**
 * Standalone island: covers the page with the offline screen when the
 * connection drops. (Previously a provider wrapping the whole Next app.)
 */
export function NetworkStatusOverlay() {
  const isOnline = useNetworkStatus()
  return isOnline ? null : <NoInternet />
}
