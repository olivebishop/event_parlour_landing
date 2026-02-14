"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Ticket, DollarSign } from "lucide-react"
import { mockAnalytics } from "../mockData"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { useRef, useState } from "react"
import { useSpring, useMotionValueEvent } from "motion/react"

const chartData = [
  { month: "Jan", revenue: 2.1 },
  { month: "Feb", revenue: 2.8 },
  { month: "Mar", revenue: 2.4 },
  { month: "Apr", revenue: 3.2 },
  { month: "May", revenue: 2.9 },
  { month: "Jun", revenue: 3.5 },
  { month: "Jul", revenue: 3.1 },
  { month: "Aug", revenue: 4.2 },
  { month: "Sep", revenue: 3.8 },
  { month: "Oct", revenue: 4.5 },
  { month: "Nov", revenue: 5.2 },
  { month: "Dec", revenue: 8.2 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
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
          <p className="text-sm text-muted-foreground">Track your event performance and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{mockAnalytics.revenue.total}</div>
              <p className="text-xs text-muted-foreground">{mockAnalytics.revenue.growth} from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Total Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{mockAnalytics.attendees.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{mockAnalytics.attendees.growth} from last quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Total Events</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{mockAnalytics.events.total}</div>
              <p className="text-xs text-muted-foreground">{mockAnalytics.events.active} active this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium">Tickets Sold</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{mockAnalytics.tickets.sold.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{mockAnalytics.tickets.available} available</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader>
            <CardTitle>
              KES {springY.get().toFixed(1)}M
              <Badge variant="secondary" className="ml-2">
                <TrendingUp className="h-4 w-4" />
                <span>{mockAnalytics.revenue.growth}</span>
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Total revenue for last year</p>
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
                  springY.jump(chartData[chartData.length - 1].revenue)
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
                  dataKey="revenue"
                  type="monotone"
                  fill="var(--color-revenue)"
                  fillOpacity={0.1}
                  stroke="var(--color-revenue)"
                  clipPath={`inset(0 ${
                    Number(chartRef.current?.getBoundingClientRect().width) - axis
                  } 0 0)`}
                />
                <line
                  x1={axis}
                  y1={0}
                  x2={axis}
                  y2={"85%"}
                  stroke="var(--color-revenue)"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  strokeOpacity={0.3}
                />
                <rect
                  x={axis - 50}
                  y={0}
                  width={50}
                  height={18}
                  fill="var(--color-revenue)"
                />
                <text
                  x={axis - 25}
                  fontWeight={600}
                  y={13}
                  textAnchor="middle"
                  className="fill-background"
                >
                  KES {springY.get().toFixed(1)}M
                </text>
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="none"
                  stroke="var(--color-revenue)"
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
