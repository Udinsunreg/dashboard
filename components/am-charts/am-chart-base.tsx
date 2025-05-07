"\"use client"

import { useEffect, useRef } from "react"
import * as am5 from "@amcharts/amcharts5"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

interface AmChartBaseProps {
  chartId: string
  className?: string
  height?: number | string
  createChartFn: (root: am5.Root, container: HTMLElement) => void
}

export default function AmChartBase({ chartId, className = "", height = 400, createChartFn }: AmChartBaseProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<am5.Root | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Dispose of previous chart instance
    if (rootRef.current) {
      rootRef.current.dispose()
    }

    // Create root element
    const root = am5.Root.new(chartId)
    rootRef.current = root

    // Set themes
    root.setThemes([am5themes_Animated.new(root)])

    // Call the chart creation function
    createChartFn(root, chartRef.current)

    // Clean up
    return () => {
      if (rootRef.current) {
        rootRef.current.dispose()
      }
    }
  }, [chartId, createChartFn])

  return (
    <div
      id={chartId}
      ref={chartRef}
      className={className}
      style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height }}
    />
  )
}
