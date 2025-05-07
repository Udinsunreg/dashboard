import { LineChart } from "lucide-react"

export default function FallbackChart() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed">
      <div className="text-center">
        <LineChart className="mx-auto h-16 w-16 text-muted-foreground opacity-20" />
        <h3 className="mt-4 text-lg font-medium">Chart Visualization</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The interactive chart could not be loaded. Please try refreshing the page.
        </p>
      </div>
    </div>
  )
}
