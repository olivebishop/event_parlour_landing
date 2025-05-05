"use client"

import { MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface EventCardProps {
  id: number
  title: string
  image: string
  date: string
  location: string
  distance: string
  price: string
  category: string
  selected?: boolean
  onViewMap?: () => void
}

/**
 * Renders a styled event card displaying event details such as image, title, date, location, price, and category.
 *
 * @param selected - If true, highlights the card to indicate selection.
 *
 * @returns A React element representing the event card UI.
 */
export default function EventCard({
  title,
  image,
  date,
  location,
  price,
  category,
  selected = false,
}: EventCardProps) {
  return (
    <div>
      <Card
        className={`overflow-hidden bg-[#171717] text-white border-[#171717] border hover:border-gray-700 transition-all duration-300 ${selected ? "border-gray-500" : ""}`}
      >
        <div className="relative h-40 overflow-hidden">
          <div className="h-full w-full">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-black/70 text-white backdrop-blur-sm hover:bg-black hover:text-gray-100 text-xs py-0.5">
              {category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-base mb-2 line-clamp-1">{title}</h3>

          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-start gap-2 text-gray-200">
              <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{date}</span>
            </div>

            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <div>{location}</div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-medium text-sm">{price}</div>
          <Button
            size="sm"
            className="bg-black text-white hover:bg-gray-900 transition-colors duration-300 text-xs px-4"
          >
            Get Tickets
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
