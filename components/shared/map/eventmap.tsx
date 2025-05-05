"use client"

import { useEffect, useMemo, useRef } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet" // Added TileLayer import
import { Icon, type LatLngExpression, latLngBounds } from "leaflet"
import { motion } from "framer-motion"
import "leaflet/dist/leaflet.css"
import type L from "leaflet"

// Add this import at the top
import LeafletSetup from "@/lib/leaflet-setup"

// Define event types for type safety
export type EventData = {
  id: number
  title: string
  location: string
  coordinates: LatLngExpression
  category: string
  price: string
  date: string
  image: string
}

// Define map props for customization
interface EventMapProps {
  events: EventData[]
  selectedEventId: number | null
  onMarkerClick: (eventId: number) => void
  height?: string
  width?: string
  className?: string
}

// Map controller component to access map instance
const MapController = ({
  events,
  selectedEventId,
}: {
  events: EventData[]
  selectedEventId: number | null
}) => {
  const map = useMap()

  useEffect(() => {
    if (selectedEventId) {
      const selectedEvent = events.find((event) => event.id === selectedEventId)
      if (selectedEvent) {
        map.setView(selectedEvent.coordinates, 14)
      }
    } else if (events.length > 0) {
      // If no event is selected but we have events, fit the map to show all events
      const coordinates = events.map((event) => event.coordinates)
      if (coordinates.length === 1) {
        // If there's only one event, center on it
        map.setView(coordinates[0], 12)
      } else {
        // Create a proper bounds object from the coordinates array
        const bounds = latLngBounds(coordinates)
        map.fitBounds(bounds)
      }
    }
  }, [map, events, selectedEventId])

  return null
}

// Custom marker component
const EventMarker = ({
  event,
  isSelected,
  onClick,
}: {
  event: EventData
  isSelected: boolean
  onClick: () => void
}) => {
  // Custom marker icon using grayscale colors
  const markerIcon = new Icon({
    iconUrl: isSelected
      ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png"
      : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
    iconRetinaUrl: isSelected
      ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png"
      : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  return (
    <Marker
      position={event.coordinates}
      icon={markerIcon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup className="custom-popup">
        <div className="text-center">
          <p className="font-semibold">{event.title}</p>
        </div>
      </Popup>
    </Marker>
  )
}

// Update the EventMap component to include a ref and resize handler
export default function EventMap({
  events,
  selectedEventId,
  onMarkerClick,
  height = "70vh",
  width = "100%",
  className,
}: EventMapProps) {
  const mapRef = useRef<L.Map | null>(null)

  // Memoize the center to prevent unnecessary re-renders
  const center = useMemo(() => {
    // Default center on Kenya
    const defaultCenter: LatLngExpression = [-1.286389, 36.817223]
    
    if (selectedEventId && events.length) {
      const selectedEvent = events.find((event) => event.id === selectedEventId)
      return selectedEvent ? selectedEvent.coordinates : defaultCenter
    }
    return defaultCenter
  }, [events, selectedEventId])

  // Handle map resize when container size changes
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize()
      }, 300)
    }
  }, [width, height])

  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-[#171717] border-gray-800 ${className || ""}`}
      style={{ height, width }}
    >
      {/* Leaflet Setup Component */}
      <LeafletSetup />

      {/* Map Container with motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full"
      >
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "100%", width: "100%", background: "#171717" }}
          zoomControl={true}
          attributionControl={true}
          className="leaflet-dark-mode"
          ref={mapRef}
        >
          {/* Map Controller */}
          <MapController events={events} selectedEventId={selectedEventId} />

          {/* Tile Layer - Uncommented to render the map */}
          <TileLayer
            url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" class="text-white">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" class="text-gray-400">CARTO</a>'
            subdomains="abcd"
            maxZoom={19}
          />

          {/* Event Markers */}
          {events.map((event) => (
            <EventMarker
              key={event.id}
              event={event}
              isSelected={selectedEventId === event.id}
              onClick={() => onMarkerClick(event.id)}
            />
          ))}
        </MapContainer>
      </motion.div>
    </div>
  )
}