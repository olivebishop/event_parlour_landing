import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EventCard from "@/components/shared/eventCard"

export default function EventsPage() {
  return (
   <div className="bg-gradient-to-b from-black via-[#171717] to-black text-gray-50">
     <div className="container mx-auto px-4 py-8 bg ">
      <header className="lg:mt-32 mt-16">
        <h1 className="text-3xl font-bold mb-2">Events Near You</h1>
        <p className="text-muted-foreground mb-3">Discover exciting events happening in your area</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 ">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 shrink-0 ">
          <div className="bg-[#171717] rounded-lg border p-4 sticky top-4 ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs border border-white">
                Reset
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <div className="relative">
                  <Input placeholder="Current location" className="pl-8" />
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#171717] text-gray-100 ">
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="weekend">This weekend</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block ">Category</label>
                <Select defaultValue="all">
                  <SelectTrigger >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#171717] text-gray-100">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="food">Food & Drink</SelectItem>
                    <SelectItem value="arts">Arts & Culture</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Price</label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="text-xs h-8 flex-1 text-black">
                    Free
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8 flex-1 text-black">
                    Paid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ">
          {/* Search bar */}
          <div className="relative mb-6">
            <Input placeholder="Search events..." className="pl-10 pr-4 h-12 rounded-full" />
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
            <Button className="absolute right-1 top-1 rounded-full bg-black text-gray-100 border border-[#171717] hover:bg-[#171717] h-10">Search</Button>
          </div>

          {/* Category quick filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1.5 bg-primary/5 hover:bg-primary/10 cursor-pointer text-gray-100"
            >
              All
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1.5 hover:bg-primary/10 cursor-pointer text-gray-100">
              Music
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1.5 hover:bg-primary/10 cursor-pointer text-gray-100">
              Food & Drink
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1.5 hover:bg-primary/10 cursor-pointer text-gray-100">
              Arts
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1.5 hover:bg-primary/10 cursor-pointer text-gray-100">
              Sports
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1.5 hover:bg-primary/10 cursor-pointer text-gray-100">
              Networking
            </Badge>
          </div>

          {/* Events grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
              title="Summer Music Festival"
              image="/images/dummy/one.jpg"
              date="Sat, Aug 12 • 2:00 PM"
              location="Central Park"
              distance="0.8 miles away"
              price="Ksh 700"
              category="Music"
            />

            <EventCard
              title="Food Truck Rally"
              image="/images/dummy/five.jpg"
              date="Sun, Aug 13 • 11:00 AM"
              location="Downtown Square"
              distance="1.2 miles away"
              price="Free"
              category="Food & Drink"
            />

            <EventCard
              title="Art Gallery Opening"
           image="/images/dummy/four.jpg"
              date="Fri, Aug 18 • 7:00 PM"
              location="Modern Art Museum"
              distance="2.5 miles away"
            price="Ksh 2890"
              category="Arts & Culture"
            />

            <EventCard
              title="Yoga in the Park"
              image="/images/dummy/three.jpg"
              date="Every Sunday • 9:00 AM"
              location="Riverside Park"
              distance="0.5 miles away"
             price="Ksh 2300"
              category="Sports"
            />

            <EventCard
              title="Tech Networking Mixer"
            image="/images/dummy/four.jpg"
              date="Thu, Aug 17 • 6:30 PM"
              location="Innovation Hub"
              distance="3.1 miles away"
              price="Ksh 5000"
              category="Business"
            />

            <EventCard
              title="Farmers Market"
            image="/images/dummy/three.jpg"
              date="Sat, Aug 12 • 8:00 AM"
              location="Community Center"
              distance="1.7 miles away"
              price="Free"
              category="Food & Drink"
            />
          </div>

          {/* Load more button */}
          <div className="mt-8 text-center ">
            <Button variant="outline" size="lg" className=" bg-black text-gray-100 hover:bg-[#171717] border-[#171717] border hover:text-white px-8 py-6 hover:opacity-90 transition-all duration-300 rounded-full font-medium">
              Load More Events
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


