"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useReducedMotion } from "framer-motion"

export default function Loading() {
  const shouldReduceMotion = useReducedMotion();
  
  // Pulse animation class for better loading indicators
  const pulseClass = shouldReduceMotion ? "" : "animate-pulse";

  return (
    <div className="bg-gradient-to-b from-black via-[#171717] to-black text-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="mt-10 lg:mt-16">
          <Skeleton className={`h-10 w-64 bg-gray-700/50 mb-2 ${pulseClass}`} />
          <Skeleton className={`h-5 w-96 bg-gray-700/50 mb-6 ${pulseClass}`} />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filters sidebar skeleton */}
          <div className="w-full lg:w-56 shrink-0">
            <div className="bg-[#171717] rounded-lg border border-gray-700 p-3">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className={`h-5 w-16 bg-gray-700/50 ${pulseClass}`} />
                <Skeleton className={`h-7 w-14 bg-gray-700/50 rounded ${pulseClass}`} />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={`filter-${i}`}>
                    <Skeleton className={`h-4 w-20 bg-gray-700/50 mb-1 ${pulseClass}`} />
                    <Skeleton className={`h-8 w-full bg-gray-700/50 rounded ${pulseClass}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            {/* Search bar skeleton */}
            <div className="relative mb-4">
              <Skeleton className={`h-10 w-full bg-gray-700/50 rounded-full ${pulseClass}`} />
              <div className="absolute right-1 top-1">
                <Skeleton className={`h-8 w-20 bg-gray-800/70 rounded-full ${pulseClass}`} />
              </div>
            </div>

            {/* Category filters skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton
                  key={`category-${i}`}
                  className={`h-7 w-${i % 2 === 0 ? '24' : '16'} bg-gray-700/50 rounded-full ${pulseClass}`}
                />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Events list skeleton */}
              <div className="w-full lg:w-1/2">
                <div className="flex justify-between items-center mb-3">
                  <Skeleton className={`h-5 w-24 bg-gray-700/50 ${pulseClass}`} />
                  <Skeleton className={`h-7 w-24 bg-gray-700/50 rounded ${pulseClass}`} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={`event-${i}`}
                      className="overflow-hidden bg-[#171717] border border-gray-700"
                    >
                      <Skeleton className={`h-40 w-full bg-gray-700/50 ${pulseClass}`} />
                      <CardContent className="p-4">
                        <Skeleton className={`h-5 w-3/4 bg-gray-700/50 mb-3 ${pulseClass}`} />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className={`h-4 w-4 bg-gray-700/50 rounded-full ${pulseClass}`} />
                            <Skeleton className={`h-4 w-1/2 bg-gray-700/50 ${pulseClass}`} />
                          </div>
                          <div className="flex items-center gap-2">
                            <Skeleton className={`h-4 w-4 bg-gray-700/50 rounded-full ${pulseClass}`} />
                            <Skeleton className={`h-4 w-2/3 bg-gray-700/50 ${pulseClass}`} />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <Skeleton className={`h-4 w-16 bg-gray-700/50 ${pulseClass}`} />
                        <Skeleton className={`h-8 w-24 bg-gray-700/50 rounded ${pulseClass}`} />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Map skeleton */}
              <div className="w-full lg:w-1/2">
                <div className="flex justify-between items-center mb-3">
                  <Skeleton className={`h-5 w-20 bg-gray-700/50 ${pulseClass}`} />
                </div>
                <div className="relative">
                  <Skeleton className={`h-[65vh] w-full bg-gray-700/50 rounded-lg ${pulseClass}`} />
                  
                  {/* Map controls skeleton */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <Skeleton className={`h-8 w-8 bg-gray-800/70 rounded ${pulseClass}`} />
                    <Skeleton className={`h-8 w-8 bg-gray-800/70 rounded ${pulseClass}`} />
                  </div>
                  
                  {/* Map pin skeletons */}
                  <div className="absolute top-1/4 left-1/4">
                    <Skeleton className={`h-6 w-6 bg-gray-600 rounded-full ${pulseClass}`} />
                  </div>
                  <div className="absolute top-2/3 left-1/2">
                    <Skeleton className={`h-6 w-6 bg-gray-600 rounded-full ${pulseClass}`} />
                  </div>
                  <div className="absolute top-1/2 left-3/4">
                    <Skeleton className={`h-6 w-6 bg-gray-600 rounded-full ${pulseClass}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}