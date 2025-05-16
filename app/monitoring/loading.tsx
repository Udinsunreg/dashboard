import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MonitoringLoading() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-muted/40">
      {/* Sidebar skeleton */}
      <div className="hidden w-64 border-r bg-background md:block">
        <div className="flex h-16 items-center border-b px-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="ml-2 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="pl-4 pt-2">
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="pl-4 pt-2">
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative flex-1">
        {/* Navbar skeleton */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <Skeleton className="h-8 w-8 md:hidden" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:items-center md:gap-2">
              <Skeleton className="h-9 w-[140px]" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-9 w-[140px]" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Main content with scrolling */}
        <div className="h-[calc(100vh-4rem)] overflow-auto">
          <div className="p-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="mt-2 h-4 w-96" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-9 w-32" />
                </div>
              </div>

              {/* Stats cards skeleton */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle>
                        <Skeleton className="h-4 w-32" />
                      </CardTitle>
                      <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="mt-1 h-3 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search and filters skeleton */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-9" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-9 w-[130px]" />
                  <Skeleton className="h-9 w-[130px]" />
                </div>
              </div>

              {/* Tabs skeleton */}
              <div className="space-y-6">
                <div className="flex border-b">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="ml-2 h-10 w-32" />
                  <Skeleton className="ml-2 h-10 w-32" />
                  <Skeleton className="ml-2 h-10 w-32" />
                </div>

                {/* Device cards skeleton */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="mt-1 h-4 w-48" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-16" />
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-4 w-8" />
                              <Skeleton className="h-2 w-16" />
                            </div>
                          </div>
                          <div className="mt-4 space-y-2 rounded-md bg-background p-2">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex items-center justify-between">
                              <Skeleton className="h-4 w-16" />
                              <Skeleton className="h-4 w-12" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 w-8" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardContent className="border-t pt-4">
                        <div className="flex w-full gap-2">
                          <Skeleton className="h-9 w-full" />
                          <Skeleton className="h-9 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
