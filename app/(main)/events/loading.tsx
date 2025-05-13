import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="bg-gradient-to-b from-black via-[#171717] to-black text-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="mt-10 lg:mt-16">
          <Skeleton className="h-10 w-64 bg-gray-800 mb-2" />
          <Skeleton className="h-5 w-96 bg-gray-800 mb-6" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filters sidebar skeleton */}
          <div className="w-full lg:w-56 shrink-0">
            <div className="bg-[#171717] rounded-lg border border-gray-800 p-3">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-5 w-16 bg-gray-800" />
                <Skeleton className="h-7 w-14 bg-gray-800" />
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={`filter-${i}`}>
                    <Skeleton className="h-4 w-20 bg-gray-800 mb-1" />
                    <Skeleton className="h-8 w-full bg-gray-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            {/* Search bar skeleton */}
            <Skeleton className="h-10 w-full bg-gray-800 rounded-full mb-4" />

            {/* Category filters skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton
                  key={`category-${i}`}
                  className="h-7 w-20 bg-gray-800 rounded-full"
                />
              ))}
            </div>

            {/* Events grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={`event-${i}`}
                  className="overflow-hidden bg-[#171717] border-gray-800"
                >
                  <Skeleton className="h-40 w-full bg-gray-800" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 bg-gray-800 mb-3" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-800" />
                        <Skeleton className="h-4 w-1/2 bg-gray-800" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 bg-gray-800" />
                        <Skeleton className="h-4 w-2/3 bg-gray-800" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <Skeleton className="h-4 w-16 bg-gray-800" />
                    <Skeleton className="h-8 w-24 bg-gray-800 rounded" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
