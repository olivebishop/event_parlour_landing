"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Calendar, DollarSign } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { useRef, useState } from "react"
import { useSpring, useMotionValueEvent } from "motion/react"

const chartData = [
  { month: "Jan", events: 1 },
  { month: "Feb", events: 2 },
  { month: "Mar", events: 1 },
  { month: "Apr", events: 3 },
  { month: "May", events: 2 },
  { month: "Jun", events: 4 },
  { month: "Jul", events: 2 },
  { month: "Aug", events: 3 },
  { month: "Sep", events: 1 },
  { month: "Oct", events: 2 },
  { month: "Nov", events: 3 },
  { month: "Dec", events: 5 },
]

const chartConfig = {
  events: {
    label: "Events",
    theme: {
      light: "hsl(0 0% 0%)",
      dark: "hsl(0 0% 100%)",
    },
  },
} satisfies ChartConfig

export default function AnalyticsDemo() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [axis, setAxis] = useState(0)

  const springX = useSpring(0, {
    damping: 30,
    stiffness: 100,
  })
  const springY = useSpring(0, {
    damping: 30,
    stiffness: 100,
  })

  useMotionValueEvent(springX, "change", (latest) => {
    setAxis(latest)
  })

  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl font-bold text-foreground mb-1">Analytics</h3>
          <p className="text-sm text-muted-foreground">Your event participation insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Events Attended</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">KES 45K</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Tickets Purchased</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Upcoming Events</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader>
            <CardTitle>
              {springY.get().toFixed(0)} Events
              <Badge variant="secondary" className="ml-2">
                <TrendingUp className="h-4 w-4" />
                <span>+15%</span>
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Event participation for last year</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              ref={chartRef}
              className="h-54 w-full"
              config={chartConfig}
            >
              <AreaChart
                className="overflow-visible"
                accessibilityLayer
                data={chartData}
                onMouseMove={(state) => {
                  const x = state.activeCoordinate?.x
                  const dataValue = state.activePayload?.[0]?.value
                  if (x && dataValue !== undefined) {
                    springX.set(x)
                    springY.set(dataValue)
                  }
                }}
                onMouseLeave={() => {
                  springX.set(chartRef.current?.getBoundingClientRect().width || 0)
                  springY.jump(chartData[chartData.length - 1].events)
                }}
                margin={{
                  right: 0,
                  left: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-border"
                  horizontalCoordinatesGenerator={(props) => {
                    const { height } = props
                    return [0, height - 30]
                  }}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                  className="stroke-foreground"
                />
                <Area
                  dataKey="events"
                  type="monotone"
                  fill="var(--color-events)"
                  fillOpacity={0.1}
                  stroke="var(--color-events)"
                  clipPath={`inset(0 ${
                    Number(chartRef.current?.getBoundingClientRect().width) - axis
                  } 0 0)`}
                />
                <line
                  x1={axis}
                  y1={0}
                  x2={axis}
                  y2={"85%"}
                  stroke="var(--color-events)"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  strokeOpacity={0.3}
                />
                <rect
                  x={axis - 50}
                  y={0}
                  width={50}
                  height={18}
                  fill="var(--color-events)"
                />
                <text
                  x={axis - 25}
                  fontWeight={600}
                  y={13}
                  textAnchor="middle"
                  className="fill-background"
                >
                  {springY.get().toFixed(0)}
                </text>
                <Area
                  dataKey="events"
                  type="monotone"
                  fill="none"
                  stroke="var(--color-events)"
                  strokeOpacity={0.1}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
