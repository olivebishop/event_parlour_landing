"use client"

import { useEffect } from "react"
import L from "leaflet"

// This component sets up Leaflet icon paths correctly
export default function LeafletSetup() {
  useEffect(() => {
    // Fix Leaflet's icon paths
    interface IconDefaultPrototype extends L.Icon.Default {
      _getIconUrl?: unknown;
    }
    delete (L.Icon.Default.prototype as IconDefaultPrototype)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  return null
}
