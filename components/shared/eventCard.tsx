import { MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface EventCardProps {
  title: string
  image: string
  date: string
  location: string
  distance: string
  price: string
  category: string
}

export default function EventCard({ title, image, date, location,  price, category }: EventCardProps) {
  return (
    <Card className="overflow-hidden group bg-[#171717] text-white border-[#171717] border">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        >
          
        </Button>
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-background/80 text-foreground backdrop-blur-sm  hover:bg-black hover:text-gray-100">{category}</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>

        <div className="space-y-2 text-sm text-muted-foreground ">
          <div className="flex items-start gap-2 text-gray-50">
            <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{date}</span>
          </div>

          <div className="flex items-start gap-2 text-gray-200">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              <div>{location}</div>
              
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-medium " >{price}</div>
        <Button size="sm" className="bg-black text-white">Get Tickets</Button>
      </CardFooter>
    </Card>
  )
}

